
const axios = require('axios');

const API_URL = 'http://localhost:5001/api/detect';

async function testDetection() {
    try {
        console.log('Testing Phishing Detection Endpoint...');
        const response = await axios.post(API_URL, {
            content: "Urgent: Your account has been compromised. Click here to reset your password: http://phishy-site.com/login"
        });

        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testDetection();
