import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import styled from "styled-components";

import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
  AuthWrapper,
} from "./pages";
import Nav from "./components/Navbar";

// const Button = styled.button`
//   background: green;
//   color: white;
// `;

// const Container = styled.div`
//   background: red;
//   color: white;
//   font-size: 2rem;
//   .hero {
//     font-size: 8rem;
//   }
// `;

function App() {
  // return (
  //   <AuthWrapper>
  //     <Router>
  //       <Navbar />
  //       <Sidebar />
  //       <Switch>
  //         <Route exact path="/">
  //           <Home />
  //         </Route>
  //         <Route exact path="/about">
  //           <About />
  //         </Route>
  //         <Route exact path="/cart">
  //           <Cart />
  //         </Route>
  //         <Route exact path="/products">
  //           <Products />
  //         </Route>
  //         <Route exact path="/products/:id" children={<SingleProduct />} />
  //         <PrivateRoute exact path="/checkout">
  //           <Checkout />
  //         </PrivateRoute>
  //         <Route exact path="*">
  //           <Error />
  //         </Route>
  //       </Switch>
  //       <Footer />
  //     </Router>
  //   </AuthWrapper>
  // );

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<SingleProduct />} />
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
