import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { serviceData } from "./dataReducer";

export default function Dashboard() {
  const [service, setService] = useState("");

  const filterData = useSelector((state) => state.service.data);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setService(event.target.value);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/users`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(serviceData(res.users));
      });
  }, [dispatch]);

  const handleClick = () => {
    fetch(`http://localhost:3001/users/?role=${service}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(serviceData(res.users));
      });
  };

  return (
    <div>
      <div id="form2">
        <Box sx={{ maxWidth: 320, marginLeft: 96 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Service
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={service}
              label="Select Service"
              onChange={handleChange}
            >
              <MenuItem value={"plumber"}>Plumber</MenuItem>
              <MenuItem value={"electrician"}>Electrician</MenuItem>
              <MenuItem value={"washerman"}>Washerman</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button onClick={handleClick} variant="outlined">
          Filter
        </Button>
      </div>
      <br />

      {filterData.length !== 0 &&
        filterData.map((item, index) => {
          return (
            <Card
              key={index}
              sx={{
                float: "left",
                p: 4,
                m: 6,
                bgcolor: "background.paper",
                minWidth: 450,
                borderRadius: 1,
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    Name : {item.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Price : {item.price} Rs/- <br />
                    {/* Email : {item.email} <br />
                    Mobile : {item.mob_no} <br /> */}
                    Service : {item.role}
                    <br />
                    Address : {item.address}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Contact
                </Button>
              </CardActions>
            </Card>
          );
        })}
    </div>
  );
}
