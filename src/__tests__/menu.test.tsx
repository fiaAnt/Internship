import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from '../components/Menu';

const menuItems = [
  { name: 'Home', link: '/', items: [] },
  {
    name: 'News',
    items: [{ name: 'Breaking news', link: '/news/breaking', items: [] }],
  },
];

describe('Menu component', () => {
  test('renders top-level items', () => {
    render(
      <BrowserRouter>
        <Menu items={menuItems} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/News/)).toBeInTheDocument();
  });

  test('opens submenu on click', () => {
    render(
      <BrowserRouter>
        <Menu items={menuItems} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/News/));
    expect(screen.getByText('Breaking news')).toBeInTheDocument();
  });
});
