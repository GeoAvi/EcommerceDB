import { Box, Button } from "@mui/material";
import ProductDetailsCard from "./AddProductDetailCard";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addAllProducts, sortProductByPrice } from "../redux/mainSlice";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.ecommercesite);
  const [sortBy, setSortBy] = useState(null);

  const sortByPrice = () => {
    if (sortBy === "asc" || sortBy === null) {
      dispatch(sortProductByPrice("asc"));
      setSortBy("desc");
    } else {
      dispatch(sortProductByPrice("desc"));
      setSortBy("asc");
    }
  };

  return (
    <>
      <Box sx={{ textAlign: "right", my: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={sortByPrice}
        >
          Sort by price
          {sortBy === "desc" && <ArrowUpward />}
          {sortBy === "asc" && <ArrowDownward />}
        </Button>
      </Box>

      {allProducts &&
        allProducts.map((prod, index) => (
          <Fragment key={index}>
            <ProductDetailsCard prod={prod} />
          </Fragment>
        ))}
    </>
  );
};

export default ProductsList;
