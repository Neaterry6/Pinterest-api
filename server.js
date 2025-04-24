const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public")); // Serve frontend UI

app.get("/api/pinterest/search/:query", async (req, res) => {
    const searchQuery = req.params.query;
    const pinterestURL = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(searchQuery)}`;

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(pinterestURL, { waitUntil: "networkidle2" });

        const images = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("img")).map(img => img.src);
        });

        await browser.close();
        res.json({ searchQuery, images });
    } catch (error) {
        console.error("Pinterest scraping error:", error);
        res.status(500).json({ error: "Failed to fetch images from Pinterest." });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Pinterest API running at http://localhost:${PORT}`))
