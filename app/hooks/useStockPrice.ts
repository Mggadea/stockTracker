import { useEffect, useState } from "react";
import { ConnectionStatus, StockWebSocketService } from '../../services/websocketService';


export const useStockPrice = (symbol: string | undefined) => {
  const [prices, setPrices] = useState<number[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');

  useEffect(() => {
    if (!symbol) return;

    const service = new StockWebSocketService();

    const handlePriceUpdate = (newPrices: number[]) => {
      setPrices(prev => [...prev, ...newPrices].slice(-50));
    };

    const handleStatusChange = (status: ConnectionStatus) => {
      setConnectionStatus(status);
    };

    service.connect(symbol, handlePriceUpdate, handleStatusChange);

    return () => {
      service.disconnect();
    };
  }, [symbol]);

  return {
    prices,
    connectionStatus,
    currentPrice: prices.length > 0 ? prices[prices.length - 1] : null,
  };
};