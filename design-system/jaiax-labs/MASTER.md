# JAIAX Labs — sistema visual

Tipo: software y estudio de desarrollo. Audiencia: negocios que buscan una web, comercio digital o software. Acción principal: cotizar por WhatsApp.

## Dirección
Inspiración: jerarquía editorial, numeración técnica y reconstrucción bajo demanda de saai.pro. Implementación propia sobre Next.js, sin importar su motor, imágenes ni textos.

UI UX Pro Max recomendó alto contraste, bordes visibles y protagonismo de proyectos. Taste Skill repartió un hero split, Funnel Display/Funnel Sans + DM Mono y el momento word-highlight. Se usa su comando brand con los colores propios de JAIAX en lugar de la primera paleta clara: la marca existente ya es negra y dorada.

## Paleta
- Grafito: #090b0b. Fondo.
- Superficie: #141817. Tarjetas.
- Blanco cálido: #f3f1e9. Texto y sección de proceso.
- Latón: #d5b078. Acciones y énfasis.
- Gris: #a1aaa6. Texto secundario.
- Salvia: #acccaa. Estados y cursor de diseño.
- Azul: #8cb7c6. Tercer cursor, solo durante la experiencia.

Tokens completos en src/components/home/lab.css. Fuentes autoalojadas mediante next/font. Radio de 4–8 px, controles de 44–50 px y la misma alineación a ambos lados.

## Pantallas
1. Inicio: marca, categoría, precio real desde US$ 70 y concepto UMBRAL. Hero split; entrada breve al cargar.
2. Proyectos: UMBRAL, SOMA, NODO. Conceptos existentes, identificados como trabajo del estudio.
3. Servicios: cuatro rutas a prestaciones existentes.
4. Proceso: contraste claro, declaración con word-highlight y tres pasos existentes.
5. Planes: cuatro alcances y precios existentes. Dos pantallas en tablet cuando requiere dos filas.
6. Preguntas: respuestas existentes sobre alcance y costos; crece cuando se abren.
7. El cierre de contacto se eliminó a petición del usuario; la portada termina en preguntas y el pie existente.

## Introducción automática de construcción
Automática en cada visita a la portada. Reconstruye una copia inerte de los elementos renderizados del hero mediante Web Animations, marcos de dibujo y tres cursores. 11 segundos y una transición final que entrega la web automáticamente. Pausa, velocidad 1×/2×, repetición, salida y Escape. No reemplaza el DOM interactivo original. Un diálogo nativo contiene el foco; al salir restaura foco y scroll. Cambiar tamaño cierra la experiencia para mantener la geometría correcta. Reduced motion omite la introducción y presenta directamente la web. Sin audio ni servicios externos.

## Voz
Técnica y directa, en español, inglés, alemán e italiano. Explica lo que se construye y el alcance. Sin clientes, métricas o testimonios inventados. Precios, contactos e imágenes se conservan del repositorio. No se necesitan fotografías nuevas ni nombres de marca inventados.

## GitHub Pages
output: export, trailingSlash y assets locales con assetPath. La animación se ejecuta solo en el navegador. Se conserva el workflow existente. Los archivos de prueba y las capturas no se publican.
