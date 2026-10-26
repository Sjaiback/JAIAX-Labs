# JAIAX Labs

Repositorio: [Sjaiback/JAIAX-Labs](https://github.com/Sjaiback/JAIAX-Labs) (privado).

Frontend en español para un estudio de desarrollo web, software, IA y automatización. Next.js App Router, React, TypeScript estricto, Tailwind CSS 4, Motion, Anime.js v4, Lucide, React Hook Form y Zod.

## Instalación

Requiere Node.js 20.9 o superior. Se verificó con Node 24.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev -- --port 3107
```

Abre http://localhost:3107. La demo administrativa está en http://localhost:3107/admin **solo durante desarrollo**. El servidor se limita a la interfaz local por defecto.

```powershell
npm run lint
npm run typecheck
npm run build
npm run start -- --port 3108
```

En producción, `/admin` devuelve **404**, incluso aunque se cambien variables de entorno. No existe una contraseña ni una autenticación ficticia. Para habilitar una administración real se deberá implementar autenticación y autorización en el servidor antes de modificar esta protección.

## Configuración

| Variable                      | Uso                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | URL absoluta del sitio para metadatos, sitemap y Open Graph. Configurar el dominio definitivo antes de publicar.                      |
| `NEXT_PUBLIC_INDEXABLE`       | `false` en la demo. Cambiar a `true` y recompilar solo después de conectar y revisar el dominio real con HTTPS.                       |
| `GOOGLE_SITE_VERIFICATION`    | Token opcional de Search Console para verificación mediante etiqueta. No se ha configurado una propiedad real.                        |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número del negocio, solo dígitos y con código de país. Sin este valor el botón de WhatsApp aparece deshabilitado y explica el motivo. |

Las variables `NEXT_PUBLIC_` son públicas y se incorporan a la compilación. Reiniciar el servidor de desarrollo o recompilar después de cambiarlas. No guardar claves privadas en ellas.

## Rutas

| Ruta                                              | Contenido                                                                                                            |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `/`                                               | Hero con esfera CSS/SVG, portafolio, diferenciadores, servicios, nosotros, proceso, precios, compromisos y contacto. |
| `/proyectos`                                      | Galería de conceptos con filtros.                                                                                    |
| `/proyectos/[slug]`                               | Descripción, reto, propuesta, galería, tecnologías y estado de resultados.                                           |
| `/blog`                                           | Blog con búsqueda y filtros por tema.                                                                                |
| `/blog/[slug]`                                    | Guías con índice, progreso de lectura, fuentes y contenidos relacionados.                                            |
| `/servicios/[slug]`                               | Desarrollo web, automatización e integraciones de IA.                                                                |
| `/contacto?plan=basica`                           | Cotizador con plan preseleccionado. Admite `profesional`, `negocio` y `avanzada`.                                    |
| `/web-desde-70`                                   | Landing comercial con formulario corto, alcance, exclusiones, proceso, FAQ y CTA móvil.                              |
| `/privacidad`                                     | Aviso específico de esta demo; requiere completar datos del responsable antes de captar leads reales.                |
| `/admin`                                          | Diez módulos de gestión simulada, solo desarrollo.                                                                   |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | SEO técnico y tarjeta social.                                                                                        |

## Editar contenido

El hero completo se construye con una secuencia de líneas de 3,3 segundos: órbitas, horizonte, letras SVG del titular y marcos de botones. `HeroEntrance.tsx` coordina Anime.js y `createDrawable`; al finalizar entrega la vista al HTML semántico original. Los glifos Geist 400 se generan con `node scripts/export-hero-glyphs.mjs` usando el lector que ya incluye Next, sin dependencias de ejecución adicionales. Movimiento reducido, foco por teclado o redimensionar muestran la versión final; se limpian instancias y capas al desmontar.

La portada (`/#ejemplos`) y Proyectos incluyen una galería interactiva con laptop y móviles. `src/data/examples.ts` define los tres conceptos navegables en `/ejemplos/forma`, `/ejemplos/territorio` y `/ejemplos/origen`. `ExampleSite` comparte la composición entre las vistas de dispositivos y las demos. `ExampleShowcase` gestiona selección por clic, flechas, Home/End y transición con Anime.js; respeta movimiento reducido y limpia las instancias. Las demos tienen enlaces a su colección y al cotizador, sin compras o reservas simuladas.

Los planes actuales son **Básica US$ 70**, **Profesional US$ 120**, **Negocio US$ 300** y **Avanzada a medida**. Los tres primeros tienen un pago único de desarrollo para el alcance publicado. Dominio, hosting, mantenimiento, licencias e impuestos aplicables se detallan por separado. Avanzada se cotiza según requerimientos.

`/web-desde-100` redirige permanentemente (308) a `/web-desde-70`, conservando los parámetros de campaña. Los identificadores antiguos `starter`, `business` y `advanced` se interpretan como `basica`, `negocio` y `avanzada`. El cotizador sincroniza plan y presupuesto. Con el servidor iniciado, ejecutar `npm run pricing:check` y `npm run seo:check` para comprobar enlaces, redirección y SEO.

- `src/data/pricing.ts`: cuatro planes, precios, presupuestos y compatibilidad con enlaces anteriores.
- `src/data/site.ts`: servicios, pasos, proyectos, testimonios y configuración pública.
- `src/data/journal.ts`: artículos y datos editoriales del blog.
- `src/data/service-pages.ts`: alcance y preguntas de las páginas de servicio.
- `src/app/experience.css` y `src/components/motion/`: interacciones y composición editorial.
- `src/app/globals.css`: tokens de color, tipografía Geist, componentes y puntos de adaptación.
- `src/components/home/hero.tsx`: esfera, órbitas, titular y oferta.
- `src/components/home/sections.tsx`: secciones de la home y preguntas frecuentes.
- `public/images/`: ilustraciones SVG originales y editables de los conceptos.
- `src/app/icon.svg`: versión compacta de identidad. El logotipo completo está en `src/components/layout/header.tsx`.

La captura de referencia del diseño global de la web no se recibió en el primer encargo. La dirección artística implementada se basa en la descripción del brief: esfera oscura, halo cálido, órbitas finas, tipografía sobria y acentos dorados. No se utilizaron activos ni textos de NEXUS. El PNG del logotipo recibido posteriormente sí se reconstruyó como SVG y se integró en el hero; consulta [LOGO.md](LOGO.md).

## Logotipo animado

`src/components/brand/AnimatedJaiaxLogo.tsx` reproduce el símbolo y las letras mediante rutas SVG y `svg.createDrawable()` de Anime.js v4 en unos tres segundos. Incluye `size`, `autoplay`, `onComplete` y `reducedMotion`, limpieza de scopes y soporte de preferencias del sistema.

La página `/logo` permite reproducir, cambiar tamaño, probar movimiento reducido, montar/desmontar y abrir la intro opcional. No se incluye en el sitemap y lleva `noindex`. El SVG estático editable está en `public/images/jaiax-logo.svg`.

Ejemplos de integración, cronología, procedencia de la geometría y pruebas en [LOGO.md](LOGO.md).

## Blog, interacciones y publicación SEO

La sección Nosotros incluye una pieza orbital seleccionable, las tarjetas y botones responden al puntero y los artículos incorporan progreso de lectura e índice activo. No se añadieron dependencias para esta ampliación.

El dominio **jaiax.com es solo una opción prevista, todavía sin confirmar**. La vista previa lleva `noindex`, robots bloqueados y sitemap vacío hasta habilitar la publicación. La guía [SEO-Y-EXPERIENCIA.md](SEO-Y-EXPERIENCIA.md) explica cómo configurar el dominio real, revisar el contenido, conectar Search Console y habilitar la indexación. Ninguna configuración garantiza posiciones en Google.

Con el servidor iniciado puedes ejecutar `npm run seo:check -- http://localhost:3107`. Esta comprobación valida metadatos, canónicas, JSON-LD, política de publicación, tarjetas sociales y rutas inexistentes.

### Proyectos y testimonios

Los conceptos Territorio, Forma y Origen son ejemplos creados para esta demostración. Sus tarjetas y páginas indican ese carácter. No atribuyen trabajo comercial ni presentan resultados inventados.

PROMPERÚ, ASCENCIO PERÚ y GERALTIMPORT están preparados como registros pendientes en la demo, junto con dos espacios futuros editables. No aparecen como clientes ni casos públicos. El filtro público exige `status: 'publicado'` y `authorized: true`; estos valores solo deben cambiar después de comprobar participación, contenido y permiso de publicación.

Los testimonios parten de una colección vacía. Solo se renderizan registros `publicado` con `approved: true`. Mientras no existan, la home muestra compromisos de trabajo sin citas falsas.

## Cotizador y futura API

El formulario valida con Zod y React Hook Form. No persiste datos personales en localStorage, cookies ni bases de datos. El resumen vive en la memoria de la pestaña. No hay petición de envío ni mensajes de entrega ficticios.

`src/lib/leads.ts` contiene el esquema, el constructor del mensaje de WhatsApp y `mockLeadGateway`. `src/types/index.ts` define `LeadGateway`, `Repository<T>`, `Lead`, `Project`, `Plan` y `Testimonial` como contratos para la siguiente fase.

Para integrar Supabase, PostgreSQL u otro servicio:

1. Implementar un endpoint de servidor que valide de nuevo con el esquema, aplique límites de uso y gestione consentimiento, errores y persistencia.
2. Implementar `LeadGateway.submit()` contra ese endpoint. Solo devolver `delivered: true` después de confirmar la recepción real.
3. Mantener secretos y credenciales en el servidor. Proteger toda lectura y mutación administrativa con autenticación, permisos y políticas de datos.
4. Completar los datos del responsable de privacidad, conservación y mecanismo de derechos antes de recopilar información real.

El botón de WhatsApp abre una conversación con texto prellenado; el visitante debe enviarlo en WhatsApp. Abrir la conversación no se contabiliza como entrega.

## Demo administrativa

Dashboard, proyectos, servicios, precios, testimonios, solicitudes, contenido, imágenes, configuración y SEO. Se pueden crear, editar, previsualizar, buscar, filtrar y eliminar registros. El Dashboard permite restablecer los datos iniciales. Las imágenes de la demo se seleccionan de los activos locales disponibles; no hay almacenamiento de archivos.

Los cambios se guardan **solo en memoria**, se pierden al recargar y no modifican la configuración del sitio público. Los valores reales del sitio se editan en el código o en `.env.local`. No ingreses datos personales reales en los registros de prueba.

## Eventos preparados

`src/lib/analytics.ts` emite eventos de navegador `jaiax:conversion`: `quote_started`, `quote_prepared`, `whatsapp_opened` y `starter_cta`. Incluyen los UTM presentes en la URL y el identificador de plan cuando corresponde. No envía información personal ni instala píxeles, cookies o SDK de publicidad.

```js
window.addEventListener("jaiax:conversion", (event) => {
  console.log(event.detail); // Solo para comprobar la integración en desarrollo.
});
```

Conectar un proveedor de analítica y el consentimiento aplicable en una fase posterior. Preparar un resumen o abrir WhatsApp no demuestra una venta ni una recepción efectiva del lead.

## Accesibilidad y rendimiento

Navegación semántica, enlace para saltar al contenido, foco visible, menú móvil con Escape y control de foco, formularios etiquetados y errores asociados. El portafolio móvil usa desplazamiento nativo horizontal con tarjetas enfocables. Motion respeta `prefers-reduced-motion`. La esfera y las líneas son CSS/SVG, sin WebGL ni vídeo. Geist se sirve con `next/font`; los recursos vectoriales no requieren descargas de stock.

Revisa `VALIDACION.md` para los controles realizados. No se ha publicado ni conectado ningún backend o cuenta publicitaria.
