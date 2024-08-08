"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNotificationContext } from "@/contexts/notificationContext";
import { Backend_URL } from "@/lib/Constants";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export default function SignupForm({ toggleState }: { toggleState: VoidFunction }) {
  const { setNotificationState } = useNotificationContext();

  const registerNewUser = async () => {
    const res = await fetch(Backend_URL + '/auth/register', {
      method: 'POST',
      body: JSON.stringify({ ...data.current }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const response = await res.json();

    if (!res.ok) {
      setNotificationState({
        error: true,
        notificationDescription: `${response.message}, ${response.statusCode}`
      });
      return;
    }

    signIn('credentials', {
      callbackUrl: 'http://localhost:3000/dashboard',
      username: data.current.email,
      password: data.current.password
    })
  }

  const data = useRef<FormInputs>({
    name: '',
    password: '',
    email: ''
  })

  return (
    <>
      <div className="w-full">
        <label htmlFor="name">Seu nome</label>
        <Input
          autoComplete="off"
          name="name"
          type="text"
          placeholder="Seu melhor nome 🤔"
          aria-label="Nome Completo"
          onChange={(e) => data.current.name = e.target.value}
        />
      </div>

      <div className="w-full">
        <label htmlFor="email">E-mail</label>
        <Input
          name="email"
          type="email"
          placeholder="Seu melhor email!"
          aria-label="E-mail"
          onChange={(e) => data.current.email = e.target.value}
        />
      </div>

      <div className="w-full">
        <label htmlFor="password">Senha</label>
        <Input
          name="password"
          type="password"
          placeholder="Uma senha forte"
          aria-label="Senha"
          onChange={(e) => data.current.password = e.target.value}
        />
      </div>

      <div className="w-full flex justify-end gap-2">
        <Button variant={"link"} onClick={toggleState}>
          Já é cadastrado?
        </Button>
        <Button
          variant={"outline"}
          className="w-min"
          onClick={registerNewUser}
        >Register</Button>
      </div >
    </>
  )
}