import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IOrder } from "@/lib/Constants"
import { DialogDescription } from "@radix-ui/react-dialog"
import { useState } from "react";

export function RouteView({ viewRoute, close }: { viewRoute: IOrder, close: VoidFunction }) {
  const { id, clientName, initialPoint, endPoint, date } = viewRoute;
  const baseUrl = 'https://www.google.com/maps/embed/v1/directions';

  const url = `${baseUrl}?key=${process.env.NEXT_PUBLIC_GOOGLE_APIKEY}&origin=${encodeURIComponent(initialPoint)}&destination=${encodeURIComponent(endPoint)}`;

  return <Dialog open={true} onOpenChange={close}>
    <DialogContent className="max-w-[720px]">
      <DialogHeader>
        <DialogTitle>Detalhes da entrega</DialogTitle>
        <DialogDescription>
          <div className="w-full flex flex-col gap-5 mt-5">

            <div className="flex gap-10">
              <span><span className="text-muted-foreground">ID:</span> {id}</span>
              <span><span className="text-muted-foreground">Cliente:</span> {clientName}</span>
            </div>

            <div className="flex gap-10">
              <span><span className="text-muted-foreground">Partida:</span> {initialPoint}</span>
              <span><span className="text-muted-foreground">Destino:</span> {endPoint}</span>
            </div>

            <div className="flex gap-10">
              <span><span className="text-muted-foreground">Data da entrega:</span> {date}</span>
            </div>

          </div>
        </DialogDescription>
      </DialogHeader>
      <div>
        <iframe
          className="w-full min-w-[600px] h-auto aspect-video"
          src={url}
          loading="lazy"
        ></iframe>
      </div>
    </DialogContent>
  </Dialog >
}