
### **🔥 `README.md`**
```md
# Pinterest Image Scraper API

## 🚀 Overview
This is a lightweight **Pinterest Image Scraper API** using **Puppeteer**, allowing you to **search and fetch Pinterest images** **without needing an API key**.

## 🔥 Features
✅ **No API key required**  
✅ **Scrapes images directly from Pinterest**  
✅ **Works as an API & web interface**  
✅ **Deployable on Render/Vercel**

---

## 🔧 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/pinterest-api.git
cd pinterest-api
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run the Server**
```sh
npm start
```
The API will run on **`http://localhost:8080`**.

---

## 🚀 API Usage
### **Search for Pinterest Images**
Send a **GET request** to:
```
http://localhost:8080/api/pinterest/search/{query}
```
Example:
```
http://localhost:8080/api/pinterest/search/sunset
```
### **Expected Response**
```json
{
  "searchQuery": "sunset",
  "images": [
    "https://i.pinimg.com/example1.jpg",
    "https://i.pinimg.com/example2.jpg"
  ]
}
```

---

## 🌐 Web UI
This API includes a **simple frontend UI** (`public/index.html`) where users can enter search queries and **view Pinterest images**.

1️⃣ **Start the server**  
2️⃣ Open **`http://localhost:8080/index.html`** in your browser  
3️⃣ Enter a **search term & click "Search"**  
4️⃣ Images will appear **directly in the browser!** 🎨✨

---

## 🛠 Deployment
### **Deploy on Render**
1️⃣ Push your repo to **GitHub**  
2️⃣ Go to **[Render](https://render.com/)**  
3️⃣ Create a **Node.js Web Service**  
4️⃣ Set the start command to **`npm start`**  

### **Deploy on Vercel**
1️⃣ Install Vercel CLI
```sh
npm install -g vercel
```
2️⃣ Deploy
```sh
vercel deploy
```

---

## 📜 License
This project is **MIT Licensed**. Feel free to modify and use it.

---

## 🙌 Contributions
Want to improve this project? Open a **pull request** or reach out!

