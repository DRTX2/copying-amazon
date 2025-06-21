import ItemBarMenu from "./ItemBarMenu";
import ClickableItemBarMenu from "./ClickableItemBarMenu";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { pathRoute } from "../../utils/navigation";

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

type MenuData = {
  SetMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuperiorMenu = ({ SetMenuIsOpen }: MenuData) => {
  const nav=useNavigate();
  const { products } = useCart();

  console.log(pathRoute)

  return (
    <>
      <div className="main-menu" id="main-menu" style={SuperiorMenuStyles}>
        <div className="img-container" style={boxImageStyles}>
          <a href={import.meta.env.BASE_URL}>
            <img
              src={`${pathRoute}assets/img/png-transparent-amazon-dark-hd-logo.png`}
              alt="amazon logo"
              style={imgStyle}
            />
          </a>
        </div>
        <ul className="items-main-menu">
          <ClickableItemBarMenu
            title=""
            onClick={() => {
              SetMenuIsOpen((prev) => !prev);
            }}
          >
            <i className="fas fa-search"></i>
          </ClickableItemBarMenu>
          <ItemBarMenu title="Enviar a Ecuador" />
          <ItemBarMenu title="Cuenta y Listas" onClick={(event:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
            event.preventDefault();
            nav("/auth/login");
            return;
          }}/>
          <ClickableItemBarMenu
            title="Carrito"
            onClick={() => {
              if (!products) return;
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </ClickableItemBarMenu>
        </ul>
      </div>
    </>
  );
};

export default SuperiorMenu;
