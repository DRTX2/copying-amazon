import { useState } from "react";

import "./App.css";

function App() {
  return (
    <>
      <header>
        <nav className="main-menu" id="main-menu">
          <button
            className="icon-toggle-main-menu more"
            aria-label="Toggle navigation"
            id="btn-menu-more"
          >
            &#9776;
          </button>
          <div className="submenu">
            <article className="main-menu-more" id="main-menu-more">
              <button id="close-menu-more" aria-label="Toggle navigation">
                X
              </button>
              <span className="usser-icon"></span>
              <section className="main-menu-more-items">
                <h3>Contenido y dispositivos digitales</h3>
                <p>Amazon Music</p>
                <p>E-readers Kindle y Libros</p>
                <p>Amazon Appstore</p>
              </section>
              <section className="main-menu-more-items">
                <h3>Buscar por departamento</h3>
                <p>Electrónicos</p>
                <p>Computadoras</p>
                <p>Smart Home</p>
                <p>Arte y artesanías</p>
                <p>Ver todo</p>
              </section>
              <section className="main-menu-more-items">
                <h3>Programas y funcionalidades</h3>
                <p>Tarjetas de regalo</p>
                <p>Comprar por interés</p>
                <p>Amazon live</p>
                <p>Tienda internacional</p>
                <p>Ver todo</p>
              </section>
              <section className="main-menu-more-items">
                <h3>Ayuda y configuracion</h3>
                <p>Tu cuenta</p>
                <p>
                  <span>Español</span>
                </p>
                <p>
                  <span>Estados Unidos</span>
                </p>
                <p>Identificate</p>
              </section>
            </article>
          </div>
          <ul className="items-main-menu">
            <li className="item-menu">
              <a href="#">Ofertas del dia</a>
            </li>
            <li className="item-menu">
              <a href="#">Servicio al cliente</a>
            </li>
            <li className="item-menu">
              <a href="#">Listas</a>
            </li>
            <li className="item-menu">
              <a href="#">Tarjetas de regalo</a>
            </li>
            <li className="item-menu">
              <a href="#">Vender</a>
            </li>
          </ul>
          <button
            className="icon-toggle-main-menu"
            aria-label="Toggle navigation"
            id="btn-toggle-menu"
          >
            &#9776;
          </button>
        </nav>
      </header>
      <div className="cards">
        <figure className="card">
          <img src="src/assets/img/chaqueta.jpg" alt="Producto en oferta" />
          <figcaption>Chaqueta</figcaption>
        </figure>
        <figure className="card">
          <img
            src="src/assets/img/chaqueta-cuero.jpeg"
            alt="Producto en oferta"
          />
          <figcaption>Chaqueta de cuero</figcaption>
        </figure>
        <figure className="card">
          <img src="src/assets/img/equipo.jpeg" alt="Producto en oferta" />
          <figcaption>Equipo de entrenamiento</figcaption>
        </figure>
        <figure className="card">
          <img src="src/assets/img/laptop.jpeg" alt="Producto en oferta" />
          <figcaption>Laptop ASUS</figcaption>
        </figure>

        <figure className="card">
          <img src="src/assets/img/laptop2.jpeg" alt="Producto en oferta" />
          <figcaption>Laptop HP</figcaption>
        </figure>

        <figure className="card">
          <img src="src/assets/img/new-books.jpeg" alt="Producto en oferta" />
          <figcaption>Libros interesantes</figcaption>
        </figure>
        <figure className="card">
          <img src="src/assets/img/offert-book.jpeg" alt="Producto en oferta" />
          <figcaption>Libros en oferta</figcaption>
        </figure>
        <figure className="card">
          <img src="src/assets/img/pantalon.jpeg" alt="Producto en oferta" />
          <figcaption>Pantalon dama</figcaption>
        </figure>
        <figure className="card">
          <img src="src/assets/img/talbet.jpg" alt="Producto en oferta" />
          <figcaption>Tablet</figcaption>
        </figure>
        <figure className="card">
          <img
            src="src/assets/img/training-book.jpeg"
            alt="Producto en oferta"
          />
          <figcaption>Libro: Liberando la bestia</figcaption>
        </figure>
        <figure className="card">
          <img src="src/assets/img/xbox.jpeg" alt="Producto en oferta" />
          <figcaption>Xbox 360</figcaption>
        </figure>
      </div>
      <div className="recomendations">
        <p>Ver recomendaciones personalizadas</p>
        <div>
          <a href="#" id="identificate" className="button">
            Identifícate
          </a>
        </div>
        <p>
          ¿Eres un cliente nuevo?{" "}
          <a href="#" className="link">
            Epieza aquí.
          </a>
        </p>
      </div>
      <footer>
        <div className="come-back-home">
          <a href="#main-menu">Inicio de página</a>
        </div>
        <div className="columns-footer-container">
          <div className="columns-footer">
            <div className="column-footer">
              <h2 className="second-title">Conócenos</h2>
              <p>Trabaja en amazon</p>
              <p>Blog</p>
              <p>Acerca de Amazon</p>
              <p>Relaciones con inversionistas</p>
              <p>Dispositivos Amazon</p>
              <p>Amazon Science</p>
            </div>
            <div className="column-footer">
              <h2 className="second-title">Gana Dinero con Nosotros</h2>
              <p>Vender productos en Amazon</p>
              <p>Vende en Amazon Business</p>
              <p>Vender aplicaciones en Amazon</p>
              <p>Programa de Afiliados</p>
              <p>Anuncia tus Productos</p>
              <p>Publica tu Libro en Kindle</p>
              <p>Habilita un Amazon Hub</p>
              <p>Ver más Gana Dinero con Nosotros</p>
            </div>
            <div className="column-footer">
              <h2 className="second-title">Productos de Pago de Amazon</h2>
              <p>Compra con Puntos</p>
              <p>Recarga tu Saldo</p>
              <p>Conversor de divisas de Amazon</p>
            </div>
            <div className="column-footer">
              <h2 className="second-title">Podemos Ayudarte</h2>
              <p>Amazon y el COVID-19</p>
              <p>Tu Cuenta</p>
              <p>Tus Pedidos</p>
              <p>Tarifas de Envío y Políticas</p>
              <p>Devoluciones y Reemplazos</p>
              <p>Administrar Contenido y Dispositivos</p>
              <p>Ayuda</p>
            </div>
          </div>
          <div className="about-service">
            <div className="img-logo">
              <img
                src="src/assets/img/png-transparent-amazon-dark-hd-logo.png"
                alt="logo de amazon"
              />
            </div>
            <div className="configure-box-language">
              <select
                className="box-language"
                name="language"
                id="language-user"
              >
                <option value="ES">Español - ES</option>
                <option value="EN">English - EN</option>
                <option value="PT">Portugues - PT</option>
                <option value="CH">Chinese - CH</option>
              </select>
            </div>
            <div className="money">
              <button className="icon-configurate" id="money">
                lagooooooo
              </button>
            </div>
            <div className="nationality">
              <button className="icon-configurate" id="nationality">
                lagooooooo
              </button>
            </div>
          </div>
        </div>
        <div className="configuring">
          <div className="extra-content">
            <div>
              <a
                href="https://music.amazon.com?ref=dm_aff_amz_com"
                className="nav_a"
              >
                Amazon Music
                <span className="navFooterDescText">
                  Reproduce millones de canciones
                </span>
              </a>
            </div>
            <div>
              <a
                href="https://advertising.amazon.com/?ref=footer_advtsing_amzn_com"
                className="nav_a"
              >
                Amazon Advertising
                <span className="navFooterDescText">
                  Encontrar, atraer y captar clientes
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.6pm.com" className="nav_a">
                6pm
                <span className="navFooterDescText">
                  Descubre ofertas en marcas de moda
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.abebooks.com" className="nav_a">
                AbeBooks
                <span className="navFooterDescText">
                  Libros, arte & artículos de colección
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.acx.com/" className="nav_a">
                ACX
                <span className="navFooterDescText">
                  Editorial de Audiolibros Hecho Fácil
                </span>
              </a>
            </div>
            <div>
              <a
                href="https://sell.amazon.com/?ld=AZUSSOA-footer-aff&ref_=footer_sell"
                className="nav_a"
              >
                Venda en Amazon
                <span className="navFooterDescText">
                  Comience una cuenta de venta
                </span>
              </a>
            </div>
            <div>
              <a href="/-/es/business?ref_=footer_retail_b2b" className="nav_a">
                Amazon Business
                <span className="navFooterDescText">Todo para tu negocio</span>
              </a>
            </div>
            <div>
              <a
                href="/-/es/gp/browse.html?node=230659011&ref_=footer_amazonglobal"
                className="nav_a"
              >
                AmazonGlobal
                <span className="navFooterDescText">
                  Pedidos de Envío Internacional
                </span>
              </a>
            </div>
            <div>
              <a href="/-/es/services?ref_=footer_services" className="nav_a">
                Servicios para el Hogar de Amazon
                <span className="navFooterDescText">
                  Profesionales Elegidos a Mano Garantía de Satisfacción
                </span>
              </a>
            </div>
            <div>
              <a
                href="https://aws.amazon.com/what-is-cloud-computing/?sc_channel=EL&sc_campaign=amazonfooter"
                className="nav_a"
              >
                Amazon Web Services
                <span className="navFooterDescText">
                  Servicios de cómputo en nube escalable
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.audible.com" className="nav_a">
                Audible
                <span className="navFooterDescText">
                  Escucha Libros e Interpretaciones de Audio Originales
                </span>
              </a>
            </div>
            <div>
              <a
                href="https://www.boxofficemojo.com/?ref_=amzn_nav_ftr"
                className="nav_a"
              >
                Box Office Mojo
                <span className="navFooterDescText">
                  Encuentra películas Datos de taquilla
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.goodreads.com" className="nav_a">
                Goodreads
                <span className="navFooterDescText">
                  Análisis de libros y recomendaciones
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.imdb.com" className="nav_a">
                IMDb
                <span className="navFooterDescText">
                  Películas, TV y Celebridades
                </span>
              </a>
            </div>
            <div>
              <a
                href="https://pro.imdb.com?ref_=amzn_nav_ftr"
                className="nav_a"
              >
                IMDbPro
                <span className="navFooterDescText">
                  Obtén información de entretenimiento que los profesionales
                  necesitan
                </span>
              </a>
            </div>
            <div>
              <a href="https://kdp.amazon.com" className="nav_a">
                Kindle Direct Publishing
                <span className="navFooterDescText">
                  Publica tu libro en papel y digital de manera independiente
                </span>
              </a>
            </div>
            <div>
              <a
                href="https://videodirect.amazon.com/home/landing"
                className="nav_a"
              >
                Prime Video Direct
                <span className="navFooterDescText">
                  Distribución de Video Sin Esfuerzo
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.shopbop.com" className="nav_a">
                Shopbop
                <span className="navFooterDescText">
                  Diseñador Marcas de Moda
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.woot.com/" className="nav_a">
                Woot!
                <span className="navFooterDescText">
                  Descuentos y travesuras
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.zappos.com" className="nav_a">
                Zappos
                <span className="navFooterDescText">Zapatos y ropa</span>
              </a>
            </div>
            <div>
              <a href="https://ring.com" className="nav_a">
                Ring
                <span className="navFooterDescText">
                  Casa Inteligente Sistemas de Seguridad
                </span>
              </a>
            </div>
            <div>
              <a href="https://eero.com/" className="nav_a">
                Wifi eero
                <span className="navFooterDescText">
                  Video 4K en tiempo real en todas las habitaciones
                </span>
              </a>
            </div>
            <div>
              <a
                href="https://blinkforhome.com/?ref=nav_footer"
                className="nav_a"
              >
                Blink
                <span className="navFooterDescText">
                  Seguridad inteligente para todos los hogares
                </span>
              </a>
            </div>
            <div>
              <a
                href="https://shop.ring.com/pages/neighbors-app"
                className="nav_a"
              >
                Neighbors App
                <span className="navFooterDescText">
                  {" "}
                  Alertas de seguridad y delitos en tiempo real
                </span>
              </a>
            </div>
            <div>
              <a
                href="/-/es/gp/browse.html?node=14498690011&ref_=amzn_nav_ftr_swa"
                className="nav_a"
              >
                Suscríbete con Amazon
                <span className="navFooterDescText">
                  a los servicios de suscripción de "Discover & try"
                </span>
              </a>
            </div>
            <div>
              <a href="https://www.pillpack.com" className="nav_a">
                PillPack
                <span className="navFooterDescText">Pharmacy simplificado</span>
              </a>
            </div>
          </div>
          <div className="announcements">
            <ul className="announcements-list">
              <li>
                <a href="#">Condiciones de uso</a>
              </li>
              <li>
                <a href="#">Aviso de privacidad</a>
              </li>
              <li>
                <a href="#">
                  Aviso de Privacidad de Datos de Salud del Consumidor
                </a>
              </li>
              <li>
                <a href="#">Tus opciones de privacidad de los anuncios</a>
              </li>
            </ul>
            <li>
              <span>© 1996-2024 Amazon.com, Inc. o sus afiliados</span>
            </li>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
