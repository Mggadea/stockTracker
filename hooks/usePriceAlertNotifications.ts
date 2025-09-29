import { useAlertContext } from "@/context/AlertContext";
import { finnhubApi } from "@/services/finnhubApi";
import { notificationService } from "@/services/notificationService";
import { useEffect, useRef, useState } from "react";

export const usePriceAlertNotifications = () => {
  const { alerts } = useAlertContext();
  const triggeredAlerts = useRef<{ [key: string]: boolean }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState<{
    symbol: string;
    currentPrice: number;
    alert: number;
  } | null>(null);

  useEffect(() => {
    if (alerts.length === 0) return;

    const checkAlerts = async () => {
      for (const alert of alerts) {
        const quote = await finnhubApi.getQuote(alert.stock);
        if (
          quote.c >= alert.price &&
          !triggeredAlerts.current[`${alert.stock}-${alert.price}`]
        ) {
          await notificationService.showPriceAlert(
            alert.stock,
            quote.c,
            alert.price
          );
          setModalInfo({
            symbol: alert.stock,
            currentPrice: quote.c,
            alert: alert.price,
          });
          setModalVisible(true);
          triggeredAlerts.current[`${alert.stock}-${alert.price}`] = true;
        }
      }
    };

    notificationService.requestPermissions();

    const interval = setInterval(checkAlerts, 5000); 
    return () => clearInterval(interval);
  }, [alerts]);

  const closeModal = () => setModalVisible(false);

  return { modalVisible, modalInfo, closeModal };
};
