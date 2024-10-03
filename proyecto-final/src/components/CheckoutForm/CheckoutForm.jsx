import { Button, Container, Form, Modal } from "react-bootstrap"; 
import { useCartContext } from "../../context/cartContext"; 
import { createOrder } from "../../firebase/db"; 
import { serverTimestamp, updateDoc, doc } from "firebase/firestore"; 
import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { db } from "../../firebase/config"; 

function CheckoutForm() {
    const { cart, getTotal, emptyCart } = useCartContext(); 
    const [showModal, setShowModal] = useState(false); 
    const [orderId, setOrderId] = useState(null); 
    const navigate = useNavigate(); 

    const handleClose = () => {
        setShowModal(false); 
        navigate("/"); 
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const name = e.target.name.value; 
        const phone = e.target.phone.value; 
        const email = e.target.email.value; 

        const order = {
            buyer: { name, phone, email }, 
            items: cart, 
            date: serverTimestamp(), 
            total: getTotal(), 
        };

        createOrder(order)
            .then((docId) => {
                setOrderId(docId); 
                setShowModal(true); 
                cart.forEach(async (product) => {
                    const productRef = doc(db, "products", product.id); 
                    try {
                        await updateDoc(productRef, {
                            stock: product.stock - product.quantity 
                        });
                    } catch (error) {
                        console.error("Error updating stock: ", error); 
                    }
                });
                emptyCart(); 
            })
            .catch((error) => {
                console.error("Error placing order: ", error); 
            });
    };

    return (
        <Container className="my-4">
            <h3 className="text-center">Billing Information</h3>
            <Form className="border rounded p-4 border-warning" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        className="border-warning" 
                        type="text" 
                        placeholder="Enter your name" 
                        pattern="[A-Za-z\s]+" 
                        required 
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid name (letters only). 
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control 
                        className="border-warning"
                        type="tel" 
                        placeholder="Enter your phone" 
                        pattern="[0-9]+" 
                        required 
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid phone number (numbers only). 
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        className="border-warning"
                        type="email" 
                        placeholder="Enter your email" 
                        required 
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address. 
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">We'll never share your email with anyone else ;)</Form.Text>
                </Form.Group>
                <Button variant="warning" type="submit">Confirm</Button> 
            </Form>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order placed successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your order number is <span className="fw-bold">{orderId}</span>.<br />.<br />We’ve sent a confirmation to your email with the details of your order. We hope you enjoy your purchase and thank you for choosing us!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Continue Shopping
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default CheckoutForm;
