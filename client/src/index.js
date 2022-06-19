import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloProvider,
} from "@apollo/client";
import 'antd/dist/antd.css';

import client from './config/apollo';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={ client }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);