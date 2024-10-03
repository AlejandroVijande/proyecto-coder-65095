import { useState } from 'react'; 
import { useCartContext } from '../../context/cartContext'; 
import { Modal, Button } from 'react-bootstrap'; 

const ItemCount = ({ prod }) => {
    const [count, setCount] = useState(1); 
    const { addToCart, cart } = useCartContext(); 
    const stock = prod.stock; 
    const [showModal, setShowModal] = useState(false); 
    const currentCartQuantity = cart.find(item => item.id === prod.id)?.quantity || 0; 

    const increment = () => {
        if (count < stock - currentCartQuantity) {  
            setCount(count + 1); 
        }
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1); 
        }
    };

    const handleAddToCart = () => {
        if (currentCartQuantity + count > stock) {
            setShowModal(true); 
        } else {
            addToCart({ ...prod, quantity: count }); 
        }
    };

    return (
        <div className='Counter'>
            <div className='Controls d-flex align-items-center'>
                <Button variant='dark' onClick={decrement}>-</Button>
                <span className="mx-2">{count}</span>
                <Button variant='dark' onClick={increment}>+</Button>
            </div>
            <Button variant='warning' onClick={handleAddToCart} className="mt-3">
                Add to Cart
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Stock Limit Exceeded</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You can't add more than available stock ({stock - currentCartQuantity} left).
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ItemCount;
