import { Add, Delete, Edit, Remove } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  MENULIST,
  addToCart,
  deleteProduct,
  editProduct,
  removeFromCart,
  updateMenu,
} from "../redux/mainSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const ProductDetailsCard = ({ prod }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.ecommercesite);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const filterCart = cart.filter((x) => x.item.id === prod.id);
    if (filterCart && filterCart.length > 0) {
      setCount(filterCart[0].count);
    }
  }, []);

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(prod));
    toast.error("Product has been deleted", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleEditProduct = () => {
    dispatch(editProduct(prod));
    dispatch(updateMenu(MENULIST.AddProducts));
  };

  const handleAddToCartIncrement = () => {
    setCount((count) => count + 1);
    dispatch(
      addToCart({
        count: count + 1,
        item: prod,
      })
    );
  };

  const handleAddToCartDecrement = () => {
    setCount((count) => count - 1);
    dispatch(
      removeFromCart({
        count: count - 1,
        item: prod,
      })
    );
  };

  return (
    <>
      {/* <ToastContainer> */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item md={2} sm={4} xs={12}>
              <img src={prod.image} width="100%" alt={prod.name} />
            </Grid>
            <Grid item md={2} sm={2} xs={12}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {prod.title}
              </Typography>
              <Typography variant="h5" sx={{ mb: 5 }}>
                Rs. {prod.price}
              </Typography>

              <Rating name="read-only" value={prod.rating} readOnly />
            </Grid>
            <Grid item md={8} sm={6} xs={12}>
              <Typography variant="strong" sx={{ textAlign: "justify" }}>
                {prod.description}
              </Typography>
              <br />
              <Typography variant="div" component="div" sx={{ mt: 3 }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ minWidth: "auto", p: 1 }}
                  disabled={count === 0}
                  onClick={handleAddToCartDecrement}
                >
                  <Remove fontSize="15px" htmlColor="white" />
                </Button>
                <Button
                  size="small"
                  variant="text"
                  sx={{
                    minWidth: "auto",
                    p: 1,
                    mx: 1,
                    cursor: "default",
                    fontSize: "1.4rem",
                    lineHeight: "0",
                  }}
                >
                  {count}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ minWidth: "auto", p: 1 }}
                  onClick={handleAddToCartIncrement}
                >
                  <Add fontSize="15px" htmlColor="white" />
                </Button>
                <Typography>Quantity in Cart</Typography>
              </Typography>
              <Typography
                variant="div"
                component="div"
                sx={{ mb: 2, textAlign: "right" }}
              >
                <IconButton onClick={handleEditProduct}>
                  <Edit htmlColor="orange" />
                </IconButton>

                <IconButton sx={{ mr: 3, ml: 1 }} onClick={handleDeleteProduct}>
                  <Delete htmlColor="red" />
                </IconButton>
                <ToastContainer />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* </ToastContainer> */}
    </>
  );
};

export default ProductDetailsCard;
