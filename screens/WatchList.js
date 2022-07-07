import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet} from "react-native";
import CoinItem from "../components/Crypto/CoinItem";
import { getCoin } from "../util/coins";
import { useWatchlist } from "../store/watch-context";
import CoinList from "../components/Crypto/CoinList";


function WatchList () {
  const {watchlistCoinIds} = useWatchlist();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchlistCoinIds.join('%2C');

  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchlistedCoinsData = await getCoin(1, transformCoinIds());
    setCoins(watchlistedCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchWatchlistedCoins();
  }, [watchlistCoinIds]);

  if (watchlistCoinIds.length === 0) {
    return (
        <View style={styles.fallbackContainer}>
            <Text style={styles.text}>No coins added yet</Text>
        </View>
    )
}

    return (
      <View style={styles.container}>
      <FlatList 
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CoinItem coin={item} />}
      />
    
      </View>
    );
  };
  
export default WatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  text: {
    color: "white"
  },
  fallbackContainer: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: 'center',
    alignItems: 'center',
  }
});