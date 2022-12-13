import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ordersByUsername } from "../../apis/orders";
import { useMainContext } from "../../contexts/MainContext";

function OrderPage() {
  const navigate = useNavigate();
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
    if (!profile) return;
    ordersByUsername(profile.username)
      .then((response) => {
        setOrders(response.docs);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "User is not authenticated") {
          localStorage.removeItem("b2c-token");
          navigate("/login");
        }
      });
  }, []);

  return (
    <>
      {profile ? (
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
                    <ListItemText style={{ width: 100 }} primary="Ordered at" />
                    <ListItemText style={{ width: 100 }} primary="Order status" />
                    <ListItemText style={{ width: 100 }} primary="Total" />
                    <ListItemText style={{ width: 100 }} primary="Payment type" />
                    <ListItemText style={{ width: 100 }} primary="Payment status" />
                  </ListItem>
                  {orders.map((order) => (
                    <ListItem divider to={`/orders/${order.orderId}`} component={Link} key={order.orderId}>
                      <ListItem>
                        <ListItemText style={{ width: 100 }} primary={new Date(+order.createdAt).toLocaleString()} />
                        <ListItemText style={{ width: 100 }} primary={orderStatus[order.orderStatus]} />
                        <ListItemText style={{ width: 100 }} primary={order.totalPrice + " VND"} />
                        <ListItemText style={{ width: 100 }} primary={paymentType[order.paymentType]} />
                        <ListItemText style={{ width: 100 }} primary={paymentStatus[order.paymentStatus]} />
                      </ListItem>
                    </ListItem>
                  ))}
                </List>
              </nav>
            </Box>
          </center>
        </div>
      ) : (
        <h2 style={{ padding: 32 }}>Please login</h2>
      )}
    </>
  );
}

export default OrderPage;
