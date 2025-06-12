import ItemBarMenu from "./ItemBarMenu";
import ClickableItemBarMenu from "./ClickableItemBarMenu";
import { useCart } from "../../context/CartContext";

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
  const { products } = useCart();

  return (
    <>
      <div className="main-menu" id="main-menu" style={SuperiorMenuStyles}>
        <div className="img-container" style={boxImageStyles}>
          <a href={import.meta.env.BASE_URL}>
            <img
              src={`${
                import.meta.env.BASE_URL
              }assets/img/png-transparent-amazon-dark-hd-logo.png`}
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
          <ItemBarMenu title="Cuenta y Listas" />
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
