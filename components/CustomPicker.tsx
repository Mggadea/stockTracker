// CustomPicker.tsx
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Stock = {
  symbol: string;
  description: string;
};

type Props = {
  data: Stock[];
  selected: Stock | null;
  onSelect: (stock: Stock) => void;
  query: string;
  onQueryChange: (text: string) => void;
};

const CustomPicker: React.FC<Props> = ({
  data,
  selected,
  onSelect,
  query,
  onQueryChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={() => setOpen(!open)}>
        <Text style={{ color: "#ccc" }}>
          {selected ? selected.symbol : "Select stock..."}
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <TextInput
            style={styles.search}
            placeholderTextColor={'#ccc'}
            placeholder="Search stock..."
            value={query}
            onChangeText={onQueryChange}
          />
          <FlatList
            data={data}
            keyExtractor={(item) => item.symbol}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                <Text style={styles.text}>
                  {item.symbol} - {item.description}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#294947ff",
    borderRadius: 6,
  },
  input: {
    padding: 12,
    borderRadius: 6,
  },
  dropdown: {

    marginTop: 5,
    borderRadius: 6,
    maxHeight: 200,
  },
  search: {
    color: "#fff",
    padding: 10,

  },
  item: {
    color: "#fff",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#6a6a6a",
  },
  text:{
    color: "#fff",
    
  }
});
