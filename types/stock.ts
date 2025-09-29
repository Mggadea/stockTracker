export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
}

export interface StockAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  isActive: boolean;
  createdAt: Date;
}

export interface WebSocketMessage {
  data: {
    s: string; // symbol
    p: number; // price
    t: number; // timestamp
    v: number; // volume
  }[];
  type: string;
}