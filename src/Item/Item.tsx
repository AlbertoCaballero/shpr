import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddShopingCartIcon from "@material-ui/icons/AddShoppingCart";

import { CartItem } from "../App";
import { SpaceBar } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    media: {
      height: 550,
    },
    card: {},
    actions: {
      textAlign: "right",
    },
    content: {
      height: "100%",
    },
    space: {
      width: "60%",
    },
  })
);

type ItemProps = {
  item: CartItem;
  handleAddToCart: (clickedItem: CartItem) => void;
};

const Item: React.FC<ItemProps> = ({ item, handleAddToCart }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={item.image}
        title={item.title}
      />
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h2">
          {item.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          ${item.price}
        </Typography>
        <Typography variant="body2" component="p">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="small">More Details</Button>
        <div className={classes.space} />
        <IconButton onClick={() => handleAddToCart(item)}>
          <AddShopingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Item;
