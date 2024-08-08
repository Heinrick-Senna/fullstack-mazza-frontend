import { useEffect, useState, useCallback, useRef } from "react";
import { Backend_URL, IListOrderResponse, IOrder, OrderInputs } from "@/lib/Constants";
import { useNotificationContext } from "@/contexts/notificationContext";
import { useSession } from "next-auth/react";

type cacheType = { 
  [key: string]: { data: IListOrderResponse; timestamp: number } 
}

const cacheExpireTime = 30 * 60 * 1000;
const cache:cacheType = {};

const actualPage = 1;

export function useFetchOrders() {
  const { setNotificationState } = useNotificationContext();
  const session = useSession({ required: true });
  const [data, setData] = useState<IListOrderResponse>();

  const fetchOrders = useCallback(async (forceRefresh: boolean = false, page?: number) => {
    if (session.status === 'loading') return;

    const cacheKey = `orders_page_${page}`;
    const now = Date.now();

    const pageNum = page ? page : actualPage;
    
    if (!forceRefresh && cache[cacheKey] && (now - cache[cacheKey].timestamp < cacheExpireTime)) {
      setData(cache[cacheKey].data);
      return;
    }

    try {
      const res = await fetch(`${Backend_URL}/order/list?page=${pageNum}`, {
        method: 'GET',
        headers: {
          "ngrok-skip-browser-warning": "1",
          'Authorization': 'Bearer ' + session.data?.backendTokens.accessToken
        }
      });

      if (!res.ok) {
        setNotificationState({
          error: true,
          notificationDescription: res.statusText
        });
        return;
      }

      const result: IListOrderResponse = await res.json();
      
      setData(result);

      cache[cacheKey] = { data: result, timestamp: now };

    } catch (error) {
      setNotificationState({
        error: true,
        notificationDescription: "Erro ao buscar pedidos"
      });
    }
  }, [session, setNotificationState]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { data, setData, fetchOrders };
}

export function useDeleteOrder() {
  const { setNotificationState } = useNotificationContext();
  const session = useSession({ required: true });

  const deleteOrder = useCallback(async (orderId: string) => {
    if (session.status == 'loading') return;

    try {
      const res = await fetch(`${Backend_URL}/order/delete/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + session.data?.backendTokens.accessToken
        }
      });

      if (!res.ok) {
        setNotificationState({
          error: true,
          notificationDescription: res.statusText
        });
        return;
      }

      setNotificationState({
        error: false,
        notificationDescription: "Pedido deletado com sucesso!"
      });
    } catch (error) {
      setNotificationState({
        error: true,
        notificationDescription: "Erro ao deletar pedido"
      });
    }
  }, [session, setNotificationState]);

  return { deleteOrder };
}

export function useCreateOrder() {
  const { setNotificationState } = useNotificationContext();
  const session = useSession({ required: true });

  const registerNewOrder = useCallback(async (data: OrderInputs) => {
    const res = await fetch(`${Backend_URL}/order/create`, {
      method: 'POST',
      body: JSON.stringify({ ...data }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session.data?.backendTokens.accessToken
      }
    });

    let result = await res.json();

    if (result.statusCode != 201) {
      setNotificationState({
        error: true,
        notificationDescription: result?.message
      });
      return;
    }

    setNotificationState({
      error: false,
      notificationDescription: 'Nova rota de entrega cadastrada com sucesso.'
    });
  }, [session, setNotificationState]);

  return { registerNewOrder }
}