import CustomPicker from "@/components/CustomPicker";
import { useAlertContext } from "@/context/AlertContext";
import { finnhubApi } from "@/services/finnhubApi";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Stock = {
  symbol: string;
  description: string;
};

const AddAlert = () => {
  const { addAlert } = useAlertContext();
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [price, setPrice] = useState("");
  const [stockQuery, setStockQuery] = useState("");
  const [stockResults, setStockResults] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchStocks = async () => {
      if (!stockQuery) {
        setStockResults([]);
        return;
      }
      try {
        const data = await finnhubApi.searchStocks(stockQuery);
        setStockResults(data.result || []);
      } catch (error) {
        console.log("Error fetching stocks:", error);
      }
    };

    const timeout = setTimeout(fetchStocks, 300);
    return () => clearTimeout(timeout);
  }, [stockQuery]);

  const handleAddAlert = () => {
    if (!selectedStock || !price) return alert("Select stock and enter price");

    addAlert({ stock: selectedStock.symbol, price });
    alert(`Alert added for ${selectedStock.symbol} at $${price}`);

    setSelectedStock(null);
    setPrice("");
    setStockQuery("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.screenTitle}>Add Alert</Text>
        <Text style={styles.screenSubtitle}>
          Complete the fields to add a Stock to watchList
        </Text>
        <CustomPicker
          query={stockQuery}
          onQueryChange={setStockQuery}
          data={stockResults}
          selected={selectedStock}
          onSelect={setSelectedStock}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddAlert}>
        <Text style={styles.buttonText}>Add Alert</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#142423",
    padding: 20,
  },
  input: {
    backgroundColor: "#294947ff",
    color: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#21fa90",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#6a6a6a",
    fontWeight: "bold",
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 16,
    color: "#cccccc",
    marginBottom: 20,
  },
});
