"use client"

import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { NotificationProvider } from "@/contexts/notificationContext";

type loginState = 'login' | 'signup';

export default function LoginCard() {
  const [loginState, setLoginState] = useState<loginState>(window.location.pathname == '/login' ? 'login' : 'signup');

  const toggleState = () => {
    setLoginState(oldState => oldState == 'login' ? 'signup' : 'login');
  }

  return (
    <NotificationProvider>
      <div className="flex items-center justify-center w-full max-w-7xl">
        <Card className="flex flex-col w-2/5 max-w-2/5 p-5 gap-5 animate-in fade-in">
          <h2 className="w-full text-center">
            {
              loginState == 'login'
                ?
                'Fazer Login'
                :
                'Registrar-se'
            }
          </h2>

          {
            loginState == 'login'
              ?
              <LoginForm toggleState={toggleState} />
              :
              <SignupForm toggleState={toggleState} />
          }

        </Card>
      </div>
    </NotificationProvider>
  )
}