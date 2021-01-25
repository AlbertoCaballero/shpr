import CartItem from "../CartItem/CartItem";

import { CartItemType } from "../App";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wraper: {
      width: 470,
      margin: 25,
    },
  })
);

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const classes = useStyles();

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <div className={classes.wraper}>
      <Typography>
        <h2>Selected Items - Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        {cartItems.length === 0 ? <p>Nothing selected</p> : null}
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </Typography>
    </div>
  );
};

export default Cart;
