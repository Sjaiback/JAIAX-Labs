# Experiencia interactiva y SEO

## Lo implementado

- Pieza orbital en “Nosotros” con dibujo SVG al entrar en pantalla y tres enfoques seleccionables: Estrategia, Diseño y Código. Soporta clic, flechas, Home y End.
- Luz contextual y movimiento suave de tarjetas en dispositivos con puntero preciso. Botones con respuesta magnética y un pulso al hacer clic.
- Barra de progreso de página y de lectura, índice activo de artículos y botón para volver al inicio.
- Blog `/blog` con tres guías originales, búsqueda tolerante a tildes, categorías, estados vacíos y enlaces relacionados.
- Artículos renderizados en el servidor con autor editorial JAIAX Labs, fecha, lectura estimada calculada a partir del texto, índice y fuentes cuando corresponde.
- Tres páginas de servicio: desarrollo web en Perú, automatización con n8n y Python e integraciones de IA.
- Enlaces internos entre home, artículos, servicios y cotizador.

No se añadieron dependencias para esta ampliación. Se utilizan Anime.js v4 y Motion, ya presentes, CSS y SVG. No hay scroll secuestrado, cursor personalizado, vídeo de fondo ni seguimiento publicitario nuevo.

## Movimiento y accesibilidad

Las respuestas al puntero usan un listener delegado y un `requestAnimationFrame`, sin renderizar React en cada movimiento. El efecto de perspectiva y magnetismo se limita a dispositivos con hover y puntero preciso. En móvil permanecen la navegación, el foco y los controles táctiles.

La preferencia `prefers-reduced-motion` desactiva esos efectos y completa el dibujo orbital. Se retiran listeners, observadores y scopes al cambiar de ruta o desmontar. Los reveals tienen fallback para movimiento reducido y JavaScript desactivado. El logotipo conserva su propia secuencia de tres segundos y su limpieza independiente.

Los artículos pueden leerse desde el HTML inicial. El cuerpo del artículo no se envía como una gran aplicación cliente: solo se hidratan los controles interactivos y las ilustraciones.

## SEO técnico

1. Títulos descriptivos con marca, descripciones, canónicas y Open Graph/Twitter por página.
2. Tarjeta social PNG propia por artículo, generada con `ImageResponse`.
3. JSON-LD de `Organization`, `WebSite`, `Blog`, `BlogPosting`, `Service` y `BreadcrumbList`, coherente con el contenido visible.
4. Sitemap con páginas, servicios y artículos públicos cuando se habilita la publicación.
5. Los parámetros del cotizador no crean canónicas diferentes: `/contacto?plan=negocio` apunta a `/contacto`.
6. `/logo` lleva `noindex` y `/admin` permanece bloqueado en producción. No se inventaron reseñas, direcciones físicas, logotipos de clientes ni resultados de proyectos.

La estructura sigue la [guía de SEO de Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), la [guía de contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) y la documentación de [datos estructurados de artículos](https://developers.google.com/search/docs/appearance/structured-data/article).

El SEO técnico ayuda a que un buscador comprenda y rastree el contenido. No garantiza el primer lugar, una fecha de indexación ni resultados enriquecidos. Los efectos visuales tampoco son una garantía de posicionamiento.

## Dominio pendiente

El usuario indicó **jaiax.com como dominio previsto**, todavía sin reservar ni confirmar. No se ha utilizado como una propiedad verificada ni se ha publicado el sitio allí.

La configuración por defecto es una vista previa: `NEXT_PUBLIC_INDEXABLE=false`. Devuelve `noindex` en metadatos, bloquea el rastreo en `robots.txt` y sirve un sitemap sin URLs publicables. Esto evita tratar una demo como el sitio definitivo.

Cuando el dominio esté bajo tu control y el sitio esté preparado para publicarse:

```dotenv
# Sustituye por el dominio realmente reservado y conectado al sitio.
NEXT_PUBLIC_SITE_URL=https://tu-dominio-confirmado.com
NEXT_PUBLIC_INDEXABLE=true
# Opcional, solo si eliges verificación mediante metatag:
GOOGLE_SITE_VERIFICATION=tu-token-real
```

Recompila y publica con esas variables. Cambiar únicamente la URL no habilita la indexación: el indicador debe ser `true`, la URL debe ser HTTPS y el host debe ser público. No coloques secretos en variables `NEXT_PUBLIC_`.

Después de publicar:

1. Comprueba HTTPS, rutas, contenido, formularios y dominio preferido; redirige variantes en el proveedor de hosting.
2. Verifica el dominio en Google Search Console mediante el método que corresponda. El token opcional anterior solo prepara la etiqueta; no verifica una propiedad por sí mismo.
3. Revisa `robots.txt`, `sitemap.xml` y las canónicas del sitio publicado.
4. Comprueba los datos estructurados con las herramientas de Google y comunica el sitemap en Search Console.
5. Observa consultas, impresiones, clics y páginas indexadas antes de decidir nuevas mejoras. Search Console todavía no está conectado en esta demo.

## Enfoque editorial inicial

| Necesidad del lector           | Página principal                     | Guía relacionada                                       |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------ |
| Evaluar desarrollo web en Perú | `/servicios/desarrollo-web-peru`     | `/blog/cuanto-cuesta-pagina-web-peru`                  |
| Entender una automatización    | `/servicios/automatizacion-n8n`      | `/blog/automatizacion-n8n-negocios`                    |
| Preparar una presencia visible | `/servicios/desarrollo-web-peru`     | `/blog/seo-para-web-de-servicios`                      |
| Explorar una integración de IA | `/servicios/inteligencia-artificial` | Guía de automatización y contacto para evaluar el caso |

Estos temas responden a las necesidades del negocio definido en el brief; no se presentan como palabras clave con volumen de búsqueda validado. El contenido siguiente debe basarse en preguntas reales, casos autorizados y evidencias propias. No se crearon páginas de ubicaciones ficticias ni artículos masivos para repetir palabras clave.

Para editar artículos usa `src/data/journal.ts`; conserva el título, la descripción, el slug, la fecha real de publicación, las secciones y las fuentes. Cambia una fecha solo cuando corresponda a una publicación o revisión real. Las páginas de servicio se configuran en `src/data/service-pages.ts`.

## Verificación reproducible

Con el servidor local en marcha:

```powershell
npm run seo:check -- http://localhost:3107
```

Comprueba respuestas 200, un H1 por página, canónicas únicas, descripciones, Open Graph, metadatos de vista previa, JSON-LD, tarjetas PNG y 404s de rutas inexistentes. Prueba también la política de publicación contra hosts locales, URLs inválidas y HTTPS.

Para un entorno que ya tenga habilitada la indexación, pasa `--indexable` al final. El script comprueba HTML y respuestas del servidor; no mide posiciones en Google ni sustituye Search Console, Rich Results Test, Lighthouse o una auditoría de accesibilidad en dispositivos físicos.
