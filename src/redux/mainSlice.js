import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MENULIST = {
  ProductsList: "ProductsList",
  AddProducts: "AddProducts",
  ShowCart: "ShowCart",
};

export const mainSlice = createSlice({
  name: "ecommercesite",
  initialState: {
    pageURL: MENULIST.ProductsList,
    allProducts: [],
    isEdit: null,
    cart: [],
  },
  reducers: {
    addAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    addNewProduct: (state, action) => {
      let tmpAllProds = JSON.parse(JSON.stringify(state.allProducts)); //DEEP COPY
      tmpAllProds = [...tmpAllProds, action.payload];
      console.log(tmpAllProds);
      state.allProducts = tmpAllProds;
      tmpAllProds = null;
      // state.pageURL = MENULIST.ProductsList;
    },
    updateMenu: (state, action) => {
      state.pageURL = action.payload;
    },
    deleteProduct: (state, action) => {
      state.allProducts = state.allProducts.filter(
        (x) => x.id !== action.payload.id
      );
    },
    sortProductByPrice: (state, action) => {
      if (action.payload === "asc") {
        state.allProducts.sort((a, b) => {
          return a.price - b.price;
        });
      } else {
        state.allProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
    },
    editProduct: (state, action) => {
      state.isEdit = action.payload;
    },
    updateProduct: (state, action) => {
      let tmpAllProds = JSON.parse(JSON.stringify(state.allProducts)); // DEEP COPY
      tmpAllProds = tmpAllProds.map((x) => {
        if (x.id === action.payload.id) {
          x = action.payload;
        }
        return x;
      });
      state.allProducts = tmpAllProds;
      state.isEdit = null;

      // state.pageURL = MENULIST.ProductsList;
    },
    addToCart: (state, action) => {
      let tmpCart = JSON.parse(JSON.stringify(state.cart));
      let flag = false;
      tmpCart = tmpCart.map((x) => {
        if (x.item.id === action.payload.item.id) {
          x.count = action.payload.count;
          flag = true;
        }
        return x;
      });
      if (flag === false) {
        tmpCart = [
          ...tmpCart,
          {
            count: action.payload.count,
            item: action.payload.item,
          },
        ];
      }
      state.cart = tmpCart;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      let tmpCart = JSON.parse(JSON.stringify(state.cart));
      let index = -1;
      tmpCart.map((x, inx) => {
        if (x.item.id === action.payload.item.id) {
          index = inx;
        }
        return x;
      });
      if (index !== -1) {
        if (tmpCart[index].count === 1) {
          // Remove node from Cart
          tmpCart.splice(index, 1);
        } else {
          tmpCart[index].count -= 1;
        }
      }
      state.cart = tmpCart;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    resetCartFromStorage: (state) => {
      state.cart = JSON.parse(localStorage.getItem("cart")) || [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addAllProducts,
  updateMenu,
  deleteProduct,
  sortProductByPrice,
  addNewProduct,
  editProduct,
  updateProduct,
  addToCart,
  removeFromCart,
  resetCartFromStorage,
} = mainSlice.actions;

export default mainSlice.reducer;
