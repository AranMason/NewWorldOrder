import React from 'react';
import './App.css';
import Helmet from 'react-helmet';

const App: React.FC = () => (
  <div className="App-Container">
    <Helmet>
      <title>Template App</title>
      <link href="https://fonts.googleapis.com/css?family=Noto+Sans+JP|Noto+Serif&display=swap" rel="stylesheet" />
    </Helmet>
    <header>
      <h1 className="title">Header 1</h1>
    </header>
    <section>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <h6>Header 6</h6>
    </section>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat.
      <span>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </span>
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      Hyperlink:
      <a href="/">here</a>
    </p>
    <section />
    <footer>Footer</footer>
  </div>
);

export default App;
