export default function OfferExtraService() {
    return (
      <>
        <section className="offer-extra-service">
          <h2>_UserName_, gracias por ser un cliente fiel.</h2>
          <h3>Te damos Prime gratis por 30 días.</h3>
          <p>
            Recibe artículos elegibles <span>Mañana, 3 de noviembre a las 8:00 PM</span> con
            Prime.
          </p>
          <article>
            <h4>Tu artículo más popular con Prime en tu carrito:</h4>
            <figure>{/* <img src="" alt="" /> */}</figure>
            <a href="#">No, gracias.</a>
          </article>
          <article>
            <h4>Detalles de la entrega:</h4>
            <div className="img-btn-promotion">
              <h5>Sin Prime</h5>
              {/* <img src="" alt="" /> */}
              <p>Requisitos mínimos de pedido para envío gratis.</p>
            </div>
            <div>
              <h5>Beneficios de Prime</h5>
              <p>Envío rápido y gratis en productos elegibles con Prime.</p>
            </div>
            <p><span>Ahorra $6.99</span> en tus artículos elegibles de Prime con entrega en un día GRATIS en este pedido. Después de tu prueba GRATUITA, Prime se renueva automáticamente por solo <b>$14.99/mes</b>.</p>
          </article>
        </section>
      </>
    );
  }
  