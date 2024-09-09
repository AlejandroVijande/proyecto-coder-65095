import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Item({ item }) {
  return (
    <Card>
      <Card.Img variant="top" src={item.image} alt={item.title} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
        <Card.Text><strong>Price: ${item.price}</strong></Card.Text>
        <Button variant="primary" as={Link} to={`/product/${item.id}`}>
          More Info
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Item;
