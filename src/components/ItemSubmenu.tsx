import React from 'react'

type item={
    title:string,
    children: React.ReactNode
}
// React.Children.map te permite iterar sobre children de manera segura, independientemente de si children es un solo elemento, una lista de elementos, o null. La cual recibe dos argumentos: los children y una función que se aplicará a cada child.
const ItemSubmenu = ({title,children}:item) => {
  return (
    <section className="main-menu-more-items">
      <h3>{title}</h3>
      {React.Children.map(children, (child, index) => {
        // Check if child is a valid React element
        if (React.isValidElement(child)) {
          // Check if the element is of type <p>
          if (child.type === 'p') {
            // Return the <p> element as is
            return React.cloneElement(child, { key: index });
          } else {
            // Wrap non-<p> elements in a <p>
            return <p key={index}>{child}</p>;
          }
        }
        // If not a valid element, return null or handle accordingly
        return null;
      })}
    </section>
  )
}

export default ItemSubmenu