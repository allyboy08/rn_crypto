import {useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import CoinItem from '../components/Crypto/CoinItem';
// import { getSearchCoin } from '../util/coins';

import {View, Text, StyleSheet, FlatList, TextInput} from "react-native";

function Search () {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

  const loadData = async (pageNumber=1) => {
    if (loading) {
      return;
    }
    setLoading(true)
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false`
    );
    const data = await res.json();
    setCoins((existingCoins) => ([...existingCoins, ...data]));
    setLoading(false)
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      

      <View style={styles.header}>
        <Text style={styles.title}>Crypto Market</Text>
        <Ionicons name="search" size={24} color="white" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search a Coin"
          placeholderTextColor="#858585"
          onChangeText={(text) => text && setSearch(text)}
        />
      </View>

      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.id}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            coin.symbol.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )}
        renderItem={({ item }) => <CoinItem coin={item} />}
        onEndReached={() => loadData((coins.length / 50) + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#121212",
      flex: 1,
      alignItems: "center",
    },
    header: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      marginTop: 5,
      alignItems: 'center',
      paddingBottom: 10,
      // borderBottomWidth: 1,
      // borderBottomColor: 'white'
    },
    title: {
      fontSize: 20,
      color: "#fff",
      marginTop: 10,
    },
    list: {
      width: "100%",
    },
    searchInput: {
      color: "#fff",
      borderBottomColor: "#4657CE",
      borderBottomWidth: 1,
      width: "35%",
      height: 25,
      textAlign: "center",
      fontWeight: "bold",
      marginRight: 18,
      paddingBottom: 6,
      // marginBottom: 2
    },
    icon: {
      marginLeft: 35,
      paddingLeft: 45,
    }
  });

export default Search;