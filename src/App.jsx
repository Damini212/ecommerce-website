import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";

import Home from "./Home";
import ProductItem from "./ProductItem";

function App() {
  const [jewel, setJewel] = useState([]);
  const [count, setCount] = useState({});
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data) => setJewel(data));
  }, []);

  function add(id) {
    const newCount = { ...count };

    if (newCount[id]) {
      newCount[id] += 1;
    } else {
      newCount[id] = 1;
    }
    setCount(newCount);
  }

  function subtract(id) {
    const newCount = { ...count };

    if (newCount[id]) {
      newCount[id] -= 1;
    } else {
      newCount[id] = 0;
    }
    setCount(newCount);
  }

  function addToCart(id) {
    const quantity = count[id];
    let newCart = { ...cart };

    if (typeof newCart[id] !== "undefined") {
      newCart[id] += quantity;
    } else {
      newCart[id] = quantity;
    }

    let newCount = { ...count };
    newCount[id] = 0;

    setCart(newCart);
    setCount(newCount);
  }

  function incInCart(id) {
    let newCart = { ...cart };
    newCart[id] += 1;
    setCart(newCart);
  }

  function decInCart(id) {
    let newCart = { ...cart };
    newCart[id] = Math.max(newCart[id] - 1, 0);
    if (newCart[id] === 0) {
      removeItem(id);
    } else {
      setCart(newCart);
    }
  }

  function removeItem(id) {
    const { [id]: key, ...newCart } = cart;
    setCart(newCart);
  }

  return (
    <Router>
      <Navbar
        jewel={jewel}
        cart={cart}
        add={add}
        subtract={subtract}
        count={count}
        incInCart={incInCart}
        decInCart={decInCart}
        removeItem={removeItem}
      />
      <Switch>
        <Route path="/" exact>
          <Home jewel={jewel} />
        </Route>
        <Route path="/products/:id">
          <ProductItem
            jewel={jewel}
            add={add}
            subtract={subtract}
            count={count}
            addToCart={addToCart}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
