import React, { useState } from 'react';
import '../styles.css';

import { Link } from 'react-router-dom';

export interface MenuItem {
  name: string;
  link?: string;
  items: MenuItem[];
}

interface MenuProps {
  items: MenuItem[];
  onItemClick?: (item: MenuItem) => void;
}

const MenuItemComponent: React.FC<{
  item: MenuItem;
  level: number;
  onItemClick?: (item: MenuItem) => void;
}> = ({ item, level, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.items.length > 0;

  const handleClick = () => {
    onItemClick?.(item);
    if (!item.link && hasChildren) setIsOpen((prev) => !prev);
  };

  return (
    <li>
      {item.link ? (
        <Link to={item.link} onClick={() => onItemClick?.(item)}>
          {item.name}
        </Link>
      ) : (
        <span className="menu-label" onClick={handleClick}>
          {item.name} {hasChildren && (isOpen ? '^' : 'v')}
        </span>
      )}
      {hasChildren && isOpen && (
        <ul className="menu-root">
          {item.items!.map((child, index) => (
            <MenuItemComponent
              key={index}
              item={child}
              level={level + 1}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const Menu: React.FC<MenuProps> = ({ items, onItemClick }) => {
  return (
    <>
      <nav>
        <ul className="menu">
          {items.map((item, index) => (
            <MenuItemComponent
              key={index}
              item={item}
              level={0}
              onItemClick={onItemClick}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};
