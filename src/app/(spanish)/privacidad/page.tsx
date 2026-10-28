import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacidad y contacto por WhatsApp",
  robots: { index: false, follow: true },
};
export default function Privacy() {
  return (
    <main id="main" className="inner-main container legal">
      <span className="eyebrow">TRANSPARENCIA DESDE EL INICIO</span>
      <h1>Privacidad y uso de datos.</h1>
      <div className="notice">
        Aviso para esta demostración frontend. Antes de habilitar la captación
        real, JAIAX Labs deberá completar la identidad y el contacto del
        responsable, las bases aplicables, los plazos de conservación y los
        mecanismos para ejercer derechos.
      </div>
      <h2>Qué ocurre con tu solicitud</h2>
      <p>
        Los datos del formulario se utilizan para preparar un resumen en la
        memoria de la pestaña. No se envían a un servidor, no se guardan en
        localStorage y se pierden al recargar o cerrar la página.
      </p>
      <h2>Compartir por WhatsApp</h2>
      <p>
        Los botones de contacto abren WhatsApp de JAIAX Labs, +51 924 488 034.
        Si compartes un resumen del formulario, el mensaje incluye los datos que
        ingresaste en el mensaje. Solo se entrega la solicitud cuando tú la
        envías allí. El servicio externo aplica sus propias condiciones y
        política de privacidad. Puedes revisar, editar o cancelar el mensaje
        antes de enviarlo.
      </p>
      <h2>Copiar tu solicitud</h2>
      <p>
        La opción de copiar coloca el texto en el portapapeles del dispositivo.
        Tú decides dónde compartirlo. Evita incluir contraseñas, datos
        financieros u otra información innecesaria para cotizar el proyecto.
      </p>
      <h2>Analítica y publicidad</h2>
      <p>El selector de idioma guarda únicamente tu preferencia en este navegador. La detección automática utiliza los idiomas del navegador, sin geolocalizar tu IP ni solicitar tu ubicación. Puedes cambiar la selección o volver a Automático desde la cabecera.</p>
      <p>
        Esta web no instala píxeles publicitarios ni cookies de analítica. Se
        preparan eventos locales de interacción y lectura de parámetros UTM sin
        enviarlos a terceros ni añadir información personal.
      </p>
    </main>
  );
}
