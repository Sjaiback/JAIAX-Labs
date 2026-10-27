"use client";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Trash2,
  Truck,
} from "lucide-react";
import { DemoDialog } from "./DemoDialog";
import { ProductArt } from "./ProductArt";
import s from "./demos.module.css";
const products = [
  {
    id: "aire",
    name: "Aire / 01",
    type: "headphones" as const,
    category: "Audio",
    price: 329,
    tag: "EL FAVORITO",
    color: "#454b3f",
    description:
      "Tu espacio, incluso en movimiento. Un concepto de auriculares de líneas suaves, almohadillas envolventes y una presencia silenciosa.",
  },
  {
    id: "luz",
    name: "Luz / 02",
    type: "lamp" as const,
    category: "Iluminación",
    price: 249,
    tag: "NUEVO",
    color: "#777956",
    description:
      "Una pausa cálida para tu rincón favorito. La silueta de Luz transforma una mesa de trabajo en un lugar al que quieres volver.",
  },
  {
    id: "forma",
    name: "Forma / 03",
    type: "chair" as const,
    category: "Espacio",
    price: 459,
    tag: "DISEÑO ESENCIAL",
    color: "#8a785e",
    description:
      "Curvas que invitan a quedarse. Forma propone una pieza versátil, de proporciones simples y carácter tranquilo.",
  },
  {
    id: "pulso",
    name: "Pulso / 04",
    type: "speaker" as const,
    category: "Audio",
    price: 189,
    tag: "PEQUEÑAS GRANDES IDEAS",
    color: "#4e5949",
    description:
      "Música que encuentra su lugar. Un concepto de altavoz compacto pensado como un objeto que también quieres mirar.",
  },
  {
    id: "tierra",
    name: "Tierra / 05",
    type: "vase" as const,
    category: "Espacio",
    price: 119,
    tag: "HECHO PARA DURAR",
    color: "#a37e58",
    description:
      "Una forma orgánica para lo cotidiano. Tierra celebra las superficies naturales y el valor de los objetos sencillos.",
  },
  {
    id: "tiempo",
    name: "Tiempo / 06",
    type: "clock" as const,
    category: "Espacio",
    price: 159,
    tag: "A TU RITMO",
    color: "#58634a",
    description:
      "Menos prisa, más presencia. Un reloj de diseño limpio que devuelve la atención a lo que de verdad importa.",
  },
];
type Product = (typeof products)[number];
type CartItem = { id: string; color: string; quantity: number };
const colors = [
  { name: "Grafito", hex: "#454b3f" },
  { name: "Arena", hex: "#a99a7c" },
  { name: "Oliva", hex: "#78805a" },
];
const money = (n: number) => `S/ ${n.toFixed(2)}`;
export function CommerceDemo() {
  const catalog = useRef<HTMLElement>(null);
  const [category, setCategory] = useState("Todo");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("destacados");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [color, setColor] = useState("Grafito");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(false);
  const [couponNote, setCouponNote] = useState("");
  const [notice, setNotice] = useState("");
  const [delivery, setDelivery] = useState("domicilio");
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + products.find((p) => p.id === item.id)!.price * item.quantity,
    0,
  );
  const shipping =
    subtotal === 0 || subtotal >= 500 || delivery === "recojo" ? 0 : 18;
  const total = subtotal + shipping - (discount ? subtotal * 0.1 : 0);
  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "Todo" || p.category === category) &&
            (!favoritesOnly || favorites.includes(p.id)) &&
            `${p.name} ${p.category}`
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "menor"
            ? a.price - b.price
            : sort === "mayor"
              ? b.price - a.price
              : 0,
        ),
    [category, query, sort, favoritesOnly, favorites],
  );
  const openProduct = (p: Product) => {
    setSelected(p);
    setQuantity(1);
    setColor("Grafito");
  };
  const favorite = (id: string) =>
    setFavorites((items) =>
      items.includes(id) ? items.filter((x) => x !== id) : [...items, id],
    );
  const add = (product: Product) => {
    setCart((items) => {
      const exists = items.find(
        (x) => x.id === product.id && x.color === color,
      );
      return exists
        ? items.map((x) =>
            x === exists
              ? { ...x, quantity: Math.min(8, x.quantity + quantity) }
              : x,
          )
        : [...items, { id: product.id, color, quantity }];
    });
    setNotice(`${product.name} añadido a tu bolsa.`);
    setSelected(null);
  };
  const change = (index: number, value: number) =>
    setCart((items) =>
      value <= 0
        ? items.filter((_, i) => i !== index)
        : items.map((item, i) =>
            i === index ? { ...item, quantity: Math.min(8, value) } : item,
          ),
    );
  const browse = () =>
    catalog.current?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  return (
    <div className={`${s.demoRoot} ${s.commerce}`} data-demo-app="ecommerce">
      <div className={s.shopAnnouncement}>
        OBJETOS CON INTENCIÓN. DISEÑO PARA TODOS LOS DÍAS.{" "}
        <span>Una tienda de demostración por JAIAX Labs ↗</span>
      </div>
      <header className={s.shopHeader}>
        <a href="#soma-inicio" className={s.somaLogo} aria-label="SOMA, inicio">
          soma<span>®</span>
        </a>
        <nav aria-label="Tienda SOMA">
          <button
            onClick={() => {
              setFavoritesOnly(false);
              browse();
            }}
          >
            Colección
          </button>
          <a href="#soma-filosofia">Nuestra mirada</a>
        </nav>
        <div>
          <button
            className={s.iconButton}
            aria-label={`Ver favoritos, ${favorites.length} guardados`}
            onClick={() => {
              setFavoritesOnly(!favoritesOnly);
              browse();
            }}
          >
            <Heart size={20} fill={favoritesOnly ? "currentColor" : "none"} />
          </button>
          <button
            className={s.cartButton}
            onClick={() => {
              setStep(0);
              setCartOpen(true);
            }}
            aria-label={`Abrir bolsa, ${count} artículos`}
          >
            <ShoppingBag size={19} />
            <span>Bolsa</span>
            <b>{count}</b>
          </button>
        </div>
      </header>
      <section className={s.shopHero} id="soma-inicio">
        <div className={s.shopHeroCopy}>
          <span className={s.shopEyebrow}>
            COLECCIÓN 01 — MENOS, PERO MEJOR.
          </span>
          <h1>
            Diseño que
            <br />
            se <em>siente.</em>
          </h1>
          <p>
            Objetos que acompañan tus días.
            <br />
            Formas que hacen espacio para lo esencial.
          </p>
          <button className={s.shopBlackButton} onClick={browse}>
            Encuentra tu próximo favorito <ArrowUpRight size={17} />
          </button>
          <div className={s.heroSmall}>
            <span>01 / 06</span>
            <span>AIRE / 01 · AUDIO SIN RUIDO</span>
          </div>
        </div>
        <div className={s.shopHeroArt}>
          <span className={s.artWatermark}>s.</span>
          <ProductArt
            kind="headphones"
            color="#454b3f"
            className={s.heroProduct}
          />
          <div className={s.productSpot}>
            <span>ESCUCHA LO QUE IMPORTA</span>
            <button
              onClick={() => openProduct(products[0])}
              aria-label="Descubrir auriculares Aire 01"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className={s.heroProductName}>
            <div>
              <span>Aire / 01</span>
              <small>Un nuevo espacio para ti.</small>
            </div>
            <strong>{money(products[0].price)}</strong>
          </div>
        </div>
      </section>
      <div className={s.shopMarquee}>
        <span>DISEÑO ESENCIAL</span>
        <span>✳</span>
        <span>MENOS RUIDO</span>
        <span>✳</span>
        <span>MÁS INTENCIÓN</span>
        <span>✳</span>
        <span>OBJETOS PARA QUEDARSE</span>
      </div>
      {notice && (
        <div className={s.shopToast} role="status">
          <Check size={17} />
          {notice}
          <button
            onClick={() => {
              setStep(0);
              setCartOpen(true);
            }}
          >
            Ver bolsa <ArrowRight size={13} />
          </button>
          <button aria-label="Cerrar aviso" onClick={() => setNotice("")}>
            ×
          </button>
        </div>
      )}
      <section className={s.catalog} ref={catalog} id="soma-coleccion">
        <div className={s.catalogHeading}>
          <div>
            <span className={s.shopEyebrow}>BIEN ELEGIDO. BIEN VIVIDO.</span>
            <h2>
              {favoritesOnly
                ? "Tus próximos favoritos."
                : "Piezas con propósito."}
            </h2>
          </div>
          <span>Una colección. Infinitas formas de hacerla tuya.</span>
        </div>
        <div className={s.catalogTools}>
          <div className={s.shopTabs}>
            {["Todo", "Audio", "Iluminación", "Espacio"].map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
                {c === "Todo" && <small>06</small>}
              </button>
            ))}
          </div>
          <div className={s.catalogSearch}>
            <label>
              <Search size={16} />
              <input
                aria-label="Buscar productos"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca algo especial…"
              />
            </label>
            <label>
              <SlidersHorizontal size={15} />
              <select
                aria-label="Ordenar productos"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="destacados">Destacados</option>
                <option value="menor">Menor precio</option>
                <option value="mayor">Mayor precio</option>
              </select>
            </label>
          </div>
        </div>
        {favoritesOnly && (
          <button
            className={s.clearFilter}
            onClick={() => setFavoritesOnly(false)}
          >
            Ver toda la colección ×
          </button>
        )}
        <div className={s.productGrid}>
          {filtered.map((product, i) => (
            <article key={product.id} className={s.productCard}>
              <div className={s.productImage} data-tone={i % 3}>
                <span className={s.productTag}>{product.tag}</span>
                <button
                  className={s.productFavorite}
                  aria-label={`${favorites.includes(product.id) ? "Quitar de" : "Añadir a"} favoritos ${product.name}`}
                  aria-pressed={favorites.includes(product.id)}
                  onClick={() => favorite(product.id)}
                >
                  <Heart
                    size={18}
                    fill={
                      favorites.includes(product.id) ? "currentColor" : "none"
                    }
                  />
                </button>
                <button
                  className={s.productOpen}
                  onClick={() => openProduct(product)}
                  aria-label={`Ver ${product.name}`}
                >
                  <ProductArt kind={product.type} color={product.color} />
                </button>
                <button
                  className={s.quickAdd}
                  onClick={() => openProduct(product)}
                >
                  <Plus size={16} /> Elige tu pieza
                </button>
              </div>
              <div className={s.productMeta}>
                <div>
                  <h3>
                    <button onClick={() => openProduct(product)}>
                      {product.name}
                    </button>
                  </h3>
                  <p>{product.category} · Colección esencial</p>
                </div>
                <strong>{money(product.price)}</strong>
              </div>
              <div className={s.productColors}>
                {colors.map((c) => (
                  <i key={c.name} style={{ background: c.hex }} />
                ))}
                <span>3 tonos</span>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <div className={s.empty}>
            <Heart size={28} />
            <h3>
              {favoritesOnly
                ? "Tus favoritos empiezan aquí."
                : "Todavía no encontramos esa pieza."}
            </h3>
            <p>
              {favoritesOnly
                ? "Guarda los objetos que te hacen sentir algo."
                : "Prueba otra búsqueda o explora la colección completa."}
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("Todo");
                setFavoritesOnly(false);
              }}
            >
              Explorar colección
            </button>
          </div>
        )}
        <p className={s.catalogCount} role="status">
          {filtered.length} piezas para descubrir.
        </p>
      </section>
      <section className={s.shopPhilosophy} id="soma-filosofia">
        <span className={s.shopEyebrow}>NUESTRA MIRADA</span>
        <h2>
          No necesitas más.
          <br />
          <em>Necesitas que importe.</em>
        </h2>
        <p>
          Creemos en elegir con calma. En los objetos que se usan, se disfrutan
          y encuentran su lugar. SOMA es una exploración de cómo el diseño puede
          hacer un poco mejor lo cotidiano.
        </p>
        <div>
          {[
            "Formas honestas",
            "Detalles que se sienten",
            "Un espacio para lo esencial",
          ].map((text, i) => (
            <span key={text}>
              0{i + 1} / {text}
            </span>
          ))}
        </div>
      </section>
      <div className={s.shopDemoNote}>
        <Truck size={17} />
        <span>
          Tienda de demostración: catálogo, precios y pedidos son ficticios. No
          se realizan cobros ni envíos.
        </span>
      </div>
      <DemoDialog
        open={!!selected}
        title={selected?.name || "Descubrir pieza"}
        onClose={() => setSelected(null)}
        wide
      >
        {selected && (
          <div className={s.productDetail}>
            <div className={s.detailArt}>
              <ProductArt
                kind={selected.type}
                color={colors.find((c) => c.name === color)!.hex}
              />
            </div>
            <div className={s.productDetailCopy}>
              <span className={s.shopEyebrow}>
                {selected.category} / COLECCIÓN 01
              </span>
              <h3>{selected.name}</h3>
              <strong className={s.detailPrice}>{money(selected.price)}</strong>
              <p>{selected.description}</p>
              <fieldset className={s.colorPicker}>
                <legend>
                  Tu tono: <strong>{color}</strong>
                </legend>
                {colors.map((c) => (
                  <button
                    key={c.name}
                    aria-label={`Color ${c.name}`}
                    aria-pressed={color === c.name}
                    onClick={() => setColor(c.name)}
                    style={{ background: c.hex }}
                  >
                    {color === c.name && <Check size={16} />}
                  </button>
                ))}
              </fieldset>
              <div className={s.quantityRow}>
                <span>Cantidad</span>
                <div className={s.quantity}>
                  <button
                    aria-label="Reducir cantidad"
                    onClick={() => setQuantity((n) => Math.max(1, n - 1))}
                    disabled={quantity === 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span>{quantity}</span>
                  <button
                    aria-label="Aumentar cantidad"
                    onClick={() => setQuantity((n) => Math.min(8, n + 1))}
                    disabled={quantity === 8}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <button
                className={s.shopBlackButton}
                onClick={() => add(selected)}
              >
                Añadir a la bolsa — {money(selected.price * quantity)}{" "}
                <ShoppingBag size={17} />
              </button>
              <p className={s.finePrint}>
                Hasta 8 unidades por variante. Stock simulado para probar la
                experiencia.
              </p>
            </div>
          </div>
        )}
      </DemoDialog>
      <DemoDialog
        open={cartOpen}
        title={
          step === 2
            ? "Tu pedido de ejemplo está listo."
            : step === 1
              ? "Un último vistazo."
              : `Tu bolsa (${count})`
        }
        onClose={() => setCartOpen(false)}
      >
        <div className={s.dialogBody}>
          {step === 2 ? (
            <div className={s.orderSuccess}>
              <span>
                <Check size={35} />
              </span>
              <h3>Bien elegido.</h3>
              <p>
                Pedido de demostración <strong>SOMA-0001</strong> creado. No se
                ha realizado ningún cargo ni envío.
              </p>
              <button
                className={s.shopBlackButton}
                onClick={() => {
                  setCartOpen(false);
                  setStep(0);
                  browse();
                }}
              >
                Seguir descubriendo <ArrowRight size={16} />
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className={s.empty}>
              <ShoppingBag size={35} />
              <h3>Haz espacio para algo especial.</h3>
              <p>Tu bolsa todavía está vacía.</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  browse();
                }}
              >
                Descubrir la colección
              </button>
            </div>
          ) : (
            <>
              <div className={s.checkoutSteps}>
                <span data-active={step === 0}>01 / Tu selección</span>
                <span data-active={step === 1}>02 / Revisión</span>
              </div>
              <div className={s.cartItems}>
                {cart.map((item, index) => {
                  const p = products.find((p) => p.id === item.id)!;
                  return (
                    <div
                      key={`${item.id}-${item.color}`}
                      className={s.cartItem}
                    >
                      <div className={s.cartArt}>
                        <ProductArt
                          kind={p.type}
                          color={colors.find((c) => c.name === item.color)!.hex}
                        />
                      </div>
                      <div>
                        <h3>{p.name}</h3>
                        <p>
                          {item.color} · {money(p.price)}
                        </p>
                        <div className={s.quantity}>
                          <button
                            aria-label={`Reducir ${p.name}`}
                            onClick={() => change(index, item.quantity - 1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            aria-label={`Aumentar ${p.name}`}
                            onClick={() => change(index, item.quantity + 1)}
                            disabled={item.quantity === 8}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <strong>{money(p.price * item.quantity)}</strong>
                        <button
                          className={s.iconButton}
                          aria-label={`Eliminar ${p.name}`}
                          onClick={() => change(index, 0)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {step === 0 ? (
                <>
                  <div className={s.coupon}>
                    <label htmlFor="soma-coupon">
                      ¿Tienes un código? Prueba SOMA10.
                    </label>
                    <div>
                      <input
                        id="soma-coupon"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Tu código"
                      />
                      <button
                        onClick={() => {
                          const valid =
                            coupon.trim().toUpperCase() === "SOMA10";
                          setDiscount(valid);
                          setCouponNote(
                            valid
                              ? "Listo: 10% aplicado a tus piezas."
                              : "Ese código no está disponible. Prueba SOMA10.",
                          );
                        }}
                      >
                        Aplicar
                      </button>
                    </div>
                    <small role="status">{couponNote}</small>
                  </div>
                </>
              ) : (
                <fieldset className={s.delivery}>
                  <legend>¿Cómo te gustaría recibirlo?</legend>
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "domicilio"}
                      onChange={() => setDelivery("domicilio")}
                    />
                    Entrega a domicilio ·{" "}
                    {subtotal >= 500 ? "Gratis en esta simulación" : "S/ 18.00"}
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "recojo"}
                      onChange={() => setDelivery("recojo")}
                    />
                    Recojo en estudio · Gratis
                  </label>
                </fieldset>
              )}
              <dl className={s.cartTotals}>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                {discount && (
                  <div>
                    <dt>Tu código SOMA10</dt>
                    <dd>−{money(subtotal * 0.1)}</dd>
                  </div>
                )}
                <div>
                  <dt>Entrega estimada</dt>
                  <dd>{shipping === 0 ? "Gratis" : money(shipping)}</dd>
                </div>
                <div>
                  <dt>Total</dt>
                  <dd>{money(total)}</dd>
                </div>
              </dl>
              <button
                className={s.shopBlackButton}
                onClick={() => {
                  if (step === 0) setStep(1);
                  else {
                    setCart([]);
                    setDiscount(false);
                    setCoupon("");
                    setCouponNote("");
                    setStep(2);
                    setNotice("");
                  }
                }}
              >
                {step === 0 ? "Revisar mi pedido" : "Crear pedido de ejemplo"}
                <ArrowRight size={16} />
              </button>
              {step === 1 && (
                <button className={s.backText} onClick={() => setStep(0)}>
                  ← Volver a mi selección
                </button>
              )}
              <p className={s.finePrint}>
                Compra de demostración. No se solicita tarjeta ni se procesa
                ningún pago.
              </p>
            </>
          )}
        </div>
      </DemoDialog>
    </div>
  );
}
