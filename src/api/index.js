/** @format */

import axios from "axios";
const KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const getPlaylistItems = async (playlistId, pageToken = "", results = []) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${playlistId}&key=${KEY}&maxResults=50&pageToken=${pageToken}`;

  const { data } = await axios.get(URL);
  results = [...results, ...data.items];
  if (data.nextPageToken) {
    results = getPlaylistItems(playlistId, data.nextPageToken, results);
  }
  return results;
};

const getPlaylist = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${KEY}`;
  const { data } = await axios.get(URL);
  // modify the playlist items
  let playlistItems = await getPlaylistItems(playlistId);
  playlistItems = playlistItems.map((item) => {
    const {
      title,
      description,
      thumbnails: { medium },
    } = item.snippet;
    return {
      title,
      description,
      thumbnail: medium,
      contentDetails: item.contentDetails,
    };
  });

  const { channelId, title, description, thumbnails, channelTitle } =
    data.items[0].snippet;

  return {
    channelId,
    playlistTitle: title,
    playlistId: data.items[0].id,
    playlistDescription: description,
    thumbnail: thumbnails.medium,
    channelTitle,
    items: playlistItems,
  };
};

export default getPlaylist;
