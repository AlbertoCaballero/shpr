import React, { useState } from "react";
import { useQuery } from "react-query";

import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import AddShopingCartIcon from "@material-ui/icons/AddShoppingCart";
import Item from "./Item/Item";
import IconButton from "@material-ui/core/IconButton";
import { Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cart: {
      position: "fixed",
      zIndex: 100,
      right: 20,
      top: 20,
    },
  })
);

export type CartItem = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItem[]> =>
  await (await fetch("http://fakestoreapi.com/products")).json();

const App = () => {
  const [cartIsOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItem[]);
  const classes = useStyles();

  const { data, isLoading, error } = useQuery<CartItem[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItem[]) =>
    items.reduce((acc: number, items) => acc + items.amount, 0);

  const handleAddToCart = (clickedItem: CartItem) => null;

  const handleRemoveFromCart = () => null;

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Somethin failed!</div>;

  return (
    <div className="App">
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartOpen(false)}
      >
        Lets put our cart here!!!!
      </Drawer>
      <Toolbar>
        <Typography variant="h2" component="h1">
          SHPR
        </Typography>
      </Toolbar>
      <IconButton className={classes.cart} onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShopingCartIcon />
        </Badge>
      </IconButton>
      <Grid container spacing={2}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} lg={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
