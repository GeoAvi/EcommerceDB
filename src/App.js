import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import AddProduct from "./components/ADD_PRODUCTS";
import ProductsList from "./components/PRODUCT_PAGE_LIST";
import {
  MENULIST,
  addAllProducts,
  resetCartFromStorage,
} from "./redux/mainSlice";
import { useEffect } from "react";
import axios from "axios";
import ShowCartComponent from "./components/CART";

const App = () => {
  const { pageURL } = useSelector((state) => state.ecommercesite);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllApi();
    fetchCartFromWebStorage();
  });

  const fetchCartFromWebStorage = () => {
    dispatch(resetCartFromStorage());
  };

  const fetchAllApi = () => {
    axios
      .get(`https://my-json-server.typicode.com/GeoAvi/EcommerceDB/products`)
      .then((res) => {
        if (res) {
          dispatch(addAllProducts(res.data));
        }
      });
  };
  return (
    <>
      <Navbar />

      {pageURL === MENULIST.ProductsList && <ProductsList />}
      {pageURL === MENULIST.AddProducts && <AddProduct />}
      {pageURL === MENULIST.ShowCart && <ShowCartComponent />}
    </>
  );
};

export default App;
