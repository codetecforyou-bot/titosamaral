import type { Metadata } from "next";
import Image from "next/image";
import { authConfigured } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";
import logo from "@/assets/images/logo-tsa.png";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  const configured = authConfigured();
  return (
    <div className="grain flex min-h-screen items-center justify-center bg-brown px-5 py-16">
      <div className="w-full max-w-md">
        <Image src={logo} alt="Tito S Amaral Sociedade de Advogados" className="mx-auto h-14 w-auto" priority />
        <div className="mt-10 border border-gold/25 bg-mist p-8 sm:p-10">
          <h1 className="text-4xl text-brown">Painel administrativo</h1>
          <p className="mt-2 text-sm text-muted-dark">Acesso restrito à equipe do escritório.</p>
          {configured ? (
            <LoginForm />
          ) : (
            <p role="alert" className="mt-8 border border-gold/50 bg-gold/10 p-4 text-sm text-brown">
              O acesso ainda não foi configurado. Defina ADMIN_EMAIL, ADMIN_PASSWORD_HASH e AUTH_SECRET nas variáveis de ambiente do
              servidor (veja o README).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
