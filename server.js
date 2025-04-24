const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PEXELS_API_KEY = process.env.PEXELS_API_KEY; // Store API key in env file

app.get("/api/pexels", async (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        return res.status(400).json({ error: "Please provide a search query." });
    }

    try {
        const response = await axios.get("https://api.pexels.com/v1/search", {
            params: { query: searchQuery, per_page: 10 },
            headers: { Authorization: PEXELS_API_KEY }
        });

        const images = response.data.photos.map(photo => ({
            url: photo.src.original,
            photographer: photo.photographer
        }));

        res.json({ results: images });
    } catch (error) {
        console.error("API error:", error);
        res.status(500).json({ error: "Failed to fetch images from Pexels." });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Pexels API running at http://localhost:${PORT}`));
