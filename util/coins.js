// API =`https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=100&page=1&sparkline=false`
import axios from "axios";

export async function getCoin(pageNumber = 1 ,coinIds) {
    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
        );
        return response.data;
      } catch (e) {
        console.log(e);
      }
}

export async function getDetailCoin(coinId, Currency) {
  try {
      const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&ids=${coinId}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
}

export async function getSearchCoin(pageNumber = 1) {
  try {
      const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
}

export async function getDetailedCoin(coinId) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}