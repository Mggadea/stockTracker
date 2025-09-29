import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


class NotificationService {
  async requestPermissions() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      return finalStatus === 'granted';
    } else {
      console.log('Must use physical device for notifications');
      return false;
    }
  }

  async showPriceAlert(symbol: string, currentPrice: number | undefined, targetPrice: number | undefined) {
    const safeCurrent = typeof currentPrice === 'number' ? currentPrice : 0;
    const safeTarget = typeof targetPrice === 'number' ? targetPrice : 0;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Price Alert: ${symbol}`,
        body: `${symbol} has reached $${safeCurrent.toFixed(2)} (Target: $${safeTarget.toFixed(2)})`,
        sound: 'default',
      },
      trigger: null, 
    });
  }
}

export const notificationService = new NotificationService();