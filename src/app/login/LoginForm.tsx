"use client"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNotificationContext } from "@/contexts/notificationContext";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface LoginInputs {
  email: string;
  password: string;
}

export default function LoginForm({ toggleState }: { toggleState: VoidFunction }) {
  const { setNotificationState } = useNotificationContext();
  const [logged, setLogged] = useState<boolean>(false);

  const loginUser = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      callbackUrl: 'http://localhost:3000/dashboard',
      username: data.current.email,
      password: data.current.password
    })

    if (!res || res?.status != 200) {
      if (res?.error == 'CredentialsSignin') res.error = 'Usuário ou senha inválidos';

      setNotificationState({
        error: true,
        notificationDescription: res?.error || 'Erro desconhecido tente novamente!'
      });
      return;
    }

    setLogged(true);
  }

  useEffect(() => {
    if (logged) redirect('/dashboard');
  }, [logged])

  const data = useRef<LoginInputs>({
    email: '',
    password: ''
  })

  return (
    <>
      <div className="w-full">
        <label htmlFor="email">E-mail</label>
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          aria-label="E-mail"
          onChange={(e) => data.current.email = e.target.value}
        />
      </div>

      <div className="w-full">
        <label htmlFor="password">Senha</label>
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          aria-label="Senha"
          onChange={(e) => data.current.password = e.target.value}
        />
      </div>

      <div className="w-full flex justify-end gap-2">
        <Button variant={"link"} onClick={toggleState}>
          Não tem um cadastro?
        </Button>
        <Button
          variant={"outline"}
          className="w-min"
          onClick={loginUser}
        >Login</Button>
      </div>
    </>
  )
}