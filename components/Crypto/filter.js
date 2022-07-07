
import { Text, Pressable } from "react-native";

const FilterComponent = (props) => {
  const { filterCurrency, filterText, Currency, setSelectedCurrency} = props;
  const isFilterSelected = (filter) => filter === Currency;
    // console.log("pressed")
  return (
    <Pressable
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: isFilterSelected(filterCurrency) ? "#1e1e1e" : "transparent",
      }}
      onPress={() => setSelectedCurrency(filterCurrency)}
    >
      <Text style={{ color: isFilterSelected(filterCurrency) ? "white" : "grey" }}>{filterText}</Text>
    </Pressable>
  );
};

export default FilterComponent;