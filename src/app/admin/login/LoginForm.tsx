"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { loginAction, type LoginState } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-[13px] font-semibold text-brown">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="username" required defaultValue={state.email} className="input" />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-[13px] font-semibold text-brown">Senha</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus={Boolean(state.error)} className="input" />
      </div>
      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-dark w-full">
        {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
        Entrar
      </button>
    </form>
  );
}
