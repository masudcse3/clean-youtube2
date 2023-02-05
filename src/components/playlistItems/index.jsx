/** @format */
import React from "react";
import { Box, Grid, Divider, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";

const AllItems = ({ thumbnail, title, onClick }) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box p="0px 10px 5px 10px">
      <Grid
        container
        alignItems="center"
        onClick={onClick}
        sx={{ cursor: "pointer" }}
      >
        <Grid item md={4}>
          <img src={thumbnail} alt={title} width="100%" />
        </Grid>
        <Grid item md={8} p="0 0 0 10px">
          <Typography>{title}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default AllItems;
