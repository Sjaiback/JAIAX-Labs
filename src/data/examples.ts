export const examples = [
  {
    slug: "control-logistico",
    name: "NODO",
    category: "Control logístico",
    image: "/images/demo-logistica-desktop.png",
    mobileImage: "/images/demo-logistica-mobile.png",
    detail:
      "Una operación conectada: rutas, seguimiento, incidencias y analítica en un dashboard interactivo.",
  },
  {
    slug: "ecommerce",
    name: "SOMA",
    category: "Ecommerce de diseño",
    image: "/images/demo-ecommerce-desktop.png",
    mobileImage: "/images/demo-ecommerce-mobile.png",
    detail:
      "Una tienda para descubrir, elegir y comprar: variantes, favoritos, carrito y pedido de demostración.",
  },
  {
    slug: "blog-editorial",
    name: "UMBRAL",
    category: "Revista digital",
    image: "/images/demo-blog-desktop.png",
    mobileImage: "/images/demo-blog-mobile.png",
    detail:
      "Ideas que invitan a quedarse: búsqueda, temas, biblioteca personal y una experiencia editorial de lectura.",
  },
] as const;
export type Example = (typeof examples)[number];
export const legacyExamples: Record<string, string> = {
  forma: "control-logistico",
  origen: "ecommerce",
  territorio: "blog-editorial",
};
