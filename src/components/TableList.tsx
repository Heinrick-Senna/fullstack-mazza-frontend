import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeleteOrder, useFetchOrders } from "@/hooks/useOrders"
import { IListOrderResponse, IOrder } from "@/lib/Constants";
import { ArrowPathIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";


interface tableListProps {
  setViewRoute: Dispatch<SetStateAction<IOrder | undefined>>,
  fetchOrders: (forceRefresh?: boolean, page?: number) => Promise<void>,
  data: IListOrderResponse | undefined,
}

export function TableList({ setViewRoute, fetchOrders, data }: tableListProps) {
  const [orders, setOrders] = useState<IOrder[] | undefined>([]);
  // const { data, fetchOrders } = useFetchOrders();
  const { deleteOrder } = useDeleteOrder();

  useEffect(() => {
    setOrders(data?.orders)
  }, [data])

  const handleDelete = async (orderId: string) => {
    await deleteOrder(orderId);
    fetchOrders(true);
  };

  const newTableRow = (order: IOrder) => {
    return (
      <TableRow key={order.id}>
        <TableCell className="font-medium">{order.id}</TableCell>
        <TableCell>{order.clientName}</TableCell>
        <TableCell>{order.date}</TableCell>
        <TableCell>{order.initialPoint}</TableCell>
        <TableCell>{order.endPoint}</TableCell>
        <TableCell className="cursor-pointer w-[25px]" align="right" onClick={() => setViewRoute(order)}> <EyeIcon className="mr-2 h-4 w-4" aria-label="Ver" title="Ver" /></TableCell>
        <TableCell className="cursor-pointer w-[25px]" align="right" onClick={() => handleDelete(order.id)}><TrashIcon className="mr-2 h-4 w-4" aria-label="Deletar" title="Deletar" /></TableCell>
      </TableRow>
    )
  }

  return (
    <Table>
      <TableCaption>Lista de Entregas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead className="w-[120px]">Data</TableHead>
          <TableHead>Partida</TableHead>
          <TableHead>Destino</TableHead>
          <TableHead onClick={() => { fetchOrders() }}><ArrowPathIcon className="mr-2 h-4 w-4" /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders && orders.map(newTableRow)}
      </TableBody>
    </Table>
  )
}
