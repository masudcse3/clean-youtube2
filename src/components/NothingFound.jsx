/** @format */

import { Box, Typography } from "@mui/material";
import React from "react";

const NothingFound = ({ title }) => {
  return (
    <Box p="50px 0 0 0" width="1280px">
      <Typography variant="h2" align="center">
        {title}
      </Typography>
    </Box>
  );
};

export default NothingFound;
