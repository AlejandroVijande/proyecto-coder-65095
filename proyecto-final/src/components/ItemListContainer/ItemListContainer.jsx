import "./itemListContainer.css";
import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let url = "https://fakestoreapi.com/products";
        if (category) {
          url = `https://fakestoreapi.com/products/category/${category}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, [category]);

  return (
    <Container className="p-3">
      <Row>
        <ItemList items={items} />
      </Row>
    </Container>
  );
}

export default ItemListContainer;
