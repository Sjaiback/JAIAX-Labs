# Logotipo animado de JAIAX Labs

La versión actual usa la paleta de la web: champán `#e2c28f`, dorado `#c6a16b`, bronce `#a77c46` y marfil `#f0e8db`. Conserva las rutas trazadas del PNG. `JaiaxBrand.tsx` reorganiza esas mismas rutas en una firma horizontal para cabecera y pie. El SVG descargable se actualiza con `node scripts/export-logo.mjs`.

## Uso en un hero

```tsx
import { AnimatedJaiaxLogo } from "@/components/brand/AnimatedJaiaxLogo";

export function HeroBrand() {
  return <AnimatedJaiaxLogo size={320} />;
}
```

Ya se ha integrado en `src/components/home/hero.tsx`, fuera del contenedor de reveal para que la construcción del logo no quede subordinada a un fade-in. El espacio del SVG se reserva desde el HTML inicial.

## Props

| Prop            | Tipo               | Valor inicial | Comportamiento                                                                                                                                                                                                               |
| --------------- | ------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`          | `number \| string` | `320`         | Ancho en píxeles o longitud CSS. Conserva proporción y no supera el ancho del contenedor.                                                                                                                                    |
| `autoplay`      | `boolean`          | `true`        | Reproduce al montar. `false` muestra el logo completo y no llama a `onComplete`. Cambiar a `true` inicia una reproducción.                                                                                                   |
| `onComplete`    | `() => void`       | —             | Se llama una vez al completar cada configuración de reproducción. En movimiento reducido se llama al mostrar la versión completa. No se llama al cancelar por desmontaje. Cambiar solo el callback no reinicia la animación. |
| `reducedMotion` | `boolean`          | `false`       | `true` fuerza la versión estática. `false` sigue respetando `prefers-reduced-motion`.                                                                                                                                        |
| `className`     | `string`           | `''`          | Clase adicional para composición.                                                                                                                                                                                            |

Para repetir desde el comienzo, cambia la `key` del componente. Cambiar `size`, redimensionar el contenedor o actualizar `onComplete` no reinicia la secuencia.

## Intro opcional

```tsx
"use client";
import { useState } from "react";
import { JaiaxLogoIntro } from "@/components/brand/JaiaxLogoIntro";

export function OptionalIntro() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <JaiaxLogoIntro
      onComplete={() => setShow(false)}
      onSkip={() => setShow(false)}
    />
  );
}
```

La intro usa un `dialog` modal nativo, permite omitir con botón o Escape, restaura el foco y el scroll, y se desmonta al completar. No se activa automáticamente en toda la web. Se puede probar desde `/logo`.

## Geometría y color

- `src/data/jaiax-logo.ts`: coordenadas y degradados compartidos por el componente.
- `public/images/jaiax-logo.svg`: versión estática transparente, editable en un editor vectorial, de aproximadamente 8,5 KB.
- 16 rutas centrales reales: símbolo JX, JAIAX y LABS. No hay elementos `<text>`, fuentes, PNG, `<image>`, máscaras ni revelado horizontal.
- Reconstrucción del PNG entregado, originalmente de 1536 × 1024. Se extrajeron las líneas centrales de sus trazos y se ajustaron curvas Bézier. La I se regularizó a una línea vertical usando el centro medido del trazo.
- La verificación raster del contorno principal sitúa el 99,7 % del núcleo de referencia a no más de un píxel del trazado y todo el núcleo a no más de dos píxeles, usando vecindad de ocho píxeles a la resolución original. Esto comprueba la geometría; no implica recuperar el archivo vectorial maestro ni la textura raster del PNG.
- Paleta adaptada a la web por petición del usuario: símbolo y LABS en degradado champán → dorado → bronce, con JAIAX en marfil.

Para editar la geometría de la aplicación, cambia los valores `d` en el archivo de datos. Si cambias el SVG estático por separado, actualiza también esos datos para mantener ambas versiones sincronizadas.

## Secuencia de 3000 ms

| Fase                                           | Ventana      |
| ---------------------------------------------- | ------------ |
| Cuatro partes del símbolo con desfase de 90 ms | 0–1360 ms    |
| JAIAX, incluyendo los dos trazos de X          | 1380–2280 ms |
| LABS escalonado, con sus subtrazos             | 2350–3000 ms |

Anime.js **4.5.0** controla las rutas con `svg.createDrawable()` dentro de `createScope()`. Cada ruta tiene un segundo trazo fino que actúa como punta de luz móvil y desaparece al terminar; el trazo principal queda completo. El glow se aplica mediante un único filtro SVG suave. No hay loops, WebGL, vídeo ni máscaras.

Al desmontar se retira el listener de `matchMedia`, se llama a `scope.revert()` y se eliminan los atributos temporales de los drawables. Los identificadores de degradado y filtro usan `useId`, por lo que varias instancias pueden coexistir sin compartir referencias.

La preferencia del sistema se atiende antes de la hidratación con CSS y después con `matchMedia`. Si cambia a movimiento reducido durante la secuencia, se cancela la animación y se muestra el estado final. Sin JavaScript existe un fallback estático mediante `noscript`.

## Pruebas

- `npm run lint`, `npm run typecheck` y `npm run build` completados.
- `/logo`: reproducción, callback, autoplay desactivado, movimiento reducido forzado, desmontaje durante la animación, intro y Escape.
- Duración observada en el navegador: unos 3077 ms desde la acción de reproducir hasta el callback, incluyendo el montaje y la actualización de React.
- Dos instancias simultáneas con IDs independientes.
- Hero revisado a 1440, 1024, 768, 390 y 360 px sin desbordamiento horizontal ni solapamiento entre botones y franja inferior.
- La preferencia nativa del sistema se implementa con CSS y `matchMedia`; en esta sesión se probó la rama equivalente mediante la prop `reducedMotion`, sin modificar la configuración global del equipo.

Documentación de la API utilizada: [createDrawable](https://animejs.com/documentation/svg/createdrawable/), [React y limpieza de scopes](https://animejs.com/documentation/getting-started/using-with-react/).
