import { useState, useEffect } from "react"; 
import { Container, Nav, Navbar } from "react-bootstrap"; 
import { Link } from "react-router-dom"; 
import CartWidget from "../CartWidget/CartWidget"; 
import { getDocs, collection } from "firebase/firestore";  
import { db } from "../../firebase/config";  

function NavBar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const productsSnapshot = await getDocs(collection(db, "products"));  
                const categories = productsSnapshot.docs.map(doc => doc.data().category);  
                const uniqueCategories = [...new Set(categories)];  
                setCategories(uniqueCategories);  
            } catch (error) {
                console.error("Error fetching categories from Firebase:", error);
            }
        };

        fetchCategories();  
    }, []);

    return (
        <Navbar className="navbar sticky-top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fs-2 text-warning">
                    <img 
                        src="https://firebasestorage.googleapis.com/v0/b/ecommerce-music-world.appspot.com/o/musicworld-logo.png?alt=media&token=2ac377ce-7488-4a49-afa7-b02826e19d18"
                        alt="Logo"
                        style={{ width: '80px', height: '80px', marginRight: '10px' }} 
                    />
                    Music World
                </Navbar.Brand>
                <Nav className="me-auto">
                    {categories.map((cat) => (
                        <Nav.Link as={Link} to={`/category/${cat}`} key={cat}>
                            {cat}
                        </Nav.Link>
                    ))}
                </Nav>
                <CartWidget />
            </Container>
        </Navbar>
    );
}

export default NavBar;
