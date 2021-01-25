import React, { useState } from "react";
import { useQuery } from "react-query";

import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import AddShopingCartIcon from "@material-ui/icons/AddShoppingCart";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import IconButton from "@material-ui/core/IconButton";
import { Toolbar, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

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

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("http://fakestoreapi.com/products")).json();

const App = () => {
  const [cartIsOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const classes = useStyles();

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        }
        return [...acc, item];
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Somethin failed!</div>;

  return (
    <div className="App">
      <Drawer
        anchor="right"
        open={cartIsOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Toolbar>
        <Typography variant="h2" component="h1">
          SHPR
        </Typography>
      </Toolbar>
      <IconButton className={classes.cart} onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <ShoppingCart />
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
