import { Text, View, Image, Pressable, StyleSheet, SafeAreaView,ScrollView } from "react-native";
import IconButton from "../components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";
import {useWatchlist} from '../store/watch-context/'
import { useNavigation } from "@react-navigation/native";

const CoinDetail = (props) => {
    const { name } = props;
    // const {
    //     id,
    //     name,
    //     current_price,
    //     market_cap_rank,
    //     price_change_percentage_24h,
    //     symbol,
    //     market_cap,
    //     image,
    //   } = coin;
    const navigation = useNavigation();
   
  
    return (
        <View style={styles.containerItem}>
            
            <IconButton
                icon="md-close-sharp"
                size={30}
                color="white"
                onPress={() => navigation.goBack()}
                />
            

            <View style={styles.coinName}>
            <Text style={styles.text}>{name}</Text>
            </View>
            
            
            
           
            
        </View>
    );
};


const styles = StyleSheet.create({
containerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
},
containerButton: {
    marginLeft: 20,
    
},
coinName: {
    flexDirection: "row",
    alignItems: "center",
},
text: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 5,
    fontSize: 17,
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

  export default CoinDetail;