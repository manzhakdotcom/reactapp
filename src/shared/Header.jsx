import { hot } from 'react-hot-loader/root';
import React from 'react';
import styles from './header.less';

function HeaderComponent() {
  return (
    <header>
      <h1>Header!</h1>
      <p className={styles.example}>Hello world!</p>
    </header>
  );
}

export const Header = hot(HeaderComponent);
