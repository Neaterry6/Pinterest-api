const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/pinterest", async (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        return res.status(400).json({ error: "Please provide a search query." });
    }

    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();

        await page.goto(`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(searchQuery)}`, {
            waitUntil: "networkidle2",
        });

        const images = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("img")).map(img => img.src);
        });

        await browser.close();
        res.json({ results: images });
    } catch (error) {
        console.error("Scraping error:", error);
        res.status(500).json({ error: "Failed to fetch images." });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Pinterest API running at http://localhost:${PORT}`));
