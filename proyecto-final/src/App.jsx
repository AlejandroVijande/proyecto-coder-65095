import  NavBar  from './components/NavBar/NavBar'
import  ItemListContainer  from './components/ItemListContainer/ItemListContainer'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import CartContainer from './components/CartContainer/CartContainer';
import Checkout from './components/Checkout/checkout';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:category" element={<ItemListContainer  />} />
        <Route path="/product/:id" element={<ItemDetailContainer  />} />      
        <Route path="/cart/" element={<CartContainer />} />      
        <Route path="/checkout/" element={<Checkout />} />     
      </Routes>
    </BrowserRouter>

  )
}

export default App
