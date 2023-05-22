import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Product } from "../../common/types/product/product";
import { useEffect, useState } from "react";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Cart } from "../../common/types/cart/cartType";
import { CartDetails } from "../../common/types/cart/cartDetails";
import { CartHeader } from "../../common/types/cart/cartHeader";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCartToDb } from "../../app/actions/cartActions";
import { getProductById } from "../../app/reducers/productSlice";

interface FormModel {
  count: number;
}

export const Details = () => {
  const product = useAppSelector((state) => state.products.product) as Product;
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<FormModel>({
    defaultValues: {
      count: 0,
    },
  });

  useEffect(() => {
    dispatch(getProductById(Number(id)));
    console.log(product);
  }, []);

  const handleAddButton = () => {
    setIsAdded(true);
  };

  const onSubmit = async (data: FormModel) => {
    const cartHeader: CartHeader = {
      userId: "1",
      couponCode: "",
    };

    const cartItem: CartDetails = {
      productId: Number(product?.id),
      product: product,
      count: data.count,
      cartHeader: undefined,
    };

    const cart: Cart = {
      cartHeader: cartHeader,
      cartDetails: [cartItem],
    };

    dispatch(addCartToDb(cart));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "10px",
        mt: "20px",
        border: "1px solid #747474",
        borderRadius: "4px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="center">
          <Stack direction="row">
            <img
              src={product?.imageUrl}
              style={{ maxWidth: "200px", maxHeight: "200px" }}
              alt={product?.name}
            />
            <Box paddingLeft="25px" paddingTop="20px">
              <Typography gutterBottom variant="h5">
                {product?.name}
              </Typography>
              <Typography
                height="60px"
                variant="body2"
                color="text.secondary"
                textOverflow="ellipsis"
              >
                {product?.description}
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Controller
                  name="count"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <TextField {...field} type="number" />}
                />
                {!isAdded ? (
                  <Button
                    variant="outlined"
                    type="submit"
                    onClick={handleAddButton}
                    color="success"
                  >
                    <AddShoppingCartOutlinedIcon />
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled
                    type="submit"
                    color="success"
                  >
                    <DoneOutlinedIcon />
                  </Button>
                )}
              </Box>
            </Box>
          </Stack>
        </Box>
      </form>
    </Container>
  );
};
