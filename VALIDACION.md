# Validación — 26 de octubre de 2026

## Esfera orbital Three.js

- Sustituida la simulación plana por una escena WebGL con diez círculos de radio común, ejes de giro independientes y ocho partículas con halo sutil. Conserva el núcleo y la paleta dorada.
- Verificado en navegador el estado `webgl`, diez aros, loop activo al entrar en pantalla y pausado fuera de ella; el puntero actualiza la inclinación.
- Revisión a 1280 × 900 y 390 × 844, sin desbordamiento horizontal ni errores de consola. Canvas con tamaño reservado y resolución adaptada a la densidad de pantalla.
- TypeScript aprobado. Importación diferida; fallback SVG si falla WebGL; limpieza de recursos GPU, observadores y escuchadores al desmontar.

## Portfolio 3D por scroll

- Eliminadas las flechas y las pestañas de la galería. Tres capítulos se recorren mediante scroll nativo con sección sticky, progreso visual y enlaces a las demos.
- Anime.js mantiene una timeline pausada; el scroll controla apertura de tapa, traslación en profundidad, rotaciones y escala de cada dispositivo. Sin nuevas dependencias ni interceptar la rueda.
- Comprobados avance Forma → Territorio → Origen y regreso a Forma, con transformaciones 3D y proyecto activo coherentes.
- Revisión a 390 × 844 y 1280 × 900: sin desbordamiento horizontal, CTA visible y una sola escena opaca durante la pausa. Corregido el solapamiento y la opacidad al redimensionar.
- Sin errores de consola en la revisión final. Movimiento reducido y ventanas de poca altura reciben los tres proyectos en flujo normal.

## Rueda orbital libre

- Eliminadas las pestañas Estrategia, Diseño y Código y su descripción asociada.
- Giro continuo de órbitas y núcleo a velocidades distintas; pausa mediante IntersectionObserver y visibilidad de documento.
- Verificados en navegador: cero pestañas orbitales, animación en estado running y transformación 3D que cambia al mover el puntero sobre el SVG.
- TypeScript aprobado. Conserva el dibujo inicial con Anime.js, movimiento reducido y limpieza de escuchadores/observadores.

## Construcción del hero con líneas

- 37 glifos del titular convertidos en rutas SVG de Geist 400; comprobado visualmente el dibujo progresivo y posterior relleno. El título HTML original permanece para semántica y SEO.
- Órbitas, horizonte y marcos de botones comparten la secuencia de Anime.js. Duración observada: 3291 ms.
- Estado final comprobado: se retira la capa de dibujo; título, descripción, oferta y botones quedan visibles. La comprobación de precios y redirección sigue aprobada.
- El componente respeta movimiento reducido y finaliza al recibir foco o al redimensionar. Revierte la instancia, retira escuchadores y elimina la capa SVG al desmontar.
- Compilación de producción y TypeScript aprobados. SEO verificado en trece páginas en producción; el H1 y los metadatos permanecen en el HTML inicial.
- Vista a 390 px comprobada sin desbordamiento; el redimensionado conserva el estado completo y elimina la capa de dibujo.

## Galería de páginas de ejemplo

- Nueva sección en portada y Proyectos con laptop y dos móviles, tres conceptos y enlaces a demos navegables.
- Compilación aprobada: 26 páginas generadas, incluidas Forma, Territorio y Origen. TypeScript aprobado después del ajuste responsive.
- Verificados clic y flecha derecha para cambiar ejemplo; el enlace de demo cambia con la selección. Apertura de Origen y regreso a la galería comprobados.
- Revisión visual a 1440 px y 390 px; sin desbordamiento horizontal. Sin errores de consola durante la prueba.
- SEO aprobado en trece páginas y 404 de una demo inexistente; comprobación de precios y redirección aprobada.
- Se reutilizan ilustraciones originales como SVG sin textos incrustados; el contenido de las pantallas es HTML compartido con las demos. Sin nuevas dependencias.
- El servidor de desarrollo permanece activo en 127.0.0.1:3107 por solicitud del usuario.

## Actualización de planes

- Básica US$ 70, Profesional US$ 120, Negocio US$ 300 y Avanzada a medida, con fuente única en `src/data/pricing.ts`.
- Lint, TypeScript y compilación de producción aprobados (23 páginas generadas).
- `pricing:check` aprobado: cuatro tarjetas y enlaces al cotizador; redirección 308 de la oferta anterior que conserva UTM y parámetros repetidos.
- `seo:check` aprobado en producción en diez páginas, tres imágenes sociales PNG y comprobaciones de 404 e indexación.
- Verificados en navegador el plan Negocio con US$ 300 preseleccionado y el cambio a Profesional que actualiza el presupuesto a US$ 120.
- Cuatro columnas en escritorio, dos a 768 px y una a 390/360 px, sin desbordamiento horizontal.
- Primer intento de SEO en desarrollo encontró un error transitorio de caché de Next; la compilación y la prueba completa en producción finalizaron sin ese error.

## Comandos

- `npm run lint`: sin errores ni advertencias.
- `npm run typecheck`: sin errores.
- `npm run build`: compilación de producción completada.
- Instalación: auditoría npm sin vulnerabilidades reportadas al instalar.

## Comprobaciones de navegador

- Home revisada visualmente en escritorio y móvil.
- Anchos de home: 1440, 1024, 768, 390 y 360 px; sin desbordamiento horizontal del documento.
- Contacto, landing comercial, detalle de proyecto y administración: 1440, 768, 390 y 360 px; sin desbordamiento horizontal del documento.
- Menú móvil: apertura, enlace a precios y cierre al navegar.
- Plan Business: cotizador preselecciona plan, tipo de proyecto y presupuesto.
- Formulario vacío: mensajes de nombre, email, teléfono, descripción, plazo y consentimiento.
- Formulario válido con datos ficticios: resumen visible y aviso de que no se envió ni almacenó.
- WhatsApp sin número: botón deshabilitado con explicación.
- Administración: creación de borrador, búsqueda, edición, previsualización y eliminación de registro ficticio; datos restablecidos al terminar.
- Administración: se bloquea marcar como publicado un proyecto sin confirmar autorización.

## Respuestas de producción

| Ruta                     | Estado |
| ------------------------ | ------ |
| `/`                      | 200    |
| `/contacto?plan=starter` | 200    |
| `/web-desde-100`         | 200    |
| `/proyectos`             | 200    |
| `/proyectos/territorio`  | 200    |
| `/proyectos/pendiente-0` | 404    |
| `/privacidad`            | 200    |
| `/robots.txt`            | 200    |
| `/sitemap.xml`           | 200    |
| `/opengraph-image`       | 200    |
| `/admin`                 | 404    |

## Límites de la verificación

No se verificó la composición global de la web contra una captura de referencia porque no se recibió en el primer encargo. El PNG del logotipo recibido después sí se trazó y comparó: consulta `LOGO.md`. No se ejecutaron envíos reales ni se conectaron backend, analítica, píxeles, base de datos o autenticación. La revisión responsive y funcional se realizó en el navegador integrado; no sustituye una matriz de pruebas en dispositivos físicos o un examen formal de accesibilidad. No se midió un puntaje Lighthouse.

## Ampliación: logotipo animado

- Anime.js 4.5.0 instalado; SVG independiente sin fuentes, máscaras ni PNG.
- Lint, TypeScript y build completados tras incorporar el componente.
- Se observó progreso de `draw` al iniciar y permanencia del estado final al completar.
- Duración observada de una reproducción: 3077 ms; otras repeticiones alrededor de 3050 ms.
- Callback único por reproducción; cambiar el callback o el tamaño no reinicia el efecto.
- Al desmontar durante una reproducción, el contador de finalizaciones no se incrementa después.
- Autoplay desactivado y movimiento reducido forzado muestran el logo completo.
- Intro: cierre automático, Escape, omisión y restauración de foco comprobados.
- Dos instancias con IDs diferentes para degradados y filtros.
- Dimensiones reservadas del logo antes y durante el dibujo: 400 × 305,04 px.
- Hero y página `/logo` a 1440, 1024, 768, 390 y 360 px sin desbordamiento horizontal.
- Consola del navegador sin errores ni advertencias durante la revisión del componente.

## Ampliación: experiencia y blog

- Lint, TypeScript y build completados sin errores; 22 páginas generadas en la compilación.
- `npm run seo:check -- http://localhost:3107` aprobado en diez páginas: un H1, descripción, canónica única, Open Graph, autor editorial y datos estructurados coherentes.
- Comprobadas las tres imágenes sociales PNG, los 404 de artículos/servicios inexistentes y las políticas de indexación en vista previa.
- Búsqueda del blog, filtro por tema, estado sin coincidencias y restablecimiento comprobados.
- Índice de artículo: navegación a la sección y estado activo comprobados. La barra reflejó progreso de lectura durante la prueba.
- Órbitas: cambio de enfoque por clic y flecha derecha comprobados; cambia tanto el dibujo como el texto asociado.
- Tarjeta de precios: respuesta real al puntero comprobada mediante variables de posición e iluminación y transformación CSS activa.
- FAQ de servicio abierto con Enter; cotizador recibe “Automatización inteligente” preseleccionado al seguir su CTA.
- Home, blog, artículo, servicio y contacto revisados a 1440, 1024, 768, 390 y 360 px; sin desbordamiento horizontal en las 25 combinaciones.
- No se añadieron dependencias. No se midió un puntaje Lighthouse ni posiciones reales en buscadores. No se verificó ni publicó un dominio porque todavía no hay uno confirmado.

## Demos NODO, SOMA y UMBRAL — 26/10/2026

- Build de producción y TypeScript completados; las tres nuevas rutas generadas correctamente.
- SEO y precios: scripts aprobados contra el servidor de producción local.
- NODO: búsqueda, seguimiento, resolución de incidencia y creación de envío comprobados en navegador.
- SOMA: apertura de producto y adición a la bolsa comprobadas.
- UMBRAL: lectura de artículo y ajuste del tamaño del texto comprobados.
- Las tres demos comprobadas a 390 px sin desbordamiento horizontal; capturas de escritorio y móvil incorporadas al portafolio.
- Datos simulados en memoria; sin cobros, suscripciones ni seguimiento real.


## Publicación estática en GitHub Pages — 27/10/2026

- Panel /admin y componente administrativo eliminados. La ruta devuelve 404 y no se exporta.
- Exportación Next.js completada sin servidor; 26 archivos HTML y 858 referencias locales verificados con el prefijo /JAIAX-Labs.
- SEO, tarjetas sociales PNG y precios comprobados sobre los archivos exportados.
- Contacto con plan=negocio preselecciona Negocio y US$ 300 tras hidratar en el navegador.
- Redirección estática de web-desde-100 conserva utm_campaign y valores repetidos tag=a&tag=b.
- Workflow Pages compila en Node 22, valida referencias y publica desde main.
- Repositorio hecho público con autorización expresa del propietario.


## WhatsApp y SEO comercial — 28/10/2026

- Número público +51 924 488 034 conectado a planes y CTA comerciales, con borradores de mensaje según plan/precio o servicio.
- Exportación completa y TypeScript correctos: 27 HTML y 785 referencias internas verificadas.
- Comprobados los cuatro enlaces WhatsApp, el destinatario y los mensajes de Básica, Profesional, Negocio y Avanzada.
- Indexación habilitada en Pages para páginas comerciales; demos navegables mantienen noindex y se excluyen del sitemap.
- Añadida página de tiendas online en Perú, títulos/descripciones comerciales, canónicas con barra final y contacto estructurado de la organización.
- SEO, sitemap, robots, tarjetas sociales PNG y precios comprobados en la exportación local.
- Search Console queda pendiente de verificación por el propietario; habilitar indexación no acredita posiciones ni inclusión actual en Google.


## Idiomas estáticos — 28/10/2026

- Portadas ES/EN/DE/IT y doce páginas internacionales de servicio exportadas; 43 HTML y 1291 referencias locales correctas.
- Detección por preferencias del navegador, persistencia manual, modo Automático, bloqueo de almacenamiento, fallback y conservación de query/hash comprobados.
- Verificados lang SSR, hreflang recíproco, x-default, metadatos, canónicas y 16 mensajes de plan traducidos con el destinatario correcto.
- Selector probado en navegador: inglés a alemán; retorno por la raíz conserva alemán; servicio alemán a italiano mantiene la ruta; italiano a español vuelve al servicio original; Automático vuelve a la preferencia del navegador.
- ES/EN/DE/IT comprobados a 390 px sin desbordamiento. Escritorio inglés a 1440 px sin desbordamiento ni errores de consola.
- Ajustadas tarjetas y altura del hero para el texto alemán; se conservan el dibujo del logo y las interacciones.
- Demos, artículos y páginas originales auxiliares conservan español, indicado en los enlaces internacionales. No se usa geolocalización IP ni servicios de traducción externos.


## Dominio propio jaiax.com — 28/10/2026

- Contacto registrante existente en Cloudflare comprobado a nombre del propietario; no se modificaron datos personales.
- Propiedad verificada en GitHub mediante TXT, conservado en DNS.
- Dominio personalizado guardado en Pages. Cuatro A oficiales para el apex y CNAME www a sjaiback.github.io, todos DNS only.
- Exportación sin basePath y con canónicas, idiomas, imágenes sociales y sitemap en https://jaiax.com.
- Build, 43 HTML, 1291 referencias locales, idiomas, mensajes WhatsApp, SEO y precios aprobados en la vista previa de archivos estáticos.


## 2026-10-28 — Portada por intención y móvil
- Portada breve: tres accesos separados a web, ecommerce y sistemas/ERP; demos directas y contacto.
- Planes, estudio y sistemas en páginas independientes ES/EN/DE/IT, incluidas en sitemap y hreflang.
- Eliminada la duplicación de proyectos/demos, servicios, proceso y compromisos en portada. La esfera se conserva en Estudio.
- Navegación de cuatro enlaces; planes conservan US$ 70, 120, 300 y cotización personalizada y WhatsApp por plan.
- Revisión de navegador a 320 px (DE), 390 px (ES) y escritorio 1280 px: sin desbordamiento horizontal; menú móvil y recorrido web → planes comprobados.
- Build estático y TypeScript correctos. SEO, exportación, idiomas y precios correctos. ESLint: sin errores, tres avisos preexistentes en LanguageSelector, RootShell y SiteImage.
- ESLint excluye out/ para revisar fuentes y evitar analizar archivos generados.

## 2026-10-28 — Escaparate visual y referencias recuperadas
- Se recuperan NODO, SOMA y UMBRAL en una composición de laptop y celulares inspirada en la referencia del usuario.
- Un selector accesible muestra web, ecommerce o sistemas/ERP de uno en uno; soporte para flechas, Home y End.
- Imágenes y destinos de servicio/demo cambian juntos. Los conceptos visuales y las demos relacionadas se identifican por separado.
- Entrada con profundidad por scroll, sin sección fijada ni recorrido obligatorio; respeta reduced motion.
- Se eliminan las tarjetas duplicadas de servicios y demos y se acorta la cabecera para dar prioridad a las imágenes.
- Comprobación visual a 390 px, ancho a 320 px y escritorio; imágenes cargadas, un solo panel visible y sin desbordamiento horizontal.
- Build/TypeScript, exportación estática, idiomas, SEO y enlaces de precios/WhatsApp correctos. Lint sin errores (tres avisos previos).

## 2026-10-28 — Menos rótulos y más interacción
- Portada sin eyebrows; eliminados encabezados pequeños redundantes también en planes, estudio y sistemas.
- Selector Inspirar / Vender / Organizar en ES, con equivalentes EN/DE/IT. Ejemplos titulados UMBRAL, SOMA y NODO.
- Indicador del selector con desplazamiento por resorte; transiciones suaves entre ejemplos y respuesta de flechas/botones al hover.
- Profundidad de dispositivos al mover el mouse con retorno amortiguado; touch mantiene su scroll normal.
- Celulares con movimientos de distinta duración, solo en el panel activo y cerca de la pantalla. Reduced motion desactiva movimiento continuo, transiciones y respuesta al mouse.
- Build/TypeScript, exportación, idiomas y precios correctos; lint de los archivos modificados sin avisos ni errores. Teclado y movimiento comprobados en navegador; 320/390 px sin desbordamiento.

## 2026-10-28 — Menú móvil compacto
- Panel flotante con cuatro enlaces, contacto e idioma; se retiran numeración, flechas repetidas y el CTA grande del menú anterior.
- Botón Menú/Cerrar con área táctil de 44 px; filas de 70 px, selección actual discreta, apertura breve y reduced motion.
- Diálogo nativo para aislar el foco y evitar interactuar con el contenido de fondo; cierre por botón, Escape, toque exterior, navegación y cambio a escritorio.
- Desplazamiento del fondo bloqueado solo mientras está abierto y restaurado al cerrar/desmontar; el panel puede desplazarse en horizontal de poca altura.
- Verificado ES a 390 px, DE a 320 px y horizontal 568x320; sin desbordamientos, footer e idioma accesibles. Escape devuelve el foco al disparador; navegación a Precios cierra y libera la página.
- Build/TypeScript, lint de Header/MobileMenu, exportación estática, idiomas, precios/WhatsApp y SEO correctos.
