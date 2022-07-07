import React from "react";
import { Text, View, Image, Pressable, StyleSheet, SafeAreaView,ScrollView } from "react-native";


const Item = ({ coinId, name }) => {
//   const {watchlistCoinIds} = useWatchlist()

//   const coinIsWatchListed = () => watchlistCoinIds.some((coinIdValue) => coinIdValue === coin.id)

    return (  
      <View style={styles.containerItem} key={coinId}>
              <View style={styles.coinName}>
              <View style={styles.containerNames}>
                <Text style={styles.text}>{name}</Text>

              
              </View>
            </View>
      </View>
    )
};

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: "row",
    margin: 14,
    alignItems: 'center'
    
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
    paddingLeft: 10,
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
});

export default Item;