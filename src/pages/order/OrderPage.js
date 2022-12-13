import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { Link } from "react-router-dom";
import { ordersByUsername } from "../../apis/orders";
import { useMainContext } from "../../contexts/MainContext";

function OrderPage() {
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
  const { profile } = useMainContext();

  console.log(profile);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    ordersByUsername(profile.username).then((response) => {
      setOrders(response.docs);
    });
  }, []);

  return (
    <div className="App">
      <div
        className="head"
        style={{
          width: "fit-content",
          margin: "auto",
        }}
      >
        <h1
          style={{
            color: "green",
          }}
        >
          Orders
        </h1>
      </div>
      <br />
      <center>
        <Box
          sx={{
            width: "100%",
            maxWidth: "80%",
            bgcolor: "background.paper",
          }}
        >
          <nav>
            <List>
              <ListItem divider>
                <ListItemText primary="Ordered at" />
                <ListItemText primary="Order status" />
                <ListItemText primary="Total" />
                <ListItemText primary="Payment type" />
                <ListItemText primary="Payment status" />
              </ListItem>
              {orders.map((order) => (
                <ListItem divider to={`/orders/${order.orderId}`} component={Link} key={order.orderId}>
                  <ListItem>
                    <ListItemText primary={new Date(+order.createdAt).toLocaleString()} />
                    <ListItemText primary={orderStatus[order.orderStatus]} />
                    <ListItemText primary={order.totalPrice + " VND"} />
                    <ListItemText primary={paymentType[order.paymentType]} />
                    <ListItemText primary={paymentStatus[order.paymentStatus]} />
                  </ListItem>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      </center>
    </div>
  );
}

export default OrderPage;
