/** @format */

import {
  Box,
  useTheme,
  Grid,
  Button,
  Typography,
  Tabs,
  Tab,
  TextField,
  Divider,
  Drawer,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import YouTube from "react-youtube";
import useMediaQuery from "@mui/material/useMediaQuery";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { tokens } from "../../theme";
import AllItems from "../../components/playlistItems";

const SinglePlaylistItem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [videoIndex, setVideoIndex] = useState(0);

  const [open, setOpen] = useState(false);
  const [Descriptionopen, setDescriptionopen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  const { data } = useStoreState((state) => state.playlists);
  const { data: noteData } = useStoreState((state) => state.notes);
  const { newNotes } = useStoreActions((action) => action.notes);
  const { playlistId } = useParams();

  const { playlistTitle, channelTitle, items } = data[playlistId];
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const videoId = items[videoIndex].contentDetails.videoId;
  let videoWidth;
  let videoHeight = window.innerHeight;
  videoHeight = parseInt(videoHeight - 100);
  videoWidth = parseInt((videoHeight * 16) / 9);
  const noteHandleChange = (e) => {
    newNotes({
      id: videoId,
      notes: [e.target.value],
    });
  };

  const handleBlur = (value) => {
    newNotes({
      id: videoId,
      notes: value,
    });
  };

  const handleVideoIndex = (index) => {
    setVideoIndex(index);
  };
  const playerOppts = {
    width: `${isNonMobile ? videoWidth : "360"}`,
    height: `${isNonMobile ? videoHeight : "202"}`,
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Box>
      <Box>
        <Tooltip title="All Videos">
          <IconButton onClick={() => setOpen(!open)} color="secondary">
            <PlaylistPlayOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Description">
          <IconButton
            onClick={() => setDescriptionopen(!Descriptionopen)}
            color="secondary"
          >
            <DescriptionOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notes">
          <IconButton onClick={() => setNoteOpen(!noteOpen)} color="secondary">
            <RateReviewOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        mt={isNonMobile ? "-40px" : "20px"}
      >
        <YouTube videoId={videoId} id={videoId} opts={playerOppts} />
      </Box>

      {/*  Playlist Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(!open)}
        sx={{
          "& .MuiPaper-root.MuiDrawer-paper": {
            background: colors.primary[400],
          },
        }}
      >
        <Box
          sx={{
            width: isNonMobile ? "450px" : "250px",
          }}
        >
          <Box
            p="20px 0px"
            position="sticky"
            top="0px"
            sx={{ background: colors.primary[500], zIndex: 1 }}
          >
            <Typography fontWeight="bold" mb="10px" variant="h6" p="0 10px">
              {playlistTitle}
            </Typography>
            <Typography component="span" p="10px">
              By {channelTitle} - {videoIndex + 1}/{items.length}
            </Typography>
          </Box>

          <Box p="10px 0">
            {items.map((item, index) => (
              <AllItems
                key={item?.contentDetails?.videoId}
                title={item?.title}
                thumbnail={item?.thumbnail?.url}
                onClick={() => handleVideoIndex(index)}
              />
            ))}
          </Box>
        </Box>
      </Drawer>
      {/* Description Drawer  */}
      <Drawer
        anchor="right"
        open={Descriptionopen}
        onClose={() => setDescriptionopen(!Descriptionopen)}
        sx={{
          ".MuiPaper-root.MuiDrawer-paper": {
            background: colors.primary[400],
          },
        }}
      >
        <Box
          sx={{
            width: isNonMobile ? "500px" : "300px",
            background: colors.primary[400],
            padding: "20px",
          }}
        >
          <Typography variant="h4" fontWeight="bold" p="0 0 10px 0">
            {items[videoIndex].title}
          </Typography>
          <Divider />
          <Typography p="10px 0 0 0 ">
            {items[videoIndex].description}
          </Typography>
        </Box>
      </Drawer>
      {/* Note Drawer  */}
      <Drawer
        anchor="right"
        open={noteOpen}
        onClose={() => setNoteOpen(!noteOpen)}
        sx={{
          ".MuiPaper-root.MuiDrawer-paper": {
            background: colors.primary[400],
          },
        }}
      >
        <Box
          sx={{
            width: isNonMobile ? "500px" : "300px",
            background: colors.primary[400],
            padding: "20px",
          }}
        >
          <TextField
            fullWidth
            name="note"
            color="secondary"
            label="Note"
            type="text"
            multiline
            rows="31"
            onChange={noteHandleChange}
            onBlur={() =>
              handleBlur(noteData[videoId] ? noteData[videoId] : "")
            }
            value={noteData[videoId] ? noteData[videoId] : ""}
          />
        </Box>
      </Drawer>
    </Box>
  );
};

export default SinglePlaylistItem;
