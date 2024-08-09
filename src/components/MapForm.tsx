"use client"

import { useRef } from "react";
import { DatePicker } from "./DatePicker"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import PlacesAutoCompleteInput from "./PlacesAutoCompleteInput";
import { OrderInputs } from "@/lib/Constants";
import { useCreateOrder } from "@/hooks/useOrders";
import { useNotificationContext } from "@/contexts/notificationContext";
import { Libraries, useLoadScript } from "@react-google-maps/api";

interface mapFormProps {
  fetchOrders: (forceRefresh?: boolean, page?: number) => Promise<void>,
}

const libraries: Libraries = ["places"];

export default function MapForm({ fetchOrders }: mapFormProps) {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_APIKEY,
    libraries,
  });

  const { registerNewOrder } = useCreateOrder();
  const { setNotificationState } = useNotificationContext();

  const callError = (errorDescription:string) => {
    setNotificationState({
      error: true,
      notificationDescription: errorDescription
    })
  }

  const handleCreateOrder = async () => {
    if (!data.current.clientName) return callError('O nome do cliente não pode ficar em branco.');
    if (!data.current.endPoint) return callError('O endereço do cliente não pode ficar em branco.');
    if (!data.current.initialPoint) return callError('O endereço do remetente não pode ficar em branco.');
    if (!data.current.date) return callError('Você deve escolher uma data');

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

  if (!isLoaded) return <p>Loading....</p>

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
          onAddressSelect={(value: string) => { data.current.initialPoint = value }}
        />
      </div>

      <div>
        <PlacesAutoCompleteInput
          name="endAddress"
          label='Endereço de entrega'
          onAddressSelect={(value: string) => { data.current.endPoint = value }}
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