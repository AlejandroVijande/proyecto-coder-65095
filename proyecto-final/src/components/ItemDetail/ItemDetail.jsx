import { useState } from "react"; 
import ItemCount from "../ItemCount/ItemCount"; 
import { useNavigate } from "react-router-dom"; 
import { Button, Modal, Container, Row, Col, Badge } from "react-bootstrap"; 
import { useCartContext } from "../../context/cartContext"; 

function ItemDetail({ detail }) {
    const { cart } = useCartContext(); 
    const [showModal, setShowModal] = useState(false); 
    const navigate = useNavigate(); 

    const handleClose = () => setShowModal(false); 

    const handleCheckoutClick = () => {
        if (cart.length === 0) {
            setShowModal(true); 
        } else {
            navigate("/checkout"); 
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6} className="d-flex align-items-start">
                    <img 
                        className="img-fluid me-3" 
                        style={{ width: '400px', height: 'auto', objectFit: 'cover' }} 
                        src={detail?.image} 
                        alt={detail?.name} 
                    />
                    <div className="item-detail-text">
                        <h2>{detail?.name}</h2>
                        {detail?.stock === 0 && (
                            <Badge bg="danger" className="mb-2">Out of Stock</Badge> 
                        )}
                        <p>{detail?.description}</p>
                        <p><strong>Price: ${detail?.price}</strong></p>
                        <div className='Controls d-flex justify-content-center align-items-center'>
                            <ItemCount prod={detail} />
                        </div>
                        <div className='Controls d-flex justify-content-center align-items-center'>
                            <Button variant="dark" className="mt-3" onClick={handleCheckoutClick}>
                                Checkout
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart is Empty</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sorry, your cart is empty. Please add items to your cart before checking out.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ItemDetail;
