import { Grid, List, ListItem, ListItemText } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import { useParams } from "react-router-dom";
import { getOrderDetails } from "../../apis/orders";

function OrderDetailsPage() {
  const [orderDetails, setOrderDetails] = React.useState({
    account: {
      address: "",
      email: "",
      name: "",
    },
    address: "",
    createdAt: "",
    email: "",
    orderId: "",
    orderStatus: "",
    paymentType: "",
    paymentStatus: "",
    totalPrice: "",
    order_rows: [
      {
        productId: "",
        product: {
          name: "",
          price: "",
        },
        quantity: "",
      },
    ],
  });
  const orderStatus = {
    1: "Pending",
    2: "Delivering",
    3: "Delivered",
  };
  const paymentType = {
    1: "Bank",
    2: "Cash",
    3: "MoMo",
  };
  const paymentStatus = {
    1: "Pending",
    2: "Paid",
  };
  const { orderId } = useParams();
  React.useEffect(() => {
    getOrderDetails(orderId).then((response) => {
      console.log(response);
      setOrderDetails(response);
    });
  }, [setOrderDetails, orderId]);

  return (
    <Container style={{ marginTop: 30, minHeight: "calc(90vh - 64px)" }}>
      <Grid container spacing={8}>
        <Grid item xs={12} lg={6}>
          <p>#{orderDetails.orderId}</p>
          <p>Ordered at: {new Date(+orderDetails.createdAt).toLocaleString()}</p>
          <h2>Order status: {orderStatus[orderDetails.orderStatus]} </h2>
          <h2>Payment type: {paymentType[orderDetails.paymentType]} </h2>
          <h2>Payment status: {paymentStatus[orderDetails.paymentStatus]} </h2>
          <h2>Total price: {orderDetails.totalPrice} VND</h2>
        </Grid>
        <Grid item xs={12} lg={6}>
          <List>
            <ListItem divider>
              <ListItemText primary="Product" style={{ width: 100 }} />
              <ListItemText style={{ width: 100 }} primary="Quantity" />
              <ListItemText style={{ width: 100 }} primary="Price" />
            </ListItem>
            {orderDetails.order_rows.map((order_row) => (
              <ListItem divider key={order_row.productId} style={{ alignItems: "center", justifyContent: "center" }}>
                <ListItemText primary={order_row.product.name} style={{ width: 100 }} />
                <ListItemText style={{ width: 100, alignContent: "center" }} primary={order_row.quantity} />
                <ListItemText style={{ width: 100 }} primary={order_row.product.price} VND />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OrderDetailsPage;
