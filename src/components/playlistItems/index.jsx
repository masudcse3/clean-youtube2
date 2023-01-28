/** @format */
import React from "react";
import { Box, Grid, Divider, Typography } from "@mui/material";

const AllItems = ({ thumbnail, title, onClick }) => {
  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        onClick={onClick}
        sx={{ cursor: "pointer" }}
      >
        <Grid item sm={4}>
          <img src={thumbnail} alt={title} width="100%" />
        </Grid>
        <Grid item sm={8} p="0 0 0 5px">
          <Typography>{title}</Typography>
        </Grid>
      </Grid>
      <Divider variant="inset" component="div" />
    </React.Fragment>
  );
};

export default AllItems;
