import { useCart } from "../../context/CartContext";

export const CartItems=()=> {
    const {products, totalPrice,currency}=useCart();
    if(!products || products?.length===0 )
        return null ;
    return (
    <section className="cart-items">
        <p><b>Subtotal:</b></p> {`${currency} ${totalPrice}`}
        
        {products.map(prod=>{
            return <article className="item" key={prod.id}>
                <div className="img-box cart-item-img">
                    <img src={prod.img} alt={prod.altImg} />
                </div>
                {prod.precio}
            </article>
        })}
    </section>
    );
}