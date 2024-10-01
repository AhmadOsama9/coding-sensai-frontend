import axios from "axios";


const API_BASE_URL = "http://localhost:4000/api";

export const processPayment = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/payment`);
        
    } catch (error) {
        throw new Error(`Failed to process payment: ${error.message}`);
    }
}