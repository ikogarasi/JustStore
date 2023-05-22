import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  title: string;
  content: string;
  price: number;
  imageUrl: string;
}

export const ItemCard = (props: CardProps) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "250px", height: "445px" }}>
      <CardMedia
        component="img"
        image={props.imageUrl}
        sx={{ height: "200px", maxWidth: "100%" }}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{ height: "32px" }}
          noWrap
          textOverflow=""
          fontSize="20px"
          gutterBottom
          variant="h5"
          component="div"
        >
          {props.title}
        </Typography>
        <Typography variant="body1" component="div" color="text.primary">
          Price: {props.price}$
        </Typography>
        <Typography
          sx={{ height: "80px" }}
          component="div"
          textOverflow="ellipsis"
          variant="body2"
          color="text.secondary"
        >
          {props.content}
        </Typography>
      </CardContent>
      <CardActions>
        {
          //showAddBtn
          //   ? <Button variant="outlined" color="info" aria-label="Add to cart" onClick={handleAddClick}>
          //       <AddShoppingCartOutlinedIcon/>
          //   </Button>
          //   : <Button variant="contained" color="success" aria-label="Added to cart" onClick={handleRemoveClick}>
          //       <DoneOutlinedIcon/>
          //   </Button>
        }
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(`/details/${props.id}`)}
        >
          Learn more
        </Button>
      </CardActions>
    </Card>
  );
};
