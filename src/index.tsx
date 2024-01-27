import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import './index.css'
import './fonts/stylesheet.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';


const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode >,
  document.getElementById('root')
);
