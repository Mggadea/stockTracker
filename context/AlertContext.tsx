import React, { createContext, useContext, useState } from "react";

export type Alert = {
  stock: string;
  price: number;
};

type AlertContextType = {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (alert: Alert) => {
    setAlerts((prev) => [...prev, alert]);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlertContext must be used inside AlertProvider");
  return context;
};
