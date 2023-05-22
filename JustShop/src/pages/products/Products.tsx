import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Product } from "../../common/types/product/product";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { deleteProductFromDb } from "../../app/actions/productActions";

export const Products = () => {
  const products: Product[] = useAppSelector(
    (state: RootState) => state.products.products
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Container sx={{ padding: "20px" }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Products List</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Button
            variant="contained"
            onClick={() => navigate(`/products/upsert/${0}`)}
          >
            Create
          </Button>
        </Box>
      </Stack>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">{"Price ($)"}</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((it: Product) => (
                <TableRow key={it.id}>
                  <TableCell component="th" scope="row">
                    {it.name}
                  </TableCell>
                  <TableCell align="right">{it.category}</TableCell>
                  <TableCell align="right">{it.price}</TableCell>
                  <TableCell align="right">
                    <Box>
                      <Button
                        sx={{ mr: "4px" }}
                        onClick={() => navigate(`/products/upsert/${it.id}`)}
                        variant="contained"
                        color="secondary"
                      >
                        <EditOutlinedIcon />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => dispatch(deleteProductFromDb(it.id))}
                      >
                        <DeleteOutlineOutlinedIcon />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
