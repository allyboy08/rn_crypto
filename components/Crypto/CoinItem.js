import React from "react";
import { Text, View, Image, Pressable, StyleSheet, SafeAreaView,ScrollView } from "react-native";
import IconButton from "../ui/IconButton";
import { useWatchlist} from "../../store/watch-context";
import { useNavigation } from "@react-navigation/native";

const CoinItem = ({ coin }) => {
  const {
    id,
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = coin;

  const navigation = useNavigation();


  const {watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId} = useWatchlist()

  const coinIsWatchListed = () => watchlistCoinIds.find((coinIdValue) => coinIdValue === id)


  const handleWatchlistCoin = () => {
    if (coinIsWatchListed()) {
      return removeWatchlistCoinId(id)
    }
    return storeWatchlistCoinId(id)
  };

    return (  
      <SafeAreaView>
      <ScrollView style={styles.line}>
        <Pressable onPress={() => navigation.navigate("Coin", {coinId: id})}>
      <View style={styles.containerItem} >
              <IconButton 
                icon={coinIsWatchListed() ? "star" : "star-outline"} 
                size={24} 
                color={coinIsWatchListed() ? "#FFBF00" : "white"}
                onPress={handleWatchlistCoin}
                />
              <View style={styles.coinName}>
              <Image source={{ uri: image }} style={styles.image} />
              <View style={styles.containerNames}>
                <Text style={styles.text}>{name}</Text>

              <View style={{ flexDirection: "row" }}>
                <View style={styles.rankContainer}>
                <Text style={styles.rank}>{market_cap_rank}</Text>
                </View>
                <Text style={styles.textSymbol}>{symbol}</Text>
              </View>
              </View>
            </View>
            
            <View style={{ marginLeft: "auto", alignItems: "flex-end", paddingBottom: 4 }}>
              <Text style={styles.textPrice}>{current_price}</Text>
              <Text
                style={[
                  styles.pricePercentage,
                  price_change_percentage_24h > 0
                    ? styles.priceUp
                    : styles.priceDown,
                ]}
              >
                {price_change_percentage_24h.toFixed(2)}%
              </Text>
            </View>
      </View>
    </Pressable>
    </ScrollView>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: "row",
    // margin: 14,
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: "#6c6c6c",
    paddingLeft: 10,
    paddingRight: 10,
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 17,
    marginBottom: 17
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 3
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
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#6c6c6c",
  }
});

export default CoinItem;