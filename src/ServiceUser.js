import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { fetchSingleUserData } from "./apiServices";
import { deleteUserData } from "./apiServices";
import { style } from "./boxStyle";

export default function ServiceUser(props) {
  const filterData = useSelector((state) => state.service.singleData);
  const failed = useSelector((state) => state.service.error);
  const loading = useSelector((state) => state.service.loading);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchSingleUserData();
  }, []);

  const handleClick = () => {
    deleteUserData(filterData.id);
    setOpen(true);
    setTimeout(() => {
      props.history.push("/");
    }, 2000);
  };

  return (
    <div id="background">
      {" "}
      {loading && <h1>Loading Data...</h1>}
      {failed !== "" && <h1>{failed}</h1>}
      {failed === "" && !loading ? (
        <>
          <Card
            sx={{
              maxWidth: 445,
              minHeight: 350,
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
              <Button variant="outlined" color="error" onClick={handleClick}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </>
      ) : null}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h1">
            Data deleted succefully
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
