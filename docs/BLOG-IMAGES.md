# Ilustraciones del blog — 17/11/2026

Cinco ilustraciones originales generadas con la herramienta integrada `image_gen`, solicitadas por el usuario. Son metáforas editoriales, no fotografías ni capturas de productos o proyectos de clientes. La dirección común usa papel marfil, fondo carbón y acentos de latón, con una composición diferente para cada tema.

Los prompts completos y la correspondencia de archivos están en [blog-image-prompts.json](blog-image-prompts.json).

Los archivos finales están versionados en `public/images/blog/`. Cada artículo tiene una imagen WebP de 1440 × 960 y una miniatura de 640 × 427. Las diez imágenes suman aproximadamente 251 kB; las tarjetas cargan miniaturas de forma diferida y la imagen principal declara sus dimensiones para reservar espacio.

En móvil, las cabeceras seleccionan la variante de 640 px mediante `picture`, sin depender de un servidor de optimización. El visor social conserva la versión de 1440 px.

- Web y ventas: una página conectada a una conversación.
- Excel o sistema: hojas separadas que convergen en una estructura compartida.
- Precios: tres alcances de web y una etiqueta sin cifras.
- n8n: cinco nodos conectados en un flujo.
- SEO: una lupa que destaca un resultado.

Las portadas aparecen en tarjetas, artículos relacionados y cabeceras. Cada cabecera tiene texto alternativo; las miniaturas dentro del enlace usan alt vacío porque el título adyacente ya nombra el destino. Los metadatos Open Graph, Twitter y BlogPosting apuntan a la ilustración correspondiente. Se conservan las antiguas tarjetas PNG de enlaces compartidos para no romper sus URL.

Se mantiene el diseño y contenido del blog. Esta entrega sustituye los dibujos genéricos del blog; los servicios conservan su arte anterior. La revisión visual se concentra en encuadre, carga y adaptación de estas imágenes, sin certificar un rediseño completo mediante el validador visual de la skill.

## Validación

- Build estático y TypeScript correctos; comprobaciones de SEO, referencias estáticas e idiomas correctas. El control SEO verifica las cinco imágenes WebP visibles, sus respuestas HTTP, presupuesto de peso y correspondencia con los metadatos sociales y JSON-LD.
- Verificadas las dimensiones y el formato de los diez archivos: 251058 bytes en total.
- Capturas revisadas con `shoot.mjs`: listado a 1440 px y artículo de precios a 390 px, incluidos los artículos relacionados.
- `perf.mjs`, una ejecución por ancho a 1440 y 390 px: listado 0 FAIL / 4 WARN; artículo de precios 0 FAIL / 4 WARN. Sin solicitudes rotas ni desplazamiento acumulado de diseño. No son mediciones de usuarios reales ni una mediana de tres ejecuciones.
- Advertencias retenidas del listado: tamaño de JavaScript compartido y miniaturas con carga diferida que llegan a quedar dentro de la primera pantalla (son archivos de 5–10 kB). En el artículo: JavaScript compartido y carga del equipo durante la prueba. No se cambió la infraestructura del sitio para resolver esos avisos.
