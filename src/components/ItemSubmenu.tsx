import React from 'react'

type item={
    title:string,
    children: React.ReactNode
}

const ItemSubmenu = ({title,children}:item) => {
  return (
    <section className="main-menu-more-items">
        <h3>{title}</h3>
        {
        // React.Children.map te permite iterar sobre children de manera segura, independientemente de si children es un solo elemento, una lista de elementos, o null. La cual recibe dos argumentos: los children y una función que se aplicará a cada child.
        React.Children.map(children, (child, index) => (
            <p key={index}>{child}</p>
            ))
        }
    </section>
  )
}

export default ItemSubmenu