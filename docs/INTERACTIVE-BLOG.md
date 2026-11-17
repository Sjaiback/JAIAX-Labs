# Ejemplos interactivos del blog

Cada uno de los cinco artículos incluye una herramienta relacionada con su tema, accesible desde el inicio y el índice. El contenido editorial sigue renderizándose en HTML estático; las herramientas usan estado de React y controles nativos. No requieren backend, cookies, servicios conectados ni nuevas dependencias. Son compatibles con GitHub Pages.

| Artículo | Herramienta | Límites visibles |
|---|---|---|
| Cómo una web ayuda a vender | Comparación de una oferta vaga y una clara, con consulta de ejemplo | Taller ficticio; no es un resultado comercial comprobado |
| Excel o sistema | Orientación según repetición, trabajo compartido, integraciones y permisos | Primera orientación, no diagnóstico ni presupuesto |
| Cuánto cuesta una web | Selector de alcance y tabla de los cuatro planes publicados | Pagos, inventario o API llevan a cotización a medida; dominio, hosting y mantenimiento aparte |
| Qué es n8n | Flujo manual de cuatro etapas y cuatro escenarios | Datos simulados; no hay integraciones ni avisos reales; los fallos no se presentan como éxitos |
| SEO para servicios | Editor local de título y descripción con vista previa | No modifica metadatos reales ni promete posiciones o clics |

El selector de precios usa `src/data/pricing.ts`, la misma fuente que el resto del sitio. Las reglas de los ejemplos están en `src/data/article-experiences.ts`, la interfaz en `src/components/journal/ArticlePlayground.tsx` y su CSS se limita a estos controles.

Las fechas originales se conservan y las fechas de modificación indican el 17/11/2026. Las descripciones de los artículos mencionan sus nuevas herramientas sin prometer resultados.

## Comprobaciones

`npm run blog:check` comprueba alcances y extras de los planes, orientación de procesos, validación de entradas, prevención de duplicados y fallo de entrega. Este control se ejecuta también en el workflow de Pages.

`node scripts/prepare-article-qa.mjs` crea una página temporal en `out/__article-qa.html` para probar los cinco componentes hidratados en el navegador mediante `shoot.mjs`. Incluye cambios de estado, navegación del flujo, reinicios, edición de texto, casos vacíos y texto largo; comprueba que no haya desbordamientos en 1440, 1024, 768, 390 y 320 px, y que los botones tengan al menos 44 px de alto.

La página temporal no forma parte del sitio. Se elimina después de las pruebas; `check-static.mjs` impide publicar archivos de QA con ese formato de nombre. Esta entrega amplía el blog existente y no certifica un rediseño completo con el validador visual de la skill.

Resultados de esta entrega: build y TypeScript, reglas de los ejemplos, SEO, referencias estáticas, idiomas y precios correctos. Las pruebas en navegador pasaron en escritorio y en móvil con movimiento reducido, incluyendo los cinco componentes hidratados y los cinco anchos. Capturas locales: `shots/article-playground-qa.png` y `shots/article-playground-mobile-qa.png`.

`perf.mjs` sobre el artículo n8n a 1440 y 390 px, una ejecución por ancho: 0 FAIL / 4 WARN. Sin solicitudes rotas ni desplazamiento acumulado de diseño. Se conservan las advertencias por el JavaScript compartido del sitio y la carga del equipo durante la prueba. Estos resultados no son mediciones de usuarios reales ni una mediana de tres ejecuciones.
