import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, updateProduct } from "../redux/mainSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FormData = {
  id: -1,
  title: "",
  description: "",
  price: 0,
  rating: 0,
  image: "",
};
const ADD_PRODUCTS = () => {
  const [formData, setFormData] = useState(FormData);
  const dispatch = useDispatch();
  const { isEdit } = useSelector((state) => state.ecommercesite);

  useEffect(() => {
    if (isEdit) {
      setFormData(isEdit);
    } else {
      setFormData(FormData);
    }
  }, [isEdit]);

  const handleFormChange = (e) => {
    if (e.target.name === "price" || e.target.name === "rating") {
      setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitProduct = () => {
    const tmpFormData = JSON.parse(JSON.stringify(formData));
    tmpFormData.id = new Date().getTime();
    dispatch(addNewProduct(tmpFormData));
    toast.success("Product has been added", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setFormData(FormData);
  };

  const handleUpdateProduct = () => {
    dispatch(updateProduct(formData));
    toast.success("Product has been updated", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setFormData(FormData);
  };

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item md={3} sm={3} xs={12}></Grid>
        <Grid item md={6} sm={6} xs={12}>
          <Card>
            <CardContent>
              <TextField
                label="Enter Name"
                placeholder="Enter Name"
                size="small"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Enter Description"
                placeholder="Enter Description"
                size="small"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                label="Enter Price"
                placeholder="Enter Price"
                size="small"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                fullWidth
              />
              <br />
              <br />
              <TextField
                type="number"
                label="Enter Rating"
                placeholder="Enter Rating"
                size="small"
                InputProps={{ inputProps: { min: 0, max: 5 } }}
                error={
                  formData.rating < 0 || formData.rating > 5 ? true : false
                }
                name="rating"
                value={formData.rating}
                onChange={handleFormChange}
                fullWidth
              />
              <br />
              <br />

              <TextField
                label="Enter Image URL"
                placeholder="Enter Image URL"
                size="small"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
                fullWidth
              />
              <br />
              <br />
              {!isEdit ? (
                <Button
                  variant="contained"
                  size="small"
                  disabled={
                    !formData.title ||
                    !formData.description ||
                    !formData.image ||
                    formData.rating < 0 ||
                    formData.rating > 5
                  }
                  onClick={submitProduct}
                >
                  Add Product
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  disabled={
                    !formData.title ||
                    !formData.description ||
                    !formData.image ||
                    formData.rating < 0 ||
                    formData.rating > 5
                  }
                  onClick={handleUpdateProduct}
                >
                  Update Product
                </Button>
              )}

              <br />
              <br />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ADD_PRODUCTS;
