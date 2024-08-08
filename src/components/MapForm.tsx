"use client"

import { useRef } from "react";
import { DatePicker } from "./DatePicker"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { OrderInputs } from "@/lib/Constants";
import { useCreateOrder, useFetchOrders } from "@/hooks/useOrders";

interface mapFormProps {
  fetchOrders: (forceRefresh?: boolean, page?: number) => Promise<void>,
}

export default function MapForm({ fetchOrders }: mapFormProps) {
  const { registerNewOrder } = useCreateOrder();

  const handleCreateOrder = async () => {
    await registerNewOrder(data.current);
    setTimeout(() => {
      fetchOrders(true)
    }, 500)
  }

  const data = useRef<OrderInputs>({
    clientName: '',
    initialPoint: '',
    endPoint: '',
    date: ''
  })

  return (
    <>
      <h2 className="font-bold text-xl text-center">Cadastre uma nova entrega</h2>

      <div>
        <label htmlFor="clientName">Nome do cliente</label>
        <Input
          name="clientName"
          type="text"
          placeholder="Carl Jhonson"
          onChange={(e) => data.current.clientName = e.target.value}
        />
      </div>

      <div>
        <label htmlFor="startAddress">Endereço de partida</label>
        <Input
          name="startAddress"
          type="text"
          placeholder="Rua do Limão, 324"
          onChange={(e) => data.current.initialPoint = e.target.value}
        />
      </div>


      <div>
        <label htmlFor="endAddress">Endereço de entrega</label>
        <Input
          name="endAddress"
          type="text"
          placeholder="Grove Street, 230"
          onChange={(e) => data.current.endPoint = e.target.value}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-y-8">
        <div>
          <span>Selecione uma data</span>
          <DatePicker onChange={pickerValue => data.current.date = pickerValue} />

        </div>
        <div className="flex w-full lg:justify-center items-end">
          <Button className="lg:w-full" onClick={handleCreateOrder}>Cadastrar</Button>
        </div>
      </div>


    </>
  )
}