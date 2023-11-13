import React from 'react';
import logo from './logo.svg';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import Router from './components/Router';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
