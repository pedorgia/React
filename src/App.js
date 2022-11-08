import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './common/Layout';
import { Tech } from './pages/Tech';
import { Clothes } from './pages/Clothes';
import { All } from './pages/All';
import { AppProvider } from './state/App.context';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './common/Cart';

function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path='/'
                exact
                element={<Navigate to='/all' />}
              />
              <Route
                path='/all'
                exact
                element={<All />}
              />
              <Route
                path='/clothes'
                element={<Clothes />}
              />
              <Route
                path='/tech'
                element={<Tech />}
              />
              <Route
                path='/cart'
                element={<Cart />}
              />
              <Route
                path='products/:name'
                exact
                element={<ProductDetails />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}

export default App;
