
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Groq = require('groq-sdk');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Initialize Groq SDK
let groq;
if (process.env.GROQ_API_KEY) {
    groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });
} else {
    console.warn("WARNING: GROQ_API_KEY is missing. Phishing detection will not work.");
}

// Initialize Supabase (Optional for now, but ready)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey) {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
        console.log("Supabase client initialized");
    } catch (e) {
        console.error("Failed to initialize Supabase:", e.message);
    }
} else {
    console.log("Supabase credentials not found, skipping initialization.");
}

// Phishing Detection Endpoint
app.post('/api/detect', async (req, res) => {
    try {
        const { content } = req.body; // Can be URL or text

        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        if (!groq) {
            return res.status(503).json({
                error: 'Service Unavailable',
                message: 'Groq API Key is not configured on the server.'
            });
        }

        const prompt = `
        You are a cybersecurity system.
        Analyze the message below and classify it as: SAFE, SUSPICIOUS, or PHISHING.

        Important rules:
        - Do NOT classify legitimate advertisements, investment promotions, or product announcements as phishing
          unless they ask for passwords, OTPs, credentials, or force users to click suspicious links.
        - Marketing language such as “limited period”, “launch alert”, or “invest now” alone is NOT phishing.
        - Classify as PHISHING only if there is social engineering, impersonation, or credential harvesting.

        Return ONLY valid JSON with:
        {
            "label": "SAFE" | "SUSPICIOUS" | "PHISHING",
            "risk_score": number (0 to 100, where 0 is perfectly safe and 100 is high risk/confirmed phishing),
            "phishing_type": "string" | "None",
            "reasons": "concise expert reasoning"
        }

        Message: "${content}"
        `;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.1,
            response_format: { type: "json_object" }
        });

        // Handle potential parsing errors or text response
        let result;
        try {
            result = JSON.parse(completion.choices[0].message.content);
        } catch (e) {
            console.error("Failed to parse JSON:", completion.choices[0].message.content);
            // Fallback object or error
            result = {
                isPhishing: false,
                confidence: 0,
                reasoning: "Analysis failed to produce valid JSON. Raw: " + completion.choices[0].message.content,
                threatLevel: "Unknown"
            };
        }

        // Save to Supabase
        if (supabase) {
            try {
                const { error } = await supabase.from('detections').insert([
                    {
                        content: content,
                        is_phishing: result.label === 'PHISHING',
                        confidence: result.risk_score,
                        reasoning: result.reasons,
                        threat_level: result.label
                    }
                ]);

                if (error) {
                    console.error('Supabase Insert Error:', error.message);
                } else {
                    console.log('Detection saved to Supabase');
                }
            } catch (err) {
                console.error('Supabase Unexpected Error:', err.message);
            }
        }

        res.json(result);

    } catch (error) {
        console.error('Error detecting phishing:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Image/OCR Analysis Endpoint
app.post('/api/analyze-image', async (req, res) => {
    try {
        const { image } = req.body; // Base64 image data

        if (!image) {
            return res.status(400).json({ error: 'Image data is required' });
        }

        if (!groq) {
            return res.status(503).json({ error: 'Groq API not configured' });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `You are a cybersecurity system. Analyze this image for phishing or scam indicators. Extract text via OCR and examine visual cues.
                            
                            Classification Rules:
                            - Do NOT classify ads/promotions as phishing unless they harvest credentials/OTPs.
                            - Marketing language is NOT phishing.
                            - Classify as PHISHING only if social engineering, impersonation, or harvesting is present.

                            Return ONLY valid JSON with:
                            {
                                "label": "SAFE" | "SUSPICIOUS" | "PHISHING",
                                "risk_score": number (0 to 100, where 0 is perfectly safe and 100 is high risk/confirmed phishing),
                                "phishing_type": "string" | "None",
                                "reasons": "concise visual and textual analysis"
                            }`
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: image // Base64 data:image/jpeg;base64,...
                            }
                        }
                    ]
                }
            ],
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            temperature: 0.1,
            response_format: { type: "json_object" }
        });

        let result;
        try {
            result = JSON.parse(completion.choices[0].message.content);
        } catch (e) {
            console.error("Vision Parse Error:", completion.choices[0].message.content);
            result = {
                label: "SAFE",
                risk_score: 0,
                phishing_type: "None",
                reasons: "Visual analysis failed to produce valid result."
            };
        }

        // Save to Supabase
        if (supabase) {
            try {
                await supabase.from('detections').insert([
                    {
                        content: "[IMAGE ANALYSIS]",
                        is_phishing: result.label === 'PHISHING',
                        confidence: result.risk_score,
                        reasoning: result.reasons,
                        threat_level: result.label
                    }
                ]);
            } catch (err) {
                console.error("Supabase Image Log Error:", err.message);
            }
        }

        res.json(result);

    } catch (error) {
        console.error('Error analyzing image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send('PhishGuard Backend is Running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
