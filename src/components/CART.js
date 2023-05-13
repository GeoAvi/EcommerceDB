import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MENULIST, updateMenu } from "../redux/mainSlice";

const ShowCartComponent = () => {
  const { cart } = useSelector((state) => state.ecommercesite);
  const [finalTotal, setFinalTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    if (cart && cart.length) {
      cart.map((x) => {
        total += x.count * x.item.price;
        return cart;
      });
    }
    setFinalTotal(total);
  }, [cart]);

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item md={2} sm={3} xs={12}></Grid>
        <Grid item md={8} sm={6} xs={12}>
          <Card>
            <CardContent>
              {cart && cart.length > 0 ? (
                <>
                  {cart.map(({ item, count }, index) => (
                    <Grid container spacing={2} sx={{ my: 1 }} key={index}>
                      <Grid item md={1} sm={6} xs={12}>
                        <img src={item.image} alt={item.name} width="100%" />
                      </Grid>
                      <Grid item md={5} sm={6} xs={12}>
                        <Typography variant="h5">{item.name}</Typography>
                      </Grid>
                      <Grid item md={1} sm={6} xs={12} sx={{ mt: 1 }}>
                        <Typography variant="body2">{count} Qty</Typography>
                      </Grid>
                      <Grid item md={1} sm={6} xs={12} sx={{ mt: 1 }}>
                        <Typography variant="body2">X</Typography>
                      </Grid>
                      <Grid item md={1} sm={6} xs={12} sx={{ mt: 1 }}>
                        <Typography variant="body2">{item.price} Rs</Typography>
                      </Grid>
                      <Grid
                        item
                        md={1}
                        sm={6}
                        xs={12}
                        sx={{ textAlign: "right", mt: 1 }}
                      >
                        <Typography variant="body2">=</Typography>
                      </Grid>
                      <Grid
                        item
                        md={2}
                        sm={6}
                        xs={12}
                        sx={{ textAlign: "right", mt: 1 }}
                      >
                        <Typography variant="body2">
                          {item.price * count} Rs
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                  <hr />
                  <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid
                      item
                      md={10}
                      sm={11}
                      xs={12}
                      sx={{ textAlign: "right" }}
                    >
                      <Typography variant="h6">Total</Typography>
                    </Grid>
                    <Grid
                      item
                      md={2}
                      sm={11}
                      xs={12}
                      sx={{ textAlign: "right" }}
                    >
                      <Typography variant="h6">{finalTotal} Rs</Typography>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ mb: 3, color: "#ff3d00" }}>
                    Sorry!!! you don't have anything in your cart, please
                    <Button
                      color="primary"
                      onClick={() =>
                        dispatch(updateMenu(MENULIST.ProductsList))
                      }
                    >
                      {" "}
                      click here{" "}
                    </Button>{" "}
                    to add some
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ShowCartComponent;
