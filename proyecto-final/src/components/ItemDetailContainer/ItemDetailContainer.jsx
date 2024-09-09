
 import { useState, useEffect } from "react"
 import { useParams } from 'react-router-dom';
 import ItemDetail from "../ItemDetail/ItemDetail";

 function ItemDetailContainer() {
  const [detail, setDetail] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json()) 
      .then((data) => setDetail(data)) 
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);


  return (
    <div className="container mt-5">
    {detail ? <ItemDetail detail={detail} /> : <p>Loading...</p>}
    </div>
  )
}

export default ItemDetailContainer