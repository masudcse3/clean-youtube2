/** @format */
import React from "react";
import { Box, Grid, Divider, Typography } from "@mui/material";

const AllItems = ({ thumbnail, title, onClick }) => {
  return (
    <Box p="0px 10px 5px 10px">
      <Grid
        container
        alignItems="center"
        onClick={onClick}
        sx={{ cursor: "pointer" }}
      >
        <Grid item sm={4}>
          <img src={thumbnail} alt={title} width="100%" />
        </Grid>
        <Grid item sm={8} p="0 0 0 10px">
          <Typography>{title}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default AllItems;
