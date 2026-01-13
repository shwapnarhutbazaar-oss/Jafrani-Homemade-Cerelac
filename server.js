const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // ওয়েবসাইট থেকে ডেটা আসার অনুমতি দিতে

// ১. সার্ভার চেক করার রুট
app.get('/status', (req, res) => {
    res.json({ 
        success: true, 
        message: "হ্যাঁ! সার্ভারটি ডেটা নেওয়ার জন্য একদম তৈরি।" 
    });
});

// ২. ফেসবুকে ডেটা পাঠানোর রুট
app.post('/post-to-fb', async (req, res) => {
    const { message } = req.body;
    const PAGE_ID = process.env.FB_PAGE_ID;
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

    if (!message) {
        return res.status(400).json({ error: "মেসেজ পাওয়া যায়নি!" });
    }

    try {
        const url = `https://graph.facebook.com/${PAGE_ID}/feed`;
        const response = await axios.post(url, {
            message: message,
            access_token: ACCESS_TOKEN
        });
        res.status(200).json({ success: true, fb_id: response.data.id });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.response ? error.response.data : error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
