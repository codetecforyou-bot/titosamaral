import Link from "next/link";

export function NotFoundContent() {
  return (
    <section className="grain flex min-h-[80svh] items-center bg-brown pt-32 text-white">
      <div className="container-site">
        <span className="gold-rule" />
        <h1 className="heading-lg mt-8">Página não encontrada</h1>
        <p className="mt-6 max-w-md text-muted">O endereço pode ter mudado. Volte para a página inicial ou conheça as nossas áreas de atuação.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-gold">Página inicial</Link>
          <Link href="/#areas" className="btn btn-outline-light">Áreas de atuação</Link>
        </div>
      </div>
    </section>
  );
}
