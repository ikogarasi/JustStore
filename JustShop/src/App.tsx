import { Home } from "./pages/home/Home";
import { Layout } from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { ShoppingCart } from "./pages/cart/Cart";
import { Details } from "./pages/details/Details";
import { UpsertProduct } from "./pages/products/UpsertProduct";
import { Products } from "./pages/products/Products";
import { NotFound } from "./components/error/NotFound";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getProductsFromDb } from "./app/actions/productActions";
import { getCartFromDb } from "./app/actions/cartActions";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsFromDb());
    dispatch(getCartFromDb("1"));
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home category="all" />} />
          <Route path="/laptops" element={<Home category="laptops" />} />
          <Route path="/watches" element={<Home category="watches" />} />
          <Route path="/phones" element={<Home category="phones" />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/upsert/:id" element={<UpsertProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
