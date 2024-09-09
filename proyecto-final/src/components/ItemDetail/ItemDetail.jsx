import "./itemDetail.css"; 

function ItemDetail({ detail }) {
  return (
    <div className="item-detail-container">
      <h2>{detail?.title}</h2>
      <img className="item-detail-img" src={detail?.image} alt={detail?.title} />
      <div className="item-detail-text">
        <p>{detail?.description}</p>
        <p><strong>Price: ${detail?.price}</strong></p>
      </div>
    </div>
  );
}

export default ItemDetail;
