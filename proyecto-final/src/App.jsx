import  ItemListContainer  from './components/ItemListContainer/ItemListContainer'
import  NavBar  from './components/NavBar/NavBar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:category" element={<ItemListContainer  />} />
        <Route path="/product/:id" element={<ItemDetailContainer  />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
