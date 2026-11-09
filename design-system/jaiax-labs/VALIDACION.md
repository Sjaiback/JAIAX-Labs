GATE: OPEN 20 (rounds used up)

# Validación del rediseño de JAIAX Labs

## Actualización: introducción automática

La reconstrucción se inicia automáticamente en cada carga de la portada, sin sesión persistida ni botón de inicio. Finaliza con una transición y devuelve la web interactiva. Se conservan pausa, velocidad, repetición, Escape y salida; movimiento reducido omite la introducción. Las pruebas de navegador se actualizaron para comprobar arranque sin clic, entrega automática, limpieza, repetición en nuevas visitas y salida anticipada. La auditoría visual histórica que aparece más abajo no se presenta como aprobación de esta actualización.


## Actualización de trazos y scroll

Solicitud posterior del usuario: JAIAX y el asterisco deben ser líneas construidas al cargar, con animaciones y efectos de scroll adicionales. Se usan los seis trazos de letras del logo original y cuatro líneas para el asterisco, SVG sin relleno y animación de trazo de unos 2,7 segundos. Se añaden líneas de avance en secciones, entrada de títulos y desplazamiento acotado dentro de las imágenes; no se controla la rueda ni se oculta contenido. Movimiento reducido mantiene los trazos completos e imágenes quietas.

Validación específica de esta actualización: build/TypeScript sin errores, referencias estáticas e idiomas correctos, lint sin errores y los mismos tres avisos existentes. Las pruebas reales en Edge headless confirman diez trazos sin relleno, construcción completa, respuesta al scroll, profundidad adaptada al dispositivo y preferencia de movimiento. La experiencia de reconstrucción, los planes y la navegación siguen pasando. Se revisaron escritorio y móvil con movimiento reducido.

La auditoría extensa y el GATE OPEN que siguen corresponden al rediseño anterior a esta actualización. No se ha repetido el gate completo ni se afirma haber eliminado sus hallazgos.


Este informe registra la validación local del rediseño en `codex/jaiax-motion-redesign` antes de publicarlo. El despliegue se verifica por separado en GitHub Actions; se conserva el dominio de producción.

## Resultado funcional

- La compilación de producción genera la exportación estática de Next: 57 páginas HTML de entrega. La página temporal de QA se elimina antes de entregar `out/`.
- `check-static.mjs`: referencias locales existentes y ausencia de `/admin`.
- `check-i18n.mjs`: ES/EN/DE/IT, detección de idioma, preferencia, almacenamiento bloqueado, URLs explícitas, hreflang, 16 mensajes de planes y 12 páginas de servicios traducidas.
- `check-pricing.mjs`: cuatro planes y enlaces de WhatsApp con número y mensaje correctos. Se actualizó el detector del test al formato `api.whatsapp.com/send` que ya utiliza la aplicación.
- Comprobación SEO: metadatos, canónicas, datos estructurados, sitemap, tarjetas PNG y páginas 404.
- Build incluye TypeScript y termina sin errores. ESLint termina con cero errores y tres avisos existentes: navegación del selector de idiomas, `<head>` del RootShell y propagación de alt en SiteImage.
- QA real del HTML exportado: apertura del diálogo, copia inerte, foco dentro, tres cursores, pausa, reanudación, velocidad 2×, repetición, limpieza de la copia anterior, fin de reproducción, cancelación, restauración del scroll/foco, reapertura, salida, FAQ y enlaces de planes.
- Se verificó ausencia de desbordamiento horizontal en 1440, 1024, 820, 768, 390 y 320 px. También se comprueban EN/DE/IT en 1440 y 390 px y navegación estática hacia la demo editorial.
- La prueba con movimiento reducido confirma vista final estática y ausencia de cursores móviles.

## Compatibilidad con GitHub Pages

Se conserva `output: export`, `trailingSlash: true`, imágenes sin optimizador de servidor, soporte de `NEXT_PUBLIC_BASE_PATH` y el workflow existente. La animación es local, no tiene endpoints ni servicios externos.

La medición encontró solicitudes de segmentos de precarga de Next que devolvían 404 en un host estático. `SiteLink` usa ahora enlaces HTML nativos y aplica el prefijo de publicación. Así se navega por páginas exportadas completas. La medición posterior muestra **0 solicitudes rotas en 1440 y 390 px**.

Las demos enlazan a rutas canónicas, sin pasar por los alias anteriores: UMBRAL → demo editorial LÚMINA; SOMA → ecommerce ÁUREA; NODO → control logístico PULSO. Se presentan como demos relacionadas, no como una implementación idéntica a la imagen ni como proyectos de clientes.

## Sistema visual y material

Tipo: software / estudio de desarrollo. Paleta de marca: grafito #090b0b, superficie #141817, blanco cálido #f3f1e9, latón #d5b078 y texto secundario #a1aaa6. Funnel Display / Funnel Sans + DM Mono, hero split y momento `word-highlight`. La reconstrucción propia pedida por el usuario es el efecto principal; no se añaden shaders ni contextos WebGL.

Voz: técnica y directa, dirigida a dueños de negocios; explica alcance y oferta. Todos los precios, datos de contacto y conceptos proceden del repositorio. No se inventaron testimonios, clientes, métricas, nombres, direcciones ni fotografías. No hay formularios nuevos ni contactos `.example`; el dominio real existente sigue siendo jaiax.com.

Las imágenes de concepto existentes se conservan. Las tres variantes WebP de la portada suman 322.540 bytes frente a 6.369.254 bytes de los PNG de origen. No hay fotografías de terceros nuevas ni material pendiente de aportar por el cliente. La licencia del momento de Taste Skill se conserva en `public/studio/`.

## Resultado visual de Taste Skill

El validador no está aprobado. Tras tres rondas quedan 20 hallazgos abiertos y 27 avisos. Se corrigieron problemas reales de alineación en móvil, foco, superposición del botón flotante y composición heredada de los planes. Se conserva la dirección editorial solicitada: titulares de cierre grandes, filas técnicas con separadores, preguntas y planes sin fotografías decorativas, pie compacto y crecimiento natural del contenido móvil. Estas decisiones no cumplen todas las reglas de composición de la plantilla.

Quedan además observaciones sobre el alto y margen inferior del cierre (incluido un scrollHeight 18 px mayor que su caja), separación entre FAQ/contacto, escala de nombres/precios y encuadre de secciones. No se afirma que estas revisiones hayan pasado.

El chequeo inicial de composición recorrió 1440×900, 1024×768, 820×1180, 768×1024 y 390×844. La última ronda del gate se ejecutó en 1440 y 390. Después solo se corrigió la navegación estática exigida para Pages y los destinos canónicos de demos; no se inició una cuarta ronda visual. La navegación y la exportación se verifican por separado.

La comprobación de texto da **0 FAIL y 1 WARN**. Se conserva `copy-stat-strip` porque 70 / 120 / 300 son los precios reales de los planes ya publicados en el repositorio. La única cabecera en dos frases se usa en Proceso.

### Excepciones reconocidas

- `phone-number` en `header.header.nav > div.nav-wrap > a.nav-cta`: El número 51924488034 es el contacto real del negocio ya incluido en el repositorio entregado por el usuario. Se conservan sus enlaces comerciales autorizados.
- `copy-headings` en `div.lab-wrap.wrap > div.lab-project-grid > a.lab-project:nth-of-type(1) > h3`: UMBRAL, SOMA y NODO son nombres de conceptos existentes del estudio en el repositorio. Los títulos y categorías están en español; el detector de sustantivos no reconoce varios términos del idioma.
- `container-edges` en `a.skip-link`: El enlace para saltar al contenido es el primer control del documento por accesibilidad. Es HTML válido fuera del header y solo aparece al recibir foco; no altera la alineación del contenido.
- `container-edges` en `div.reading-progress`: Indicador decorativo global de progreso existente, fijo y sin contenido textual. Es válido fuera de main y no representa una columna ni una sección de contenido.

### Hallazgos completos de la última ronda

```text
gate: checking out/es/index.html (software); this takes a few minutes on a CPU Chrome
gate: rounds used up; 20 FAIL open
  FAIL no-visual        section#servicios "Tecnología para tu siguiente paso."  [1440, 390]
       no picture, effect or mock in this section; a feature section needs a visual
       fix: give the section a visual: a UI fragment on a ground, real icons, or a photograph that fits
  FAIL text-only        section#precios "Planes con alcance y precio claros."  [1440, 390]
       the section is only text: no picture, icon, mock or effect in it (3 sections like it at this width)
       fix: give the section a visual: a photograph that fits, the real icons, or a UI fragment on a ground
  FAIL text-only        section#preguntas "Antes de construir tu web."  [1440, 390]
       the section is only text: no picture, icon, mock or effect in it (3 sections like it at this width)
       fix: give the section a visual: a photograph that fits, the real icons, or a UI fragment on a ground
  FAIL text-only        section#contacto "Hablemos de tu próxima web."  [1440, 390]
       the closing section is only text: no picture, icon, mock or effect in it (3 sections like it at this width)
       fix: give the section a visual: a photograph that fits, the real icons, or a UI fragment on a ground
  FAIL heading-scale    h2#lab-contact-title "Hablemos de tu próxima web."  [1440, 390]
       an h2 at 108px, as large as the h1 (61.2px) or larger
       fix: size headings by level: the h1 largest, one size per level, each level below the one above
  FAIL section-gaps     section#preguntas / section#contacto  [1440]
       482px between these sections, +215% against the median 153px
       fix: use one gap between sections (all within 25% of each other)
  FAIL section-gaps     section#contacto / footer.footer.container  [1440]
       46px between these sections, -70% against the median 153px
       fix: use one gap between sections (all within 25% of each other)
  FAIL section-height   footer.footer.container "JAIAX LabsIdeas ambiciosas.Tecnología co"  [1440]
       the section is 216px tall (0.2 screens), 685px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)
       fix: set the section to one screen or two (height: calc(var(--h,1) * 100vh), --h 1 or 2) and cut or split its content to fit
  FAIL section-height   section#contacto "07 / Tu siguiente proyectoJAIAX Labs / P"  [1440]
       the section's content does not fit it: its content is 18px taller than the section (scrollHeight 917, clientHeight 899); its lowest content ends 900px below its top, past 828px (the section less 72px of bottom padding) (
       fix: fit the content above the section's bottom padding (--padb), or make it two screens (.g2) in two groups
  FAIL section-height (screen-height) section#precios "05 / Planes webUSDPlanes con alcance y p"  [1440, 390]
       the section's content does not fit it: its lowest content ends 865px below its top, past 828px (the section less 72px of bottom padding) (and 3 more like it: "02 / Trabajo en el labor", "03 / Lo que construimosW", "04 /
       fix: fit the content above the section's bottom padding (--padb), or make it two screens (.g2) in two groups
  FAIL section-air      section#servicios > div.lab-wrap.wrap > div.lab-service-list "01Páginas webTu negocio, tus  [1440]
       a top border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)
       fix: take the rule out: sections and their parts are parted by their ground and the air between them
  FAIL section-air      footer.footer.container > div.footer-top "JAIAX LabsIdeas ambiciosas.Tecnología co"  [1440]
       a bottom border across 100% of the container, between the section's content: sections and their parts are told apart by air and ground, not lines (SR-3)
       fix: take the rule out: sections and their parts are parted by their ground and the air between them
  FAIL one-section      footer.footer.container "JAIAX LabsIdeas ambiciosas.Tecnología co"  [1440]
       the screen at scroll 5616px (the top of section 8) shows 216px of section 8 and the content of 2 sections, over 24px each beside section 7: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)
       fix: make each section exactly one screen or two, so a screen shows one section and no neighbour peeks
  FAIL one-heading      h2#lab-prices-title "Planes con alcance y precio claros."  [1440]
       headings of two sections show whole on one screen at 4 of 113 scroll positions (3.5%; at scroll 3000, 3050, 3100, 3150px), here with "necesitas": at most 3% on a desktop (SR-5)
       fix: make the sections one screen tall so their headings sit a screen apart and two never share one
  FAIL container-edges  footer.footer.container "JAIAX LabsIdeas ambiciosas.Tecnología co"  [1440]
       a <footer> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (and 2 more like it: "01 / JAIAX LabsDe Perú a", "JAIAX LabsIdeas ambicios") (SR-6)
       fix: build the page as header.nav, a main of sections (each one in-flow .wrap plus background layers) and footer.closing
  FAIL container-edges  section#inicio > div.lab-wrap.wrap > div.lab-masthead > small "Digitalstudio."  [1440]
       1 text block starts on a left line at x 1299, 1219px from the container's left: text starts on the container's left, or on one split line (x 623, 732, 841) (SR-6)
       fix: start the text on the container's left, or on the one split line every split shares
  FAIL container-edges  section#inicio > div.lab-wrap.wrap > div.lab-masthead > span "✳"  [1440]
       1 text block starts on a left line at x 568, 488px from the container's left: text starts on the container's left, or on one split line (x 623, 732, 841) (SR-6)
       fix: start the text on the container's left, or on the one split line every split shares
  FAIL heading-scale    div.lab-wrap.wrap > div.lab-project-grid > a.lab-project:nth-of-type(1) > h3 "UMBRAL"  [390]
       an h3 at 38px, as large as the smallest h2 (34px) or larger (and 2 more like it: "SOMA", "NODO")
       fix: size headings by level: the h1 largest, one size per level, each level below the one above
  FAIL heading-scale    div.lab-plan-grid > article.lab-plan:nth-of-type(1) > div.lab-plan-price > strong "70"  [390]
       the figure "70" is set at 52px, larger than the h1 (35.1px) (and 1 more like it: "120")
       fix: set figures below the h1: a stat reads as data, not as the headline
  FAIL neighbour        #contacto section.lab-section.lab-contact "07 / Tu siguiente proyectoJAIAX "  [390]
       framed, 18px of #preguntas section.lab-section.lab-faq "06 / Preguntas frecuentesJAIAX /" shows
       fix: keep the next section's heading and picture out of this screen
  WAIVED copy-headings div.lab-wrap.wrap > div.lab-project-grid > a.lab-project:nth-of-type(1) > h3 "UM: UMBRAL, SOMA y NODO son nombres de conceptos existentes del estudio en el repositorio. Los títulos y categorías están en español; el detector de sustantivos no reconoce varios términos del idioma.
  WAIVED phone-number header.header.nav > div.nav-wrap > a.nav-cta "https://api.whatsapp.com/send?phon: El número 51924488034 es el contacto real del negocio ya incluido en el repositorio entregado por el usuario. Se conservan sus enlaces comerciales autorizados.
  WAIVED container-edges a.skip-link "Ir al contenido": El enlace para saltar al contenido es el primer control del documento por accesibilidad. Es HTML válido fuera del header y solo aparece al recibir foco; no altera la alineación del contenido.
  WAIVED container-edges div.reading-progress: Indicador decorativo global de progreso existente, fijo y sin contenido textual. Es válido fuera de main y no representa una columna ni una sección de contenido.
  27 WARN (not blocking), first: assets (the page); scroll-reveal section#proceso "04 / Cómo trabajamos Es; no-visual section#inicio "Webs que hacen avanzar t; pricing-tiers section#precios > div.lab-wrap.wrap > di; copy-buttons div.lab-wrap.wrap > div.lab-plan-grid >
Stop fixing: put these open FAILs and the waivers in your report, then finish.
GATE: OPEN 20 (rounds used up)
```

## Rendimiento

Se ejecutó una medición inicial de tres cargas y una repetición de una carga por ancho tras la corrección de navegación. Es una prueba local con Edge headless y CPU, no una medición de producción ni de todos los dispositivos.

El resultado final conserva tres FAIL y tres WARN. Dos FAIL de familias de fuentes cuentan también los nombres de fallback generados por Next: se descargan tres archivos, 43,3 KiB en total. El otro FAIL es la resolución natural de las imágenes respecto al tamaño móvil; las variantes conservan 1200 px para pantallas de alta densidad y no se han generado fuentes responsive de varios tamaños. Es un límite pendiente de optimización.

Transferencia total medida: 736,9 KiB en escritorio y 609,7 KiB en móvil. Contextos WebGL: cero. Layout shift medido: 0,000. Solicitudes rotas: cero en ambos anchos. El resumen sigue siendo FAIL y no se presenta como aprobación completa.

```text

perf out/es/index.html @ 1440px
  PASS  host CPU load (before/after)               40/37 %
  PASS  total transfer                             736.9 KiB      html 21.3K  css 23.1K  js 185.2K  font 43.3K  img 440.7K  other 23.4K
  PASS  requests                                   24             23 by load
  PASS  images bytes                               440.7 KiB      4 files
  PASS  largest image                              125.1 KiB      images/umbral-studio.webp
  WARN  JS parsed                                  575.1 KiB      12 files, 185.2K gz
  PASS  CSS                                        23.1 KiB       2 files
  FAIL  font families                              5              Funnel Display, Funnel Sans, Funnel Sans Fallback, DM Mono, DM Mono Fallback
  PASS  font files                                 3              43.3K
  PASS  font bytes                                 43.3 KiB
  PASS  images without width+height                0
  PASS  below-fold images not lazy                 0
  WARN  oversized images (natural > 2.2x shown)    3              umbral-studio.webp 1200px for 411; soma-studio.webp 1200px for 411; nodo-studio.webp 1200px for 411
  PASS  WebGL live at load                         0
  PASS  WebGL live at bottom                       0
  PASS  WebGL peak live                            0              0 contexts made in all
  PASS  long tasks                                 1              runs 1, , max 57ms
  PASS  blocking time                              7 ms           runs 1,  ms; at load 7ms
  PASS  FCP (CPU, relative)                        176 ms
  PASS  LCP (CPU, relative)                        176 ms         a.nav-cta
  PASS  layout shift                               0.000          at load 0.000
  PASS  modules loaded, never mounted              0
  PASS  broken requests                            0
  PASS  page height                                7.2 screens    DOM 666 nodes

perf out/es/index.html @ 390px
  PASS  host CPU load (before/after)               40/37 %
  PASS  total transfer                             609.7 KiB      html 21.3K  css 23.1K  js 185.2K  font 43.3K  img 315.6K  other 21.3K
  PASS  requests                                   22             20 by load
  PASS  images bytes                               315.6 KiB      3 files
  PASS  largest image                              125.1 KiB      images/umbral-studio.webp
  WARN  JS parsed                                  575.1 KiB      12 files, 185.2K gz
  PASS  CSS                                        23.1 KiB       2 files
  FAIL  font families                              5              Funnel Display, Funnel Sans, Funnel Sans Fallback, DM Mono, DM Mono Fallback
  PASS  font files                                 3              43.3K
  PASS  font bytes                                 43.3 KiB
  PASS  images without width+height                0
  PASS  below-fold images not lazy                 0
  FAIL  oversized images (natural > 2.2x shown)    4              umbral-studio.webp 1200px for 340; umbral-studio.webp 1200px for 342; soma-studio.webp 1200px for 342
  PASS  WebGL live at load                         0
  PASS  WebGL live at bottom                       0
  PASS  WebGL peak live                            0              0 contexts made in all
  PASS  long tasks                                 2              runs 1, , max 169ms
  PASS  blocking time                              159 ms         runs 1,  ms; at load 159ms
  PASS  FCP (CPU, relative)                        364 ms
  PASS  LCP (CPU, relative)                        364 ms         button.menu-trigger
  PASS  layout shift                               0.000          at load 0.000
  PASS  modules loaded, never mounted              0
  PASS  broken requests                            0
  PASS  page height                                10 screens     DOM 666 nodes

SUMMARY out/es/index.html: 3 FAIL, 3 WARN  -> FAIL
```

## Límites de verificación

La auditoría de composición se realizó antes del despliegue. No se probó en Safari/Firefox o teléfonos físicos. El código y el HTML estático se verificaron localmente; el estado del despliegue posterior se consulta en GitHub Actions. Las capturas de QA y los perfiles del navegador son locales y están excluidos del repositorio.
