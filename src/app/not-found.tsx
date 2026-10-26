import { ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <span className="eyebrow">404 / UN CAMINO POR DESCUBRIR</span>
      <h1>Esta página no está aquí.</h1>
      <p>Volvamos al lugar donde empiezan las ideas.</p>
      <ButtonLink href="/">Volver al inicio</ButtonLink>
    </main>
  );
}
