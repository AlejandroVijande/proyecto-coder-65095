import { useState, useEffect } from "react"; 
import { useParams } from "react-router-dom"; 
import ItemDetail from "../ItemDetail/ItemDetail"; 
import { getSingleProduct } from "../../firebase/db"; 
import Loader from "../Loader/Loader"; 

function ItemDetailContainer() {
    const [detail, setDetail] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const { id } = useParams(); 

    useEffect(() => {
        setLoading(true);
        getSingleProduct(id, setDetail).then(() => {
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    return detail ? (
        <ItemDetail detail={detail} />
    ) : (
        <p>Product not available</p> 
    );
}

export default ItemDetailContainer;
