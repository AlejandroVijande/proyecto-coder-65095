import { useState } from "react";
import { Button, Container, ListGroup, Card } from "react-bootstrap";
import { useCartContext } from "../../context/cartContext";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

function OrderSummary() {
  const { cart, getTotal } = useCartContext();
  const [showForm, setShowForm] = useState(false);
  const handlePlaceOrder = () => {
    setShowForm(true);
  };
  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Order Summary</h3>
      {!showForm ? (
        <Card className="border-warning">
          <Card.Body>
            <ListGroup>
              {cart.map((prod) => (
                <ListGroup.Item key={prod.id} className="border-warning d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{prod.name}</strong>
                    <div>Price: ${prod.price.toFixed(2)}</div>
                    <div>Quantity: {prod.quantity}</div>
                    <div>Subtotal: ${(prod.price * prod.quantity).toFixed(2)}</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <ListGroup.Item className="font-weight-bold text-right">
              <strong>Total: ${getTotal().toFixed(2)}</strong>
            </ListGroup.Item>
            <div className="text-center mt-4">
              <Button variant="warning" onClick={handlePlaceOrder}>
                Place Order
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <CheckoutForm />
      )}
    </Container>
  );
}

export default OrderSummary;
