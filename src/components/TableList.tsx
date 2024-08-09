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
        <TableCell className="hidden md:table-cell">{order.initialPoint}</TableCell>
        <TableCell className="hidden md:table-cell">{order.endPoint}</TableCell>
        <TableCell className="cursor-pointer md:w-[25px]" align="right" onClick={() => setViewRoute(order)}> <EyeIcon className="mr-2 h-4 w-4" aria-label="Ver" title="Ver" /></TableCell>
        <TableCell className="cursor-pointer md:w-[25px]" align="right" onClick={() => handleDelete(order.id)}><TrashIcon className="mr-2 h-4 w-4" aria-label="Deletar" title="Deletar" /></TableCell>
      </TableRow>
    )
  }

  return (
    <Table className="md:max-w-auto">
      <TableCaption>Lista de Entregas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-[80px]">ID</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead className="md:w-[120px]">Data</TableHead>
          <TableHead className="hidden md:table-cell">Partida</TableHead>
          <TableHead className="hidden md:table-cell">Destino</TableHead>
          <TableHead onClick={() => { fetchOrders() }}><ArrowPathIcon className="mr-2 h-4 w-4" /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders && orders.map(newTableRow)}
      </TableBody>
    </Table>
  )
}
