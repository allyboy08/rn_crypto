import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import CoinList from "../components/Crypto/CoinList";
import { getSearchCoin } from "../util/coins";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getSearchCoin(pageNumber)
    setCoins((existingCoins) => ([...existingCoins, ...coinsData]))
    setLoading(false);
  }

  

  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinList marketCoin={item} />}
      onEndReached={() => fetchCoins((coins.length / 50) + 1)}
      
    />
  );
};

export default HomeScreen;