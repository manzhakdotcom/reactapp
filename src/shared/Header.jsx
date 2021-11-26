import { hot } from 'react-hot-loader/root';
import React from 'react';

function HeaderComponent() {
  return (
    <header>
      <h1>Header!</h1>
      <p>Hello world!</p>
    </header>
  );
}

export const Header = hot(HeaderComponent);
