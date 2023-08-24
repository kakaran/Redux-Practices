import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import AccountReducer from './Redux/Slices/AccountSlice';
import BonusReducer from './Redux/Slices/BonusSlice';

const store = configureStore({
  reducer: {
    account: AccountReducer,
    bonus: BonusReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

