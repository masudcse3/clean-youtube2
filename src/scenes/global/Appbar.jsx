/** @format */

import { useContext, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { ColorModeContext, tokens } from "../../theme";
import PlaylistForm from "../../components/playlistForm";

const Appbar = ({ addNewPlaylist }) => {
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
    <Box>
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
            }}
          >
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
        <Box display="flex" gap="20px">
          <Button
            variant="filled"
            onClick={handleOpen}
            sx={{
              backgroundColor: colors.blueAccent[500],
              color: " #fff",
              padding: "5px 20px !important",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
            }}
          >
            Add New
          </Button>
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
      <PlaylistForm
        open={open}
        handleClose={handleClose}
        addNewPlaylist={addNewPlaylist}
      />
    </Box>
  );
};

export default Appbar;
