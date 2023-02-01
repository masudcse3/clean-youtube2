/** @format */

import { useContext, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { Box, IconButton, Link, Typography, useTheme } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { ColorModeContext, tokens } from "../../theme";

const Appbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box position="sticky" top="0" sx={{ zIndex: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={colors.primary[400]}
        p="10px 20px"
      >
        <Box>
          <Link
            to="/"
            component={RouteLink}
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton color="secondary">
              <CleaningServicesIcon />
            </IconButton>
            <Typography
              variant="h4"
              color={colors.blueAccent[400]}
              sx={{
                "&:hover": {
                  color: colors.blueAccent[500],
                },
              }}
            >
              Clean Youtube
            </Typography>
          </Link>
        </Box>
        {/*  */}
        <Box display="flex" alignItems="center" gap="20px">
          <Link
            to="/recent"
            component={RouteLink}
            sx={{ textDecoration: "none" }}
          >
            <Typography color="secondary">Recent</Typography>
          </Link>
          <Link
            to="/favorite"
            component={RouteLink}
            sx={{ textDecoration: "none" }}
          >
            <Typography color="secondary">Favorite</Typography>
          </Link>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
        {/* popup modal form */}
      </Box>
      {/* <PlaylistForm open={open} handleClose={handleClose} /> */}
    </Box>
  );
};

export default Appbar;
