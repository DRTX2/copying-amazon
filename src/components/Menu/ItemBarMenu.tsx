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
  myClass = "",
  children = null,
  onClick = () => {},
}: itemPropertys) => {
  return (
    <li className={`ml-2 lg:ml-4 p-1 hover:bg-white/10 rounded no-outline ${myClass}`} style={{ outline: 'none !important', listStyle: 'none !important' }}>
      <a href={link} onClick={onClick} className="px-1 sm:px-2 py-1 block hover:text-white text-sm lg:text-base transition-colors no-outline" style={{ color: 'rgb(255, 224, 147)', outline: 'none !important' }}>
        {title}
        {children}
      </a>
    </li>
  );
};

export default ItemBarMenu;
