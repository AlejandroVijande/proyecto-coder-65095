import { Badge, Button } from 'react-bootstrap'; 
import { useCartContext } from '../../context/cartContext'; 
import { Link } from 'react-router-dom'; 

function CartWidget() {
    const { cart } = useCartContext(); 
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 

    return (
        <Button variant="outline-warning" size="lg" as={Link} to="/cart">
            🛒 <Badge bg="secondary">{totalItems}</Badge> 
            <span className="visually-hidden">unread messages</span>
        </Button>
    );
};

export default CartWidget;
