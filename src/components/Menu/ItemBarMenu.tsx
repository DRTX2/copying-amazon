import React from "react";

type itemPropertys = {
  title: string;
  link?: string;
  myClass?: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const ItemBarMenu = ({
  title,
  link = "#",
  myClass = "item-menu",
  children = null,
  onClick = () => {},
}: itemPropertys) => {
  return (
    <li className={myClass}>
      <a href={link} onClick={onClick}>
        {title}
        {children}
      </a>
    </li>
  );
};

export default ItemBarMenu;
