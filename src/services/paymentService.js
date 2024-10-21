import axios from "axios";


const API_BASE_URL = "https://14gl3r3q1j.execute-api.us-east-1.amazonaws.com/api";

export const processPayment = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/payment`);
        
    } catch (error) {
        throw new Error(`Failed to process payment: ${error.message}`);
    }
}