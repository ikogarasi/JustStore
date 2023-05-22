import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { CartDetails } from "../../common/types/cart/cartDetails";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteFromCartAtDb } from "../../app/actions/cartActions";

export const ShoppingCart = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemoveClick = async (cartDetailsId: number) => {
    await dispatch(deleteFromCartAtDb(cartDetailsId));
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "10px", mt: "20px" }}>
      <Box>
        <Typography variant="h4">Shopping Cart</Typography>
      </Box>
      <Box
        mt="10px"
        display="flex"
        justifyContent="center"
        border="1px solid #adadad"
        borderRadius="4px"
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Count</TableCell>
              <TableCell></TableCell>
            </TableRow>
            {cart?.cartDetails &&
              cart?.cartDetails.map((it: CartDetails) => (
                <TableRow key={it.cartDetailsId}>
                  <TableCell align="left">
                    <img
                      src={it.product?.imageUrl}
                      style={{ width: "100px" }}
                      alt={it.product?.name}
                    />
                  </TableCell>
                  <TableCell>{it.product?.name}</TableCell>
                  <TableCell align="center">{it.product?.price}</TableCell>
                  <TableCell align="center">{it.count}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        handleRemoveClick(Number(it.cartDetailsId))
                      }
                    >
                      <RemoveShoppingCartOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};
