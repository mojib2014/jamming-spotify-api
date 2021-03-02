import http from "./httpService";

const url = "https://accounts.spotify.com/authorize";
const clientId = process.env.REACT_APP_CLIENT_ID;
const scopes = "playlist-modify-public";
const redirect_uri = "http://selective-heart.surge.sh/";

let accessToken;
let expiresIn;
const Spotify = {
  async getAccessToken() {
    if (accessToken) return accessToken;

    // Check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = Number(expiresInMatch[1]);

      // This clears the parameters, allowing us to grab a new access token when it expires
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      const accessUrl = `${url}?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirect_uri}`;
      window.location = accessUrl;
    }
  },

  async search(searchTerm) {
    const token = await this.getAccessToken();
    http.setHeaders(token);
    try {
      const { data } = await http.get(`/search?type=track&q=${searchTerm}`);

      if (!data.tracks) return [];

      return data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (err) {
      console.log(err);
    }
  },

  async savePlaylist(name, uris) {
    if (!name && !uris.length) return;

    try {
      const token = await this.getAccessToken();
      http.setHeaders(token);
      let userId;
      let playlistId;

      const { data } = await http.get("/me", {});
      userId = data.id;

      const res = await http.post(`/users/${userId}/playlists`, { name });
      playlistId = res.data.id;
      await http.post(`/users/${userId}/playlists/${playlistId}/tracks`, {
        uris,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

export default Spotify;
