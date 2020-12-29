import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './components/Main';
import Cart from './components/Cart';
import productDatas from './datas/productData';
import { useEffect, useState } from 'react';

const STORAGE_GUESTCARD_KEY = "guestcard-key";

function App() {
  const [productInCart, setProductInCart] = useState([]);

  useEffect(()=>{
    const guestCard =JSON.parse(localStorage.getItem(STORAGE_GUESTCARD_KEY));
    if (guestCard) {
      setProductInCart(guestCard);
    }
  },[])
  useEffect(()=>{
    localStorage.setItem(STORAGE_GUESTCARD_KEY, JSON.stringify(productInCart));
  },[productInCart])

  return (
    <Router>
      <Route path="/" exact render={(props) => <Main {...props} proData={productDatas} productInCart={productInCart} setProductInCart={setProductInCart}/>} />
      <Route path="/cart" render={(props) => <Cart {...props} proData={productDatas} productInCart={productInCart} setProductInCart={setProductInCart}/>} />
    </Router>
  );
}

export default App;
