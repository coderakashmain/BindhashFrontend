import React, { useEffect, useState } from "react";
import axios from "axios";

const SpotifyMusic = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                console.log("Fetching Spotify Access Token...");

                const encodedCredentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
                const tokenResponse = await axios.post(
                    "https://accounts.spotify.com/api/token",
                    new URLSearchParams({ grant_type: "client_credentials" }),
                    {
                        headers: {
                            Authorization: `Basic ${encodedCredentials}`,
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );

                const accessToken = tokenResponse.data.access_token;
                console.log("Access Token Received:", accessToken);

                console.log("Fetching Spotify Playlists...");
                const songResponse = await axios.get(
                    "https://api.spotify.com/v1/browse/new-releases",
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );

                console.log("Spotify API Response:", songResponse.data);

                const tracksPromises = songResponse.data.albums.items.map(async (album) => {
                    const trackResponse = await axios.get(
                        `https://api.spotify.com/v1/albums/${album.id}/tracks`,
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    );
                    return trackResponse.data.items.map(async (track) => {
                        let previewUrl = track.preview_url || null;

                        // If no Spotify preview, search on YouTube
                        if (!previewUrl) {
                            previewUrl = await getYouTubePreview(track.name, track.artists[0]?.name);
                        }

                        return {
                            name: track.name,
                            id: track.id,
                            image: album.images[0]?.url || "https://via.placeholder.com/150",
                            url: track.external_urls?.spotify || album.external_urls.spotify,
                            preview_url: previewUrl,
                        };
                    });
                });

                const tracksArray = await Promise.all(tracksPromises);
                const resolvedTracks = await Promise.all(tracksArray.flat());

                setSongs(resolvedTracks);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching music:", err.response?.data || err.message);
                setError(err.response?.data?.error?.message || "Failed to load music.");
                setLoading(false);
            }
        };

        fetchMusic();
    }, []);

    // Fetch YouTube preview if Spotify preview is missing
    const getYouTubePreview = async (songName, artistName) => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search`,
                {
                    params: {
                        part: "snippet",
                        q: `${songName} ${artistName} official audio`,
                        key: YOUTUBE_API_KEY,
                        type: "video",
                        maxResults: 1,
                    },
                }
            );

            const videoId = response.data.items[0]?.id?.videoId;
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        } catch (error) {
            console.error("Error fetching YouTube preview:", error);
            return null;
        }
    };

    return (
        <div>
            <h2>Select Music for Your Story</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading ? <p>Loading songs...</p> : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                    {songs.map((song) => (
                        <div key={song.id} style={{ textAlign: "center", padding: "10px", border: "1px solid #ddd" }}>
                            <p>{song.name}</p>
                            <img src={song.image} alt={song.name} width="100" />
                            <a href={song.url} target="_blank" rel="noopener noreferrer">Open on Spotify</a>

                            {song.preview_url ? (
                                song.preview_url.includes("youtube.com") ? (
                                    <iframe width="200" height="100" src={song.preview_url} title="YouTube preview"></iframe>
                                ) : (
                                    <audio controls>
                                        <source src={song.preview_url} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )
                            ) : (
                                <p>No preview available</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SpotifyMusic;
