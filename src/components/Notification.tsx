"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useNotificationContext } from "@/contexts/notificationContext"
import { CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid"

export default function ErrorNotification() {
  const { notificationState } = useNotificationContext();

  if (!notificationState) return <></>;

  const { error, notificationDescription } = notificationState;

  return (
    <div className="absolute z-50 top-10 right-10 min-w-[20dvw] md:max-w-[20dvw] font-bold">
      <Alert className={error ? 'bg-card' : 'bg-lime-500'} variant={error ? "destructive" : "default"}>
        {error ? <ExclamationTriangleIcon className="h-4 w-4" /> : <CheckBadgeIcon className="h-4 w-4" />}
        <AlertTitle>
          {error ? 'Error' : 'Success'}
        </AlertTitle>
        <AlertDescription>
          {notificationDescription}
        </AlertDescription>
      </Alert>
    </div>
  )
}