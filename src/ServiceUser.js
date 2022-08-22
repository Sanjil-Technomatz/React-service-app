import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import background from "./2.jpg";
import { useSelector, useDispatch } from "react-redux";

import { singleData } from "./dataReducer";

export default function ServiceUser(props) {
  const filterData = useSelector((state) => state.service.singleData);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((res) => {
        dispatch(singleData(res.users[res.users.length - 1]));
      });
  }, [dispatch]);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        height: "100vh",
        width: "100%",
      }}
    >
      {" "}
      <Card
        sx={{
          maxWidth: 445,
          minHeight: 400,
          paddingTop: 3,
          position: "relative",
          top: "20%",
          left: "38%",
          boxShadow: "gray 5px 9px  10px",
          borderRadius: "20px",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Name : {filterData.name} <br />
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {" "}
              Email : {filterData.email} <br />
              Mobile : {filterData.mob_no} <br />
              Price : {filterData.price} Rs/-
              <br />
              Service : {filterData.role}
              <br />
              Address : {filterData.address}
              <br />
              Password : {filterData.password}
              <br />
              {/* Id : {filterData.id} */}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => props.history.push("/editDetails")}
          >
            Edit Details
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => props.history.push("/dashboard")}
          >
            Dashboard
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
