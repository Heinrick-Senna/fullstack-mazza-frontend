"use client"

import { Card } from "@/components/ui/card";
import MapForm from "@/components/MapForm";
import { TableList } from "@/components/TableList";
import { useState } from "react";
import { IOrder } from "@/lib/Constants";
import { RouteView } from "@/components/RouteView";
import { useFetchOrders } from "@/hooks/useOrders";

export default function Page() {
  const { data, fetchOrders } = useFetchOrders();
  const [viewRoute, setViewRoute] = useState<IOrder>();

  const closeViewRoute = () => { setViewRoute(undefined); }

  return (
    <main className="relative overflow-auto grid flex-1 items-start gap-4 p-5 md:gap-8 lg:grid-cols-3 h-[calc(100dvh-4rem)] max-w-full">
      {viewRoute && <RouteView viewRoute={viewRoute} close={closeViewRoute}></RouteView>}
      <Card className="grid col-span-1 gap-8 p-5">
        <MapForm fetchOrders={fetchOrders} />
      </Card>

      <div className="auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <TableList data={data} fetchOrders={fetchOrders} setViewRoute={setViewRoute} />
      </div>
    </main>
  )
}