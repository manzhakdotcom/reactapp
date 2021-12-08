import React from 'react';
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import { Content } from './shared/Content';

const App = () => {
  return (
    <Layout>
      <Header />
      <Content>content</Content>
    </Layout>
  );
};

export default hot(App);
