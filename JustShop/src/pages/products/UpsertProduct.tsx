import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./products.css";
import { useEffect } from "react";
import { Product } from "../../common/types/product/product";
import { Categories } from "../../common/categories/categories";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addProductToDb,
  updateProductFromDb,
} from "../../app/actions/productActions";
import { getProductById } from "../../app/reducers/productSlice";

interface FormModel {
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const UpsertProduct = () => {
  const product = useAppSelector((state) => state.products.product) as Product;
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<FormModel>({
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (id !== "0") {
      dispatch(getProductById(Number(id)));
      reset(product);

      console.log("r");
    }
  }, [product.id]);

  const onSubmit = async (data: FormModel) => {
    const productToAdd: Product = {
      id: Number(id),
      name: data.name,
      category: data.category,
      price: data.price,
      description: data.description,
      imageUrl: data.imageUrl,
    };

    if (id === "0") {
      dispatch(addProductToDb(productToAdd));
    } else {
      dispatch(updateProductFromDb(productToAdd));
    }

    navigate("/products");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: "10px",
        border: "1px solid #747474",
        borderRadius: "4px",
        mt: "20px",
      }}
    >
      <Box>
        <Typography variant="h4">
          {id === "0" ? "Create" : "Update"} Product
        </Typography>
      </Box>
      <Box
        mt="10px"
        display="flex"
        justifyContent="center"
        border="1px solid #adadad"
        borderRadius="4px"
      >
        <form className="product__form" onSubmit={handleSubmit(onSubmit)}>
          <Box mt="10px" display="flex" flexDirection="column">
            <Controller
              name="name"
              control={control}
              rules={{
                required: { value: true, message: "Name field is required" },
                minLength: {
                  value: 3,
                  message: "Name length cannot be less than 3 symbols",
                },
                maxLength: {
                  value: 30,
                  message: "Name length cannot be greater than 30 symbols",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  sx={{ mb: "10px" }}
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  label="Name"
                  id="outlined-required"
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Category field is required",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  sx={{ mb: "10px" }}
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  select
                  label="Category"
                >
                  <MenuItem selected disabled value="">
                    --Select Category--
                  </MenuItem>
                  {Categories.map((c, index) => (
                    <MenuItem key={index} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Description field is required",
                },
                maxLength: {
                  value: 300,
                  message: "Description length cannot be greater than 300",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  sx={{ mb: "10px" }}
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  id="outlined-multiline-static"
                  multiline
                  maxRows={4}
                  label="Description"
                />
              )}
            />
            <Box display="flex" mb="10px">
              <Controller
                name="price"
                control={control}
                rules={{
                  required: { value: true, message: "Price field is requred" },
                  min: { value: 10, message: "Price must be greater than 10" },
                  max: {
                    value: 100000,
                    message: "Price cannot be greater rhan 100_000",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    className="product__form-number"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    id="outlined-required"
                    type="number"
                    label="Price"
                  />
                )}
              />
              <Controller
                name="imageUrl"
                control={control}
                rules={{
                  required: { value: true, message: "Image field is requred" },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    className="product__form-number"
                    id="outlined"
                    label="Image Url"
                  />
                )}
              />
            </Box>
            <Box textAlign="center" mb="10px">
              <Button variant="contained" type="submit">
                {id === "0" ? "Create" : "Update"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
