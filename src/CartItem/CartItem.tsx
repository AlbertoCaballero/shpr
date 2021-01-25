import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { CartItemType } from "../App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wraper: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 40,
    },
    divs: {
      flex: 1,
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
    },
    amount: {
      marginLeft: 50,
      marginRight: 50,
    },
    information: {
      display: "flex",
      justifyContent: "space-between",
    },
    image: {
      maxWidth: 200,
      objectFit: "cover",
      marginLeft: 40,
    },
  })
);

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.wraper}>
        <div>
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
          <div className={classes.buttons}>
            <Button
              size="small"
              disableElevation
              variant="contained"
              className={classes.divs}
              onClick={() => removeFromCart(item.id)}
            >
              -
            </Button>
            <p className={classes.amount}>{item.amount}</p>
            <Button
              size="small"
              disableElevation
              variant="contained"
              className={classes.divs}
              onClick={() => addToCart(item)}
            >
              +
            </Button>
          </div>
        </div>
        <img className={classes.image} src={item.image} alt={item.title} />
      </div>
    </div>
  );
};

export default CartItem;
