import {StyleSheet, View, Image, Text, Pressable} from 'react-native';
import Item from './Item';
import {useNavigation} from '@react-navigation/native'

function CoinList({marketCoin}) {
    const {
        id,
        name,
        current_price,
        market_cap_rank,
        price_change_percentage_24h,
        symbol,
        market_cap,
        image,
      } = marketCoin;
    
      const navigation = useNavigation();
    
      const percentageColor =
        price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || 'white';
    
      
    
      return (
        <Pressable
        style={styles.containerItem}
          onPress={() => navigation.navigate("Coin", {coinId: id})}
        >
          <Image
            source={{ uri: image }}
            style={{
              height: 30,
              width: 30,
              marginRight: 10,
              alignSelf: "center",
            }}
          />
          <View>
          <Text style={styles.text}>{name}</Text>

            <View style={{ flexDirection: "row" }}>
            <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
            </View>
            <Text style={styles.textSymbol}>{symbol}</Text>
            </View>
            </View>
            

            <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
            <Text style={styles.textPrice}>R{current_price}</Text>
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
        </Pressable>
      );
}

const styles = StyleSheet.create({
    containerItem: {
      flexDirection: "row",
      margin: 14,
      alignItems: 'center',
      backgroundColor: "#121212",
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

export default CoinList;