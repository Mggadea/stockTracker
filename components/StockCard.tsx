import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type StockCardProps = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  currency?: string;
  onPress?: () => void;
};

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  price,
  change,
  currency = "USD",
  onPress,
}) => {
  const isPositive = change >= 0;
  const handleOnPress = () => {
    if (onPress) {
      onPress();
    }
  };
  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.price}>
          {currency} {price.toFixed(2)}
        </Text>
      </View>
      <Text
        style={[
          styles.change,
          {
            color: isPositive ? "#4caf50" : "#f44336",
            fontSize: 26,
            fontWeight: "bold",
            textAlign: "left",
            marginTop: 16,
          },
        ]}
      >
        {isPositive ? "+" : ""}
        {change.toFixed(2)}%
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#294947ff",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginVertical: 8,
    alignSelf: "center",
    width: "100%",
  },
  symbol: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 26,
  },
  name: {
    color: "#fff",
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  change: {
    color: "#fff",
    fontWeight: "500",
    marginTop: 4,
  },
});

export default StockCard;
