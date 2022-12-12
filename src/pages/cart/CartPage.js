import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

import { getProductsByIds } from "../../apis/products";

function CartPage() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [total, setTotal] = React.useState(0);
  const [cartRows, setCartRows] = React.useState([
    {
      id: "",
      name: "",
      quantity: "",
      price: "",
      subtotal: "",
    },
  ]);

  const productIds = Object.keys(cart);

  React.useEffect(() => {
    getProductsByIds(productIds).then((data) => {
      const rows = [];
      data.forEach((product) => {
        rows.push({
          id: product.productId,
          name: product.name,
          quantity: cart[product.productId],
          price: product.price,
          subtotal: Number(cart[product.productId]) * Number(product.price),
        });
      });
      console.log(rows);
      setCartRows(rows);
      setTotal(rows.reduce((acc, cur) => acc + cur.subtotal, 0));
    });
  }, []);

  const cartColumns = [
    { field: "name", headerName: "Name", width: 700 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "subtotal", headerName: "Subtotal", width: 150 },
  ];

  return (
    <div style={{ height: "500px", width: "90%", padding: 50 }}>
      <DataGrid rows={cartRows} columns={cartColumns} hideFooterPagination hideFooterSelectedRowCoun />
      <span style={{ float: "right", fontWeight: "bold", fontSize: 24 }}>Total: {total} ₫</span>
      <br />
      <br />
      <Button variant="contained" color="primary" style={{ marginTop: 20, float: "right" }}>
        Order
      </Button>
    </div>
  );
}

export default CartPage;
