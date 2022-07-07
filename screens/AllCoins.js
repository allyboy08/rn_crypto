import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, ScrollView,SafeAreaView, Image} from "react-native";
import IconButton from "../components/ui/IconButton";


function AllCoins() {
  const [coins, setCoins] = useState();

  const loadData = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);




  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
        {coins?.map((coin) => {
          return (
            <View style={styles.containerItem} key={coin.id}>
              <Text>{coin.total_volume}</Text>
            </View>
          )
        })}
      </ScrollView>
      </SafeAreaView>
  );
}

export default AllCoins;

const styles = StyleSheet.create({
  containerItem: {
    // backgroundColor: "#121212",
    // paddingTop: 10,
    flexDirection: "row",
    // justifyContent: "space-between",
    margin: 14,
    alignItems: 'center'
    
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
    paddingLeft: 15,
  },
  text: {
    color: "white",
  },
  textPrice: {
    color: "white",
    fontWeight: "bold",
    
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "#00B589",
  },
  priceDown: {
    color: "#fc4422",
  },
  image: {
    width: 35,
    height: 40,
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  rank: {
    fontWeight: 'bold',
    color: 'white',
  },
  rankContainer: {
    backgroundColor: '#585858',
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});