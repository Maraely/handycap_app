// src/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const fetchEvents = async () => {
    const res = await axios.get(`${API_URL}/events?populate=*`);
    return res.data.data;
};


