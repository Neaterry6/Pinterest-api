const express = require("express");
const puppeteer = require("puppeteer-core");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serves frontend

app.get("/api/pinterest", async (req, res) => {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        return res.status(400).json({ error: "Please provide a search query." });
    }

    try {
        // Launch Puppeteer with auto-downloaded Chromium
        const browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();
        await page.goto(`https://www.pinterest.com/search/pins/?q=${encodeURIComponent(searchQuery)}`, {
            waitUntil: "domcontentloaded",
        });

        await page.waitForSelector("img", { timeout: 5000 }); // Ensures images load

        const images = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("img")).map(img => img.src);
        });

        await browser.close();
        res.json({ results: images });
    } catch (error) {
        console.error("Scraping error:", error);
        res.status(500).json({ error: "Failed to fetch images. Pinterest may be blocking requests." });
    }
});

// Serves the frontend test page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Pinterest API running at http://localhost:${PORT}`));
