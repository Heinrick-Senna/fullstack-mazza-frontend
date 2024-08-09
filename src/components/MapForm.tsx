"use client"

import { ChangeEvent, useRef } from "react";
import { DatePicker } from "./DatePicker"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { OrderInputs } from "@/lib/Constants";
import { useCreateOrder, useFetchOrders } from "@/hooks/useOrders";
import { PlacesAutoCompleteInput } from "./PlacesAutoCompleteInput";

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
        <PlacesAutoCompleteInput
          name="startAddress"
          label='Endereço de partida'
          onAddressSelect={ (value:string) => { data.current.initialPoint = value  } } 
        />
      </div>
      
      <div>
      <PlacesAutoCompleteInput
          name="endAddress"
          label='Endereço de entrega'
          onAddressSelect={ (value:string) => { data.current.endPoint = value  } } 
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