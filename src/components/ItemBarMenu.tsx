
type itemPropertys={
    title: string,
    link?: string
    myClass?: string
}

const ItemBarMenu = ({title,link="#", myClass="item-menu"}:itemPropertys) => {
  return (
    <li className={myClass}>
        <a href={link}>{title}</a>
    </li>
  )
}

export default ItemBarMenu