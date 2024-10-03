import { useState } from "react";
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import { Button, Modal, Container, Row, Col, Card } from "react-bootstrap";

function CartContainer() {
    const { cart, getTotal, emptyCart } = useCartContext();
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleConfirmEmptyCart = () => {
        emptyCart();
        handleCloseModal();
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Shopping Cart</h2>

            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty. :(</p>
            ) : (
                <>
                    <Row>
                        {cart.map((prod) => (
                            <Col md={6} lg={4} key={prod.id} className="mb-4">
                                <Card className="border-warning">
                                    <Row>
                                        <Col md={4} className="d-flex align-items-center justify-content-center">
                                            <Card.Img
                                                src={prod.image}
                                                style={{ width: '120px', height: '120px', margin: '10px' }}
                                            />
                                        </Col>
                                        <Col md={8}>
                                            <Card.Body>
                                                <Card.Title>{prod.name}</Card.Title>
                                                <Card.Text>Quantity: {prod.quantity}</Card.Text>
                                                <Card.Text>Price per unit: ${prod.price}</Card.Text>
                                                <Card.Text>Subtotal: ${prod.price * prod.quantity}</Card.Text>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <h4 className="text-right mb-4 fw-bold">Total: ${getTotal()}</h4>
                    <div className="text-center mt-4">
                        <Link to="/checkout">
                            <Button variant="dark" className="mx-2">Checkout</Button>
                        </Link>

                        <Button variant="danger" onClick={handleShowModal} className="mx-2">Empty Cart</Button>
                    </div>
                </>
            )}

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Empty Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body>Are you sure you want to empty the cart?</Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>

                    <Button variant="danger" onClick={handleConfirmEmptyCart}>
                        Empty Cart
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default CartContainer;
