const FINNHUB_WS = "wss://ws.finnhub.io?token=d3clta1r01qmnfgeacegd3clta1r01qmnfgeacf0";

export interface StockPrice {
  price: number;
  timestamp: number;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export class StockWebSocketService {
  private ws: WebSocket | null = null;
  private symbol: string = '';
  private onPriceUpdate: ((prices: number[]) => void) | null = null;
  private onStatusChange: ((status: ConnectionStatus) => void) | null = null;

  connect(
    symbol: string,
    onPriceUpdate: (prices: number[]) => void,
    onStatusChange: (status: ConnectionStatus) => void
  ) {
    this.symbol = symbol;
    this.onPriceUpdate = onPriceUpdate;
    this.onStatusChange = onStatusChange;

    this.ws = new WebSocket(FINNHUB_WS);

    this.onStatusChange('connecting');

    this.ws.onopen = () => {
      this.onStatusChange?.('connected');
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "subscribe", symbol: this.symbol }));
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "trade" && data.data?.length) {
          const newPrices = data.data.map((d: any) => d.p);
          this.onPriceUpdate?.(newPrices);
        }
      } catch (error) {
        // Error handling
      }
    };

    this.ws.onerror = () => {
      this.onStatusChange?.('error');
    };

    this.ws.onclose = () => {
      this.onStatusChange?.('disconnected');
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const stockWebSocketService = new StockWebSocketService();