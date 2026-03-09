import axios from 'axios';

const MOCK_MODE = false;

const API_BASE_URL = '/api';
const LAMBDA_BASE_URL = 'https://1fnk1ml6jf.execute-api.ap-south-1.amazonaws.com'; // Defaulting lambda for the other routes unless specified otherwise

export interface ChatMessage {
    text: string;
    isUser: boolean;
    timestamp: string;
}

export interface AskAIResponse {
    response: string;
    // Add other expected fields from backend here
    [key: string]: any;
}

export const ApiService = {
    /**
     * Send a message to the AI
     */
    postAskAI: async (message: string, language: string = 'en', userId?: string): Promise<AskAIResponse> => {
        if (MOCK_MODE) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        response: "Here are some schemes available for farmers: 1. PM-KISAN - ₹6000/year direct benefit transfer to farmer families. 2. Pradhan Mantri Fasal Bima Yojana - crop insurance covering natural calamities. 3. Kisan Credit Card - low interest credit up to ₹3 lakh for farming needs. 4. PM Krishi Sinchai Yojana - irrigation support scheme. Would you like details on any of these?"
                    });
                }, 1500);
            });
        }

        try {
            const apiResponse = await axios.post(`${API_BASE_URL}/ask-ai`, JSON.stringify({
                prompt: message
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Extract the response text
            let extractedText = '';
            if (typeof apiResponse.data === 'string') {
                try {
                    const parsed = JSON.parse(apiResponse.data);
                    extractedText = parsed.reply || parsed.response || parsed.text || parsed.answer || apiResponse.data;
                } catch {
                    extractedText = apiResponse.data;
                }
            } else if (apiResponse.data && typeof apiResponse.data === 'object') {
                extractedText = apiResponse.data.reply || apiResponse.data.response || apiResponse.data.text || apiResponse.data.answer || JSON.stringify(apiResponse.data);
            }

            return { response: extractedText };
        } catch (error) {
            console.error('Error calling /ask-ai:', error);
            throw error;
        }
    },

    /**
     * Register a new user
     */
    registerUser: async (phone: string, name: string, language: string): Promise<any> => {
        if (MOCK_MODE) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ userId: "USER#mock123", success: true });
                }, 500);
            });
        }

        try {
            const response = await axios.post(`${LAMBDA_BASE_URL}/register`, {
                phone,
                name,
                language
            });
            return response.data;
        } catch (error) {
            console.error('Error calling /register:', error);
            throw error;
        }
    },

    /**
     * Get applications for a user
     */
    getApplications: async (userId: string): Promise<any> => {
        if (MOCK_MODE) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve([
                        { schemeId: "SCHEME_01", schemeName: "PM-KISAN", status: "Approved", date: "2026-02-15" },
                        { schemeId: "SCHEME_02", schemeName: "Fasal Bima Yojana", status: "Pending", date: "2026-03-01" }
                    ]);
                }, 800);
            });
        }

        try {
            const response = await axios.get(`${LAMBDA_BASE_URL}/applications`, {
                params: {
                    userId: `USER#${userId}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching applications:', error);
            throw error;
        }
    }
};
