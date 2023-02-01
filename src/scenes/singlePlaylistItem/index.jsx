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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import YouTube from "react-youtube";
import AllItems from "../../components/playlistItems";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";

const SinglePlaylistItem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [videoIndex, setVideoIndex] = useState(0);
  const [value, setValue] = useState(0);

  const { data } = useStoreState((state) => state.playlists);
  const { data: noteData } = useStoreState((state) => state.notes);
  const { newNotes } = useStoreActions((action) => action.notes);
  const { playlistId } = useParams();

  const { playlistTitle, channelTitle, items } = data[playlistId];
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const videoId = items[videoIndex].contentDetails.videoId;
  const allProps = (index) => {
    return {
      id: `simple-panel-id-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  const playerOppts = {
    width: isNonMobile ? "1150" : "640",
    height: isNonMobile ? "650" : "360",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Box p={isNonMobile ? "20px 50px" : "8px"}>
      <Grid container>
        <Grid item md={8} sm={12}>
          <YouTube videoId={videoId} id={videoId} opts={playerOppts} />
        </Grid>
        <Grid
          item
          md={4}
          sm={12}
          height="72vh"
          sx={{
            border: `1px solid ${colors.primary[400]}`,
            borderRadius: "4px",
            overflowY: "scroll",
          }}
        >
          <Box
            height="100px"
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
            <Box height="15px"></Box>
            <Divider />
          </Box>

          {items.map((item, index) => (
            <AllItems
              key={item?.contentDetails?.videoId}
              title={item?.title}
              thumbnail={item?.thumbnail?.url}
              onClick={() => setVideoIndex(index)}
            />
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={2} mt="20px">
        <Grid
          item
          sm={12}
          sx={{
            border: `1px solid ${colors.primary[400]}`,
            borderRadius: "4px",
            padding: "20px",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            {items[videoIndex].title}
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label="Description" {...allProps(0)} />
            <Tab label="Note" {...allProps(1)} />
          </Tabs>
          <TabPanel index={0} value={value}>
            <Typography>{items[videoIndex].description}</Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography>Take Important Notes</Typography>
            <Box display="flex" gap="5px" p="10px 0">
              <TextField
                fullWidth
                name="note"
                label="Note"
                onChange={noteHandleChange}
                onBlur={() =>
                  handleBlur(noteData[videoId] ? noteData[videoId] : "")
                }
                type="text"
                multiline
                rows={10}
                color="secondary"
                value={noteData[videoId] ? noteData[videoId] : ""}
              />
            </Box>
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};
const TabPanel = ({ index, children, value, ...other }) => {
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-panel-id-${index}`}
    >
      {value === index && <Box sx={{ pt: "20px" }}>{children}</Box>}
    </div>
  );
};
export default SinglePlaylistItem;
