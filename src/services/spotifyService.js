import http from "./httpService";
import { toast } from "react-toastify";
const url = "https://accounts.spotify.com/authorize";
const clientId = process.env.REACT_APP_CLIENT_ID;
const scopes = "playlist-modify-public";
const redirect_uri = "http://localhost:3000/";
let userId;

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
      // toast.error("res", data);

      return data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    } catch (err) {
      toast.error(err);
    }
  },

  async getCurrentUserId() {
    if (userId) return userId;
    try {
      const token = await this.getAccessToken();
      http.setHeaders(token);

      const { data } = await http.get("/me");
      userId = data.id;

      return userId;
    } catch (err) {
      toast.error(err);
    }
  },

  async getUserPlaylists() {
    try {
      const userId = await this.getCurrentUserId();
      const token = await this.getAccessToken();
      http.setHeaders(token);
      const { data } = await http.get(`/users/${userId}/playlists`);

      return data.items.map((item) => ({
        id: item.id,
        name: item.name,
      }));
    } catch (err) {
      toast.error(err);
    }
  },

  async getPlaylist(id) {
    try {
      const token = await this.getAccessToken();
      http.setHeaders(token);
      const userId = await this.getCurrentUserId();
      const { data } = await http.get(
        `/users/${userId}/playlists/${id}/tracks`,
      );
      return data.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        uri: item.track.uri,
      }));
    } catch (err) {
      toast.error(err);
    }
  },

  async savePlaylist(name, uris, playlistId) {
    if (!name && !uris.length) return;

    const userId = await this.getCurrentUserId();
    const token = await this.getAccessToken();
    http.setHeaders(token);

    if (playlistId) {
      try {
        await http.put(`/playlists/${playlistId}`, { name });
        await http.put(`/users/${userId}/playlists/${playlistId}/tracks`, {
          uris,
        });
      } catch (err) {
        toast.error(err);
      }
    } else {
      try {
        const res = await http.post(`/users/${userId}/playlists`, {
          name,
        });
        const playlistId = res.data.id;
        await http.post(`/users/${userId}/playlists/${playlistId}/tracks`, {
          uris,
        });
      } catch (err) {
        toast.error(err);
      }
    }
  },
};

export default Spotify;
