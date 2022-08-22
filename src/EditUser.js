import * as React from "react";
import { useState, useEffect } from "react";
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
import { singleData } from "./dataReducer";
import { useSelector, useDispatch } from "react-redux";
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

function EditUser(props) {
  const filterData = useSelector((state) => state.service.singleData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((res) => {
        dispatch(singleData(res.users[res.users.length - 1]));
      });
  }, [dispatch]);
  const [name, setName] = useState(filterData.name);
  const [email, setEmail] = useState(filterData.email);
  const [role, setRole] = useState(filterData.role);
  const [address, setAddress] = useState(filterData.address);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(filterData.password);
  const [mob_no, setMob_no] = useState(filterData.mob_no);
  const [price, setPrice] = useState(filterData.price);

  const handleClick = () => {
    let data = {
      name,
      email,
      mob_no,
      role,
      address,
      price,
      password,
    };
    fetch(`http://localhost:3001/users/${filterData.id}`, {
      method: "PUT",
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
      role !== "" &&
      password !== "" &&
      price !== "" &&
      address !== ""
    ) {
      setOpen(true);
      setTimeout(() => {
        props.history.push("/userDetails");
      }, 2000);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: "100vh",
        width: "100%",
        marginTop: "0px",
      }}
    >
      <form id="form" action="">
        <h1>Update your details</h1>
        <br />
        <TextField
          id="outlined-required"
          required
          style={{ width: "50%" }}
          label="First Name"
          placeholder="Enter your first name here"
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
          id="outlined-number"
          autoComplete="password"
          label="password"
          type="password"
          required
          style={{ width: "50%" }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br /> <br />
        <Button
          onClick={handleClick}
          style={{ marginRight: "20px", width: "24%" }}
          variant="outlined"
          color="success"
        >
          Update
        </Button>
        <Button
          onClick={() => props.history.push("/userDetails")}
          style={{ width: "24%" }}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
      </form>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            Data Updated Successfully
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
            Mobile Number : {mob_no} <br /> role : {role} <br /> Price : {price}{" "}
            Rs/- <br />
            Email : {email} <br />
            Address : {address}
            <br />
            password : {password}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default withRouter(EditUser);
