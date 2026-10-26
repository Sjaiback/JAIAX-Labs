export const examples = [
  {
    slug: "forma",
    name: "Forma",
    category: "Arquitectura",
    theme: "stone",
    label: "ARQUITECTURA & ESPACIO",
    title: "Diseñar para habitar.",
    description:
      "Espacios que se sienten. Arquitectura que conecta tu manera de vivir con el lugar que habitas.",
    action: "Explorar espacios",
    image: "/images/forma-art.svg",
    detail:
      "Una web editorial para estudios que quieren dar protagonismo a sus proyectos.",
    items: [
      "Arquitectura residencial",
      "Diseño de interiores",
      "Espacios comerciales",
    ],
  },
  {
    slug: "territorio",
    name: "Territorio",
    category: "Viajes & experiencias",
    theme: "earth",
    label: "OTRA FORMA DE EXPLORAR",
    title: "El viaje empieza aquí.",
    description:
      "Rutas con historia, paisajes que se quedan contigo y tiempo para descubrir algo nuevo.",
    action: "Descubrir destinos",
    image: "/images/territorio-art.svg",
    detail:
      "Una experiencia inmersiva para descubrir destinos y convertir curiosidad en conversaciones.",
    items: ["Rutas de naturaleza", "Cultura y territorio", "Viajes a tu ritmo"],
  },
  {
    slug: "origen",
    name: "Origen",
    category: "Tienda & catálogo",
    theme: "clay",
    label: "MENOS, PERO MEJOR",
    title: "Objetos para quedarse.",
    description:
      "Materiales honestos, formas simples. Una selección de piezas para disfrutar lo cotidiano.",
    action: "Ver la colección",
    image: "/images/origen-art.svg",
    detail:
      "Un catálogo cálido y ordenado para marcas de objetos, decoración y diseño.",
    items: ["Cerámica esencial", "Objetos de madera", "Textiles naturales"],
  },
] as const;
export type Example = (typeof examples)[number];

