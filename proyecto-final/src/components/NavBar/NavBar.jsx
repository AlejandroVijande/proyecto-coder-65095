import { CartWidget } from '../CartWidget/CartWidget'
import "./NavBar.css"
export const NavBar = () => {
  return (
    <nav>
        {/* <img src="" alt="" /> */}
        <div className='logo'>🎸</div>
        <ul>
            <li><a href=''>Inicio</a></li>
            <li><a href=''>Productos</a></li>
            <li><a href=''>Contacto</a></li>
        </ul>
        <CartWidget />
    </nav>
  )
}
