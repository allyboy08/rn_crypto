import {useContext, createContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistContext = createContext()

export const useWatchlist = () => useContext(WatchlistContext);

const WatchlistProvider = ({children}) => {
  const [watchlistCoinIds, setWatchlistCoinIds] = useState([])

  const getWatchlistCoins = async () => {
    try {
      const coinValue = await AsyncStorage.getItem("@watch_coin")
      setWatchlistCoinIds(coinValue != null ? JSON.parse(coinValue) : []);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getWatchlistCoins()
  }, [])

  const storeWatchlistCoinId = async (coinId) => {
    try {
      const newList = [...watchlistCoinIds, coinId]
      const coinValue = JSON.stringify(newList)
      await AsyncStorage.setItem('@watch_coin', coinValue)
      setWatchlistCoinIds(newList)
    } catch (e) {
      console.log(e)
    }
  }

  const removeWatchlistCoinId = async (coinId) => {
      const newList = watchlistCoinIds.filter((coinIdValue) => coinIdValue !== coinId)
      const coinValue = JSON.stringify(newList)
      await AsyncStorage.setItem('@watch_coin', coinValue)
      setWatchlistCoinIds(newList)
  }

  return (
    <WatchlistContext.Provider value={{watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId}}>
      {children}
    </WatchlistContext.Provider>
  )
}

export default WatchlistProvider;