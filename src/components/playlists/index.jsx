/** @format */
import { useStoreState } from "easy-peasy";
import { Link as RouterLink } from "react-router-dom";

import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import { tokens } from "../../theme";

const SinglePlaylist = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, isLoading } = useStoreState((state) => state.playlists);
  let playlistsArr = Object.keys(data);
  playlistsArr = playlistsArr.map((id) => {
    const { playlistId, playlistTitle, playlistDescription, thumbnail } =
      data[id];
    return {
      playlistId,
      playlistTitle,
      playlistDescription,
      thumbnail,
    };
  });

  return playlistsArr.length > 0
    ? playlistsArr.map((playlist) => (
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
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                image={playlist.thumbnail.url}
                alt={playlist.playlistTitle}
              />
              <CardContent>
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
          <CardActions>
            <Link
              to={`/playlist/${playlist.playlistId}`}
              component={RouterLink}
              sx={{
                textDecoration: "none",
              }}
            >
              <Button
                size="small"
                sx={{
                  color: "#fff",
                  backgroundColor: colors.blueAccent[500],
                  padding: "5px 20px",
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: colors.blueAccent[600],
                  },
                }}
              >
                <PlayCircleOutlineIcon />

                <Typography>Play</Typography>
              </Button>
            </Link>
          </CardActions>
        </Card>
      ))
    : "No playlist, Please add One";
};

export default SinglePlaylist;
