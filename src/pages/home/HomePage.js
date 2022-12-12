import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { getProducts } from "../../apis/products";
import ProductCard from "./components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.docs);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} md={3}>
            <ProductCard key={product.productId} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;
