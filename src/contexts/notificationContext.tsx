"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Notification from '@/components/Notification'

interface INotification {
  error: boolean,
  notificationDescription: string
}

interface INotificationContext {
  notificationState?: INotification;
  setNotificationState: React.Dispatch<React.SetStateAction<INotification | undefined>>;
}

const NotificationContext = createContext<INotificationContext | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  let [notificationState, setNotificationState] = useState<INotification | undefined>(undefined);

  useEffect(() => {
    if (notificationState) {
      const timer = setTimeout(() => {
        setNotificationState(undefined);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [notificationState]);

  return (
    <NotificationContext.Provider value={{ notificationState, setNotificationState }}>
      <Notification />
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("Notification não pode ser usada.");
  }
  return context;
}