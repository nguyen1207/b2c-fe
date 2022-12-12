import { Button, ButtonGroup, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../apis/products";

function ProductPage() {
  const [product, setProduct] = useState({
    imageUrl: "",
    name: "",
    description: "",
    price: 0,
  });
  const [quantity, setQuantity] = useState(0);

  const { productId } = useParams();

  useEffect(() => {
    getProductById(productId).then((product) => {
      setProduct(product);
    });
  }, [productId]);

  const handleAddToCart = () => {
    if (quantity === 0) return;

    let storageCart = JSON.parse(localStorage.getItem("cart"));

    const newCart = JSON.stringify({
      ...storageCart,
      [productId]: quantity,
    });

    localStorage.setItem("cart", newCart);
  };

  return (
    <Container style={{ marginTop: 30, minHeight: "calc(90vh - 64px)" }}>
      <Grid container spacing={8}>
        <Grid item xs={12} lg={6}>
          <img src={product.imageUrl} alt={product.name} style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <>
            <h2>{product.name}</h2>
            <h5 style={{ color: "#333", marginBottom: 20 }}>Price: {product.price} ₫</h5>
            <ButtonGroup style={{ marginRight: 30 }}>
              {quantity > 0 ? (
                <Button onClick={() => setQuantity(quantity - 1)}>-</Button>
              ) : (
                <Button disabled onClick={() => setQuantity(quantity - 1)}>
                  -
                </Button>
              )}
              <Button disabled>{quantity}</Button>
              <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
            </ButtonGroup>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>
              Add to cart
            </Button>
          </>
        </Grid>
      </Grid>
      <hr />
      <Typography variant="h4" style={{ marginTop: 20 }}>
        Overview
      </Typography>

      <p style={{ padding: 50 }}>{product.description}</p>
    </Container>
  );
}

export default ProductPage;
