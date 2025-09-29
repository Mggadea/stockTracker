import StockCard from "@/components/StockCard";
import { useAlertContext } from "@/context/AlertContext";
import { finnhubApi } from "@/services/finnhubApi";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StockWithPrice = {
  symbol: string;
  currentPrice: number;
  change: number; 
};

const WatchListScreen = () => {
  const router = useRouter();
  const { alerts } = useAlertContext();
  const [stocks, setStocks] = useState<StockWithPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          alerts.map(async (alert) => {
            const quote = await finnhubApi.getQuote(alert.stock);
            return {
              symbol: alert.stock,
              currentPrice: quote.c, 
              change: quote.dp, 
            };
          })
        );
        setStocks(results);
      } catch (error) {
        console.error("Error fetching stock quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (alerts.length > 0) {
      fetchQuotes();
    } else {
      setStocks([]);
      setLoading(false);
    }
  }, [alerts]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>WatchList</Text>
      {stocks.length === 0 ? (
        <Text>No Alerts</Text>
      ) : (
        <FlatList
          data={stocks}
          keyExtractor={(item) => item.symbol}
          renderItem={({ item }) => (
            <StockCard
              symbol={item.symbol}
              onPress={() => router.push(`/graph/${item.symbol}`)}
              price={item.currentPrice}
              change={item.change}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default WatchListScreen;

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#142423",
  },
  screenTitle: {
    fontSize: 30,
    color: "#fff",
  },
};
