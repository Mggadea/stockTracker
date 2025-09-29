import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import { View } from 'react-native';


export const StockChart: React.FC<{ series: { x: string | number; y: number }[] }> = ({ series }) => {
return (
<View style={{ height: 300 }}>
<VictoryChart theme={VictoryTheme.material}>
<VictoryAxis dependentAxis />
<VictoryAxis />
<VictoryLine data={series} interpolation="natural" />
</VictoryChart>
</View>
);
};
```