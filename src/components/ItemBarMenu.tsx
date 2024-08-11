import React from "react"

type itemPropertys={
    title: string,
    link?: string,
    myClass?: string,
    children?:React.ReactNode,
    
}

const ItemBarMenu = ({title,link="#", myClass="item-menu", children=null}:itemPropertys) => {
  return (
    <li className={myClass}>
        <a href={link}>{title}{children}</a>
    </li>
  )
}

export default ItemBarMenu