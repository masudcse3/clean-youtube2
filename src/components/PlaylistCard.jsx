/** @format */
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link as RouterLink } from "react-router-dom";

import { Tooltip, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { tokens } from "../theme";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";

const PlaylistCard = ({ playlist, deleteItem }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [favorite, setFavorite] = useState("false");
  const { deletePlaylist } = useStoreActions((actions) => actions.playlists);
  const { addToRecent, removeFromRecent } = useStoreActions(
    (actions) => actions.recent
  );
  const { items } = useStoreState((state) => state.favorite);

  useEffect(() => {
    if (items.includes(playlist.playlistId)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, []);
  const { addToFavorite, removeFromFavorite } = useStoreActions(
    (actions) => actions.favorite
  );

  const handleDelete = (playlistId) => {
    if (confirm("Are you sure you want to delete?")) {
      removeFromFavorite(playlistId);
      removeFromRecent(playlistId);
      deletePlaylist(playlistId);
    }
  };
  const handleFavorite = (playlistId) => {
    if (!favorite) {
      addToFavorite(playlistId);
      setFavorite(true);
    } else {
      removeFromFavorite(playlistId);
      setFavorite(false);
    }
  };

  const handleRecent = (playlistId) => {
    addToRecent(playlistId);
    console.log("added");
  };
  return (
    <Card
      sx={{
        background: colors.primary[400],
        gridColumn: "span 1",
      }}
      key={playlist.playlistId}
    >
      <Link
        to={`/playlist/${playlist.playlistId}`}
        component={RouterLink}
        sx={{ textDecoration: "none" }}
        onClick={() => handleRecent(playlist.playlistId)}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="180"
            image={playlist.thumbnail.url}
            alt={playlist.playlistTitle}
          />
          <CardContent sx={{ minHeight: "100px" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              color={colors.grey[100]}
            >
              {playlist.playlistTitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="0 10px 6px 0"
      >
        <Tooltip title="Start Tutorial" arrow>
          <Link
            to={`/playlist/${playlist.playlistId}`}
            component={RouterLink}
            sx={{
              textDecoration: "none",
              display: "flex",
              color: colors.blueAccent[500],
              alignItems: "center",
            }}
            onClick={() => handleRecent(playlist.playlistId)}
          >
            <IconButton color="secondary">
              <PlayCircleOutlineIcon />
            </IconButton>
            <Typography color="secondary">PLAY</Typography>
          </Link>
        </Tooltip>

        <Box>
          <Box display="flex">
            <Box>
              <Tooltip
                title={favorite ? "Remove from Favorite" : "Add to Favorite"}
                arrow
              >
                <IconButton
                  onClick={() => handleFavorite(playlist.playlistId)}
                  color="secondary"
                >
                  {favorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Tooltip>
            </Box>
            {deleteItem && (
              <Box>
                <Tooltip title="Delete" arrow>
                  <IconButton
                    onClick={() => handleDelete(playlist.playlistId)}
                    color="secondary"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PlaylistCard;
