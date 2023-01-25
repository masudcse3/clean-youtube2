/** @format */

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { PlayCircleOutline } from "@mui/icons-material";
import {
  useTheme,
  Button,
  CardActionArea,
  CardActions,
  IconButton,
  Typography,
  Link,
} from "@mui/material";
import { tokens } from "../../theme";
import { Link as RouterLink } from "react-router-dom";
const SinglePlaylist = ({ playlists }) => {
  let playlistsArr = Object.keys(playlists);
  playlistsArr = playlistsArr.map((id) => {
    const { playlistId, playlistTitle, playlistDescription, thumbnail } =
      playlists[id];
    return {
      playlistId,
      playlistTitle,
      playlistDescription,
      thumbnail,
    };
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return playlistsArr.length > 0
    ? playlistsArr.map((playlist) => (
        <Card
          sx={{
            background: colors.primary[400],
            gridColumn: "span 1",
          }}
          key={playlist.playlistId}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="180"
              image={playlist.thumbnail.url}
              alt={playlist.playlistTitle}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {playlist.playlistTitle}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link
              to={`/playlist/${playlist.playlistId}`}
              component={RouterLink}
            >
              <Button
                size="small"
                sx={{
                  color: colors.blueAccent[500],
                  backgroundColor: colors.primary[400],
                  padding: "5px 20px",
                  display: "flex",
                  gap: 0.5,
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <PlayCircleOutline />

                <Typography>Play</Typography>
              </Button>
            </Link>
          </CardActions>
        </Card>
      ))
    : "No playlist, Please add One";
};

export default SinglePlaylist;
