/** @format */

import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const NothingFound = ({ title }) => {
  return (
    <Box p="50px 0 0 0" sx={{ gridColumn: "span 4" }}>
      <Typography variant="h2" align="center">
        {title}
      </Typography>
    </Box>
  );
};

export default NothingFound;
