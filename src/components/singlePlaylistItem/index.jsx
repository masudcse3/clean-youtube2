/** @format */

import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const SinglePlaylistItem = ({ playlists }) => {
  const { playlistId } = useParams();

  const { playlistTitle, playlistDescription, items } = playlists[playlistId];
  return (
    <Box>
      <h2>{playlistTitle}</h2>
      <p>{playlistDescription}</p>
      <ul>
        {items.map((item) => (
          <li key={item.contentDetails.videoId}>{item.title}</li>
        ))}
      </ul>
    </Box>
  );
};

export default SinglePlaylistItem;
