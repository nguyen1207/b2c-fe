import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../apis/orders";

function CheckoutPage() {
  const emailRef = React.useRef();
  const addressRef = React.useRef();
  const navigate = useNavigate();

  const [paymentType, setPaymentType] = React.useState("");

  console.log(paymentType);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const address = addressRef.current.value;
    const orderRowsObj = JSON.parse(localStorage.getItem("cart"));
    const orderRows = Object.keys(orderRowsObj).map((key) => {
      return {
        productId: key,
        quantity: orderRowsObj[key],
      };
    });

    const payload = {
      email,
      address,
      paymentType,
      orderRows,
    };

    createOrder(payload)
      .then((data) => {
        alert("Order created successfully");
        localStorage.removeItem("cart");
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div style={{ padding: 32, width: "50%", marginLeft: "25%" }}>
      <Typography variant="h6" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            inputRef={emailRef}
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={addressRef}
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Payment type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Cash"
                control={<Radio />}
                label="Cash"
                onClick={(e) => setPaymentType(e.target.value)}
              />
              <FormControlLabel
                value="Bank"
                control={<Radio />}
                label="Bank"
                onClick={(e) => setPaymentType(e.target.value)}
              />
              <FormControlLabel
                value="MoMo"
                control={<Radio />}
                label="MoMo"
                onClick={(e) => setPaymentType(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button style={{ float: "right" }} onClick={handleSubmit}>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CheckoutPage;
