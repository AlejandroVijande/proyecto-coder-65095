import { Card, Button, Badge } from "react-bootstrap"; 
import { Link } from "react-router-dom"; 

function Item({ item }) {
    return (
        <Card border="warning" style={{ width: '18rem' }}> 
            <Card.Img variant="top" src={item.image} alt={item.title} /> 
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                {item.stock === 0 && (
                    <Badge bg="danger" className="mb-2">Out of Stock</Badge> 
                )}
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>
                    <strong>Price: ${item.price}</strong>
                </Card.Text>
                <Button variant="warning" as={Link} to={`/product/${item.id}`}>
                    More Info
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Item;
