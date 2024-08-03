import React from 'react'
import ItemSubmenu from "./ItemSubmenu";
const SubMenu = () => {
  return (
    <div className="submenu">
            <article className="main-menu-more" id="main-menu-more">
              <button id="close-menu-more" aria-label="Toggle navigation">
                X
              </button>
              <span className="usser-icon"></span>

              <ItemSubmenu title="Contenido y dispositivos digitales">
                <p>Amazon Music</p>
                <p>E-readers Kindle y Libros</p>
                <p>Amazon Appstore</p>
              </ItemSubmenu>
              <ItemSubmenu title="Buscar por departamento">
                <p>Electrónicos</p>
                <p>Computadoras</p>
                <p>Smart Home</p>
                <p>Arte y artesanías</p>
                <p>Ver todo</p>
              </ItemSubmenu>
              <ItemSubmenu title="Programas y funcionalidades">
                <p>Tarjetas de regalo</p>
                <p>Comprar por interés</p>
                <p>Amazon live</p>
                <p>Tienda internacional</p>
                <p>Ver todo</p>
              </ItemSubmenu>
              <ItemSubmenu title="Ayuda y configuracion">
                <p>Tu cuenta</p>
                <p>
                  Español
                </p>
                <p>
                  Estados Unidos
                </p>
                <p>Identificate</p>
              </ItemSubmenu>
            </article>
          </div>
  )
}

export default SubMenu