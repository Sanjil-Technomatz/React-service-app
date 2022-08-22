import * as React from "react";
import { useState } from "react";
import "./App.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { withRouter } from "react-router";
import background from "./4.jpg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [mob_no, setMob_no] = useState("");
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState("");

  const handleClick = () => {
    let data = {
      name,
      email,
      mob_no,
      role,
      address,
      password,
      price,
    };
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (
      name !== "" &&
      email !== "" &&
      mob_no !== "" &&
      password !== "" &&
      role !== "" &&
      price !== "" &&
      address !== ""
    ) {
      setOpen(true);
      setTimeout(() => {
        props.history.push("/userDetails");
      }, 2000);
    } else {
      alert("Fill all details properly");
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "100% 100%",
          height: "100vh",
          width: "100%",
          marginTop: "0px",
        }}
      >
        <form id="form" action="">
          <h1>Enter your details</h1>
          <br />
          <TextField
            id="outlined-required"
            required
            style={{ width: "50%" }}
            label="Name"
            placeholder="Enter your name here"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />{" "}
          <br /> <br />
          <TextField
            id="outlined-required"
            required
            style={{ width: "50%" }}
            label="Email"
            placeholder="Enter your mail here"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <br /> <br />
          <TextField
            id="outlined-number"
            required
            style={{ width: "50%" }}
            autoComplete="username"
            label="Mobile Number"
            type="number"
            value={mob_no}
            onChange={(event) => setMob_no(event.target.value)}
          />{" "}
          <br /> <br />
          <TextField
            id="outlined-required"
            required
            style={{ width: "50%" }}
            label="address"
            placeholder="Enter your address here"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <br /> <br />
          <Box sx={{ maxWidth: "50%", marginLeft: 23 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Service</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="role"
                onChange={(event) => setRole(event.target.value)}
                required
                autoComplete="role"
              >
                <MenuItem value={"plumber"}>plumber</MenuItem>
                <MenuItem value={"washerman"}>washerman</MenuItem>
                <MenuItem value={"electrician"}>electrician</MenuItem>
              </Select>
            </FormControl>
          </Box>{" "}
          <br />
          <TextField
            id="outlined-number"
            autoComplete="price"
            label="Price"
            type="number"
            required
            style={{ width: "50%" }}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />{" "}
          <br /> <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            value={password}
            required
            style={{ width: "50%" }}
            placeholder="Enter your Password here"
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />{" "}
          <br /> <br />
          <Button
            onClick={handleClick}
            style={{ marginRight: "20px", width: "24%" }}
            variant="outlined"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => props.history.push("/dashboard")}
            variant="outlined"
            style={{ width: "24%" }}
          >
            Dashboard
          </Button>
        </form>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h1">
              Sign Up Successfully
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              sx={{ mt: 2 }}
              component="h2"
            >
              Name : {name}
            </Typography>
            <Typography id="modal-modal-description">
              Mobile Number : {mob_no} <br /> role : {role} <br /> Price :{" "}
              {price} Rs/- <br />
              Email : {email} <br />
              Address : {address}
              <br />
              Password : {password}
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default withRouter(Signup);
