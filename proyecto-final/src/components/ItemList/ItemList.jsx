import { Col } from 'react-bootstrap';
import Item from '../Item/Item';

function ItemList({ items }) {
  return (
      <>
          {items.map(item => (
              <Col key={item.id} xs={12} md={6} lg={3} className="mb-4">
                  <Item item={item} />
              </Col>
          ))}
      </>
  );
}

export default ItemList;
