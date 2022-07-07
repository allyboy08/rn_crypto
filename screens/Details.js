import { StyleSheet, Text, View, ActivityIndicator, Image, TextInput } from 'react-native';
import {useRoute} from '@react-navigation/native'
import {getDetailedCoin, getDetailCoin} from '../util/coins'
import {useState, useEffect, useLayoutEffect} from 'react';
import {useWatchlist} from '../store/watch-context'
import { useNavigation } from "@react-navigation/native";;
import CoinDetail from './Detail';
import { Ionicons } from "@expo/vector-icons";
import IconButton from '../components/ui/IconButton';
import LoadingOverlay from '../components/ui/LoadOverlay';
import FilterComponent from '../components/Crypto/filter';

function Details({route}) {
    const router = useRoute()
    const {params: { coinId }} = router;

    const [coin, setCoin] = useState(null)
    const [currValue, setCurrValue] = useState(null)
    const [loading, setLoading] = useState(false)
    const [Currency, setSelectedCurrency] = useState("usd");
    // const [usdsValue, setUsdsValue] = useState("");
    const [coinValue, setCoinValue] = useState("1");
    const [usdValue, setUsdValue] = useState("");
    const [usdValues, setUsdValues] = useState("");
    const [usdVolume, setUsdVolume] = useState("");
    const [low, setLow] = useState("");
    const [high, setHigh] = useState("");
    

    const fetchCoinData = async () => {
        setLoading(true)
        const fetchedCoinData = await getDetailedCoin(coinId);
        setCoin(fetchedCoinData);
        setUsdValue(fetchedCoinData.market_data.current_price[Currency].toString())
        setUsdValues(fetchedCoinData.market_data.market_cap.usd.toString())
        setUsdVolume(fetchedCoinData.market_data.total_volume.usd.toString())
        setHigh(fetchedCoinData.market_data.ath.usd.toString())
        setLow(fetchedCoinData.market_data.atl.usd.toString())
        // setUsdsValue(fetchedCoinData.market_data.current_price[Currency].toString())
        setLoading(false)
    }

    const fetchCoinCurrency = async (selectedCurrencyValue) => {
      const fetchedCoinCurrency = await getDetailCoin(
        coinId,
        selectedCurrencyValue
      );
      setCurrValue(fetchedCoinCurrency);
      // setUsdValue(fetchedCoinCurrency.current_price)
    };

    

    useEffect(() => {
        fetchCoinData()
        fetchCoinCurrency("usd")
    }, [])

    if (loading || !coin || !currValue ) {
        return <LoadingOverlay message="Loading"  />
    }

   
    

    const {
      id,
      image,
      name,
      symbol,
      low_24h,
      market_data: {
        market_cap_rank,
        current_price,
        price_change_percentage_24h,
        total_volume,
        circulating_supply,
        market_cap,
        ath,
        atl
      },
    } = coin;

    // const { current_price } = currValue;

    const normalizeMarketCap = (marketCap) => {
      if (marketCap > 1e12) {
        return `${(marketCap / 1e12).toFixed(3)} T`;
      }
      if (marketCap > 1e9) {
        return `${(marketCap / 1e9).toFixed(3)} B`;
      }
      if (marketCap > 1e6) {
        return `${(marketCap / 1e6).toFixed(3)} M`;
      }
      if (marketCap > 1e3) {
        return `${(marketCap / 1e3).toFixed(3)} K`;
      }
      return marketCap;
    };


  
    // const formatCurrency = (value) => {
    //   "worklet";
    //   if (value === "") {
    //     return `$${current_price.usd.toFixed(1)}`;
    //   }
    //   return `$${parseFloat(value).toFixed(2)}`;
    // };
  
    // const changeCoinValue = (value) => {
    //   setCoinValue(value);
    //   const floatValue = parseFloat(value.replace(',', '.')) || 0
    //   setUsdValue((floatValue * coinValue).toString())
    // };
  
    // const changeUsdValue = (value) => {
    //   setUsdValue(value);
    //   const floatValue = parseFloat(value.replace(',', '.')) || 0
    //   setCoinValue((floatValue / coinValue).toString())
    // };

    const onSelectedRangeChange = (selectedCurrencyValue) => {
      setSelectedCurrency(selectedCurrencyValue);
      fetchCoinCurrency(selectedCurrencyValue);
    };

  return (
    <View style={styles.rootContainer} key={coin.id}>
      <CoinDetail 
      name={name}
      />
            <View style={styles.filtersContainer}>
              <FilterComponent 
                filterCurrency="usd" 
                filterText="USD" 
                Currency={Currency} 
                setSelectedCurrency={onSelectedRangeChange}
              />
              <FilterComponent 
                filterCurrency="zar" 
                filterText="ZAR" 
                Currency={Currency} 
                setSelectedCurrency={onSelectedRangeChange}
              />
              <FilterComponent 
                filterCurrency="btc" 
                filterText="BTC" 
                Currency={Currency} 
                setSelectedCurrency={onSelectedRangeChange}
              />
              {/* <Text style={styles.text}>{current_price[Currency]}</Text> */}
              {/* <FilterComponent filterCurrency="usd" filterText="USD"/> */}
            </View>

      
      
      <View style={styles.coinName}>
              {/* <Image source={{ uri: image }} style={styles.image} /> */}
              <View style={styles.containerNames}>
                {/* <Text style={styles.text}>current price</Text> */}
                <Text style={styles.text}>Market Cap</Text>
                <Text style={styles.text}>Circulating Supply</Text>
                <Text style={styles.text}>Total Volume</Text>
                <Text style={styles.text}>All Time High</Text>
                <Text style={styles.text}>All Time Low</Text>
              </View>
            
            
            <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
              {/* <Text style={styles.textPrice}>{market_cap[Currency]}</Text> */}
              <Text style={styles.textValue}>{normalizeMarketCap(market_cap[Currency])}</Text>
              <Text style={styles.textValue}>{normalizeMarketCap(circulating_supply)}</Text>
              <Text style={styles.textValue}>{normalizeMarketCap(total_volume[Currency])}</Text>
              <Text style={styles.textValue}>{normalizeMarketCap(ath[Currency])}</Text>
              <Text style={styles.textValue}>{normalizeMarketCap(atl[Currency])}</Text>

              
            </View>
            </View>

            {/* <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>{Currency}</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
            <Text>{current_price[Currency]}</Text> */}
    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // padding: 20,
    paddingTop: 30,
    // marginHorizontal: 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#181818'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  containerNames: {
    marginLeft: 0,
  },
  coinName: {
    flexDirection: "row",
    // paddingLeft: 10,
    fontSize: 20
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  textValue: {
    color: "white",
    fontSize: 20,
    fontWeight:'bold'
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
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    padding: 10,
    fontSize: 16,
    color: 'white'
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2B2B2B',
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10
  },
});