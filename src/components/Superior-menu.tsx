import ItemBarMenu from "./ItemBarMenu";
import SearchField from "./SearchField";
import ClickableItemBarMenu from "./ClickableItemBarMenu";
import {useCart} from "../context/CartContext";
// import  from "../context/CartProvider";

const SuperiorMenuStyles = {
  margin: 0,
  padding: 0,
};

const boxImageStyles = {
  width: "20vmin",
};

const imgStyle = {
  width: "100%",
};

// el plan es el siguiente, como necesitamos el carrito usar useContext para guardar una variable con un array con los productos y el total, en esta parte de aqui en cambio vamos a manejar un onClick para que cuando se pulse el simbolo de buscar nos muestre/oculte el espacio de navegacion para la busqueda, tambien añadiremos un boton para cerrar ese espacio de navegacion pasando un setState; El contenido del templete debe ser llenado por carrito, productos, campo de busqueda, yo que se una factura. Entonces vamos a dejarlo en pasos de lo facil a lo dificil, 1. usar useRef desde el template para añadir lo que nececito para lo que necesitare 1.2 useReducer para saber que debe renderizar, 2. funcionalidad añadir y comprar productos, para lo que tendre que hacer 2.1 un contexto para los datos locales, 2.2 funcionalidad que reduzca/aumente productos  2.3 mostrarlos en un carrito de compras, 2.4 falsear una pasarela de pago; 3.register+login, para lo q se necesita un contexto con el usuario,

const SuperiorMenu = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const {cart}= useCart();

  return (
    <>
    <div className="main-menu" id="main-menu" style={SuperiorMenuStyles}>
      <div className="img-container" style={boxImageStyles}>
        <img
          src="./assets/img/png-transparent-amazon-dark-hd-logo.png"
          alt="amazon logo"
          style={imgStyle}
        />
      </div>
      <ul className="items-main-menu">
        <ItemBarMenu title="">
          <i className="fas fa-search"></i>
          </ItemBarMenu>
        <ItemBarMenu title="Enviar a Ecuador" />
        <ItemBarMenu title="Cuenta y Listas" />
        <ClickableItemBarMenu title="Carrito" onClick={()=>{
          if(!cart) return;
          

        }}>
          <i className="fa-solid fa-cart-shopping"></i>
        </ClickableItemBarMenu>
      </ul>
    </div>
    
    <SearchField/>
    </>
  );
};

export default SuperiorMenu;
