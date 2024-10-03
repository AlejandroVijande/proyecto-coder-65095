import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProducts } from "../../firebase/db";
import Loader from "../Loader/Loader";

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  useEffect(() => {
    setLoading(true);
    getProducts(setItems, category).then(() => {
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching products by category:", error);
      setLoading(false);
    });
  }, [category]);
  return (
    <Container className="p-3">
      {loading ? (
        <Loader />
      ) : (
        <Row xs={1} md={2} lg={4} className="g-4">
          <ItemList items={items} />
        </Row>
      )}
    </Container>
  );
}

export default ItemListContainer;
