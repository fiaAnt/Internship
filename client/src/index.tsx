import React from 'react';
import { createRoot } from 'react-dom/client';
import '@assets/fonts/fonts.css';
import './app.css';
import './i18n';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);
