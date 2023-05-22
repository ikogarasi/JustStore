import { Grid } from "@mui/material";
import { ItemCard } from "../../components/card/Card";
import { Product } from "../../common/types/product/product";
import { useMemo } from "react";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";

interface HomeProps {
  category: "all" | "laptops" | "phones" | "watches";
}

export const Home = (props: HomeProps) => {
  const products: Product[] = useAppSelector(
    (state: RootState) => state.products.products
  );

  const filteredProducts = useMemo(
    () =>
      products.filter((it) => {
        if (props.category.toLowerCase() === "all") {
          return true;
        } else {
          return props.category.toLowerCase() === it.category.toLowerCase();
        }
      }),
    [props.category, products]
  );

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={2}
      marginTop={1}
    >
      {(filteredProducts as Array<Product>).map((p) => {
        console.log(p.imageUrl);
        return (
          <Grid item key={p.id}>
            <ItemCard
              id={p.id}
              title={p.name}
              content={p.description}
              price={p.price}
              imageUrl={p.imageUrl}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
