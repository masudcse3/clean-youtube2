/** @format */

import {
  Box,
  useTheme,
  Grid,
  List,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import YouTube from "react-youtube";
import AllItems from "../../components/playlistItems";
import { tokens } from "../../theme";
const playerOppts = {
  playerVars: {
    autoplay: 1,
  },
};

const SinglePlaylistItem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [videoIndex, setVideoIndex] = useState(0);
  const [value, setValue] = useState(0);
  const { data } = useStoreState((state) => state.playlists);
  const { playlistId } = useParams();

  const { playlistTitle, channelTitle, items } = data[playlistId];

  const handleClick = (index) => {
    setVideoIndex(index);
  };
  const allProps = (index) => {
    return {
      id: `simple-panel-id-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  const handleChnage = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1 }} p="10px 10%">
      <Grid container spacing={2}>
        <Grid item md={8} sm={12}>
          <YouTube
            videoId={items[videoIndex].contentDetails.videoId}
            id={items[videoIndex].contentDetails.videoId}
            opts={playerOppts}
          />
        </Grid>
        <Grid
          item
          md={4}
          sm={12}
          sx={{
            border: `1px solid ${colors.primary[400]}`,
            borderRadius: "4px",
            height: "55vh",
            overflowY: "scroll",
            "&:scroll": {},
          }}
        >
          <Box>
            <Typography fontWeight="bold" mb="10px" variant="h6">
              {playlistTitle}
            </Typography>
            <Typography component="span">
              By {channelTitle} - {videoIndex + 1}/{items.length}
            </Typography>
          </Box>

          {items.map((item, index) => (
            <AllItems
              key={item.contentDetails.videoId}
              title={item.title}
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
            onChange={handleChnage}
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
            <h2>Notes</h2>
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
      hideen={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-panel-id-${index}`}
    >
      {value === index && <Box sx={{ pt: "20px" }}>{children}</Box>}
    </div>
  );
};
export default SinglePlaylistItem;
