import axios from 'axios';

const FINNHUB_API_KEY = 'd3clta1r01qmnfgeacegd3clta1r01qmnfgeacf0';
const BASE_URL = 'https://finnhub.io/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    token: FINNHUB_API_KEY,
  },
});

export const finnhubApi = {
  searchStocks: async (query: string) => {
    const response = await api.get('/search', {
      params: { q: query },
    });
    return response.data; 
  },


  getQuote: async (symbol: string) => {
    const response = await api.get('/quote', {
      params: { symbol },
    });
    return response.data;
  },



  getStockSymbols: async (exchange: string = 'US') => {
    const response = await api.get('/stock/symbol', {
      params: { exchange },
    });
    return response.data; 
  },
};
