import CustomHeader from "@/components/customHeader";
import getStatusInfo from "@/helpers/getStatusInfo";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useStockPrice } from "../hooks/useStockPrice";

const GraphScreen = () => {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const { prices, connectionStatus, currentPrice } = useStockPrice(symbol);

  const statusInfo = getStatusInfo(connectionStatus);

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.symbolText}>{symbol}</Text>
          <View style={styles.statusRow}>
            <View
              style={[styles.statusDot, { backgroundColor: statusInfo.color }]}
            />
            <Text style={styles.statusText}>{statusInfo.text}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          {currentPrice && (
            <Text style={styles.priceText}>${currentPrice.toFixed(2)}</Text>
          )}
        </View>
      </View>

      {prices.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Waiting for live data...</Text>
        </View>
      ) : (
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: prices.map((_, i) => ""),
              datasets: [{ data: prices }],
            }}
            width={Dimensions.get("window").width - 32}
            height={300}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#142423",
              backgroundGradientFrom: "#142423",
              backgroundGradientTo: "#0f1a1a",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              labelColor: () => "#fff",
              propsForDots: {
                r: "2",
                strokeWidth: "1",
                stroke: "#1aff92",
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,

    backgroundColor: "#142423",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  symbolText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: "#aaa",
    fontSize: 14,
  },
  priceText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1aff92",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#aaa",
    fontSize: 16,
  },
  chartContainer: {
    flex: 1,
  },
  dataInfo: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 12,
  },
  chart: {
    borderRadius: 16,
  },
};

export default GraphScreen;
