import * as THREE from "three";

/** Great circles keep every orbit on one spherical envelope, at every angle. */
export function mountOrbitalSphere(host: HTMLDivElement): () => void {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);
  const root = host.closest<HTMLElement>(".orbital-explorer")!;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
  camera.position.z = 6;
  const sphere = new THREE.Group();
  scene.add(sphere);
  scene.add(new THREE.AmbientLight(0xffe5b9, 1.7));
  const light = new THREE.DirectionalLight(0xfff1d6, 3.5);
  light.position.set(-3, 4, 5);
  scene.add(light);

  const radius = 1.45;
  const points = Array.from({ length: 240 }, (_, index) => {
    const angle = (index / 240) * Math.PI * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0,
    );
  });
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const orbitMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { gold: { value: new THREE.Color("#c6a16b") } },
    vertexShader: `varying float depth; void main(){vec4 view=modelViewMatrix*vec4(position,1.0);depth=clamp((view.z+7.45)/2.9,0.0,1.0);gl_Position=projectionMatrix*view;}`,
    fragmentShader: `
      uniform vec3 gold;
      varying float depth;
      void main(){
        float a=mix(0.13,0.78,smoothstep(0.0,1.0,depth));
        gl_FragColor=vec4(gold,a);
        #include <colorspace_fragment>
      }
    `,
  });
  const outlineMaterial = new THREE.LineBasicMaterial({
    color: "#c6a16b",
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });
  scene.add(new THREE.LineLoop(orbitGeometry, outlineMaterial));
  const envelopeGeometry = new THREE.SphereGeometry(radius * 0.995, 32, 24);
  const envelopeMaterial = new THREE.MeshBasicMaterial({
    color: "#b58c50",
    transparent: true,
    opacity: 0.025,
    depthWrite: false,
  });
  sphere.add(new THREE.Mesh(envelopeGeometry, envelopeMaterial));

  const beadGeometry = new THREE.SphereGeometry(0.026, 12, 8);
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: "#e2c28f",
    emissive: "#ac793a",
    emissiveIntensity: 0.45,
    metalness: 0.35,
    roughness: 0.4,
  });
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = glowCanvas.height = 64;
  const context = glowCanvas.getContext("2d")!;
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,224,170,0.6)");
  gradient.addColorStop(0.18, "rgba(226,194,143,0.2)");
  gradient.addColorStop(1, "rgba(226,194,143,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  const glowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const rings = Array.from({ length: 10 }, (_, index) => {
    const group = new THREE.Group();
    const line = new THREE.LineLoop(orbitGeometry, orbitMaterial);
    group.add(line);
    sphere.add(group);
    const bead = new THREE.Group();
    bead.add(new THREE.Mesh(beadGeometry, goldMaterial));
    const glow = new THREE.Sprite(glowMaterial);
    glow.scale.setScalar(0.2);
    bead.add(glow);
    if (index < 8) group.add(bead);
    return {
      group,
      bead,
      direction: index % 2 ? -1 : 1,
      offset: (index * Math.PI) / 5,
    };
  });
  const core = new THREE.Group();
  const spokeGeometry = new THREE.CylinderGeometry(0.009, 0.009, 0.78, 8);
  for (let index = 0; index < 4; index++) {
    const spoke = new THREE.Mesh(spokeGeometry, goldMaterial);
    spoke.rotation.z = (index * Math.PI) / 4;
    core.add(spoke);
  }
  const coreGeometry = new THREE.SphereGeometry(0.07, 20, 16);
  core.add(new THREE.Mesh(coreGeometry, goldMaterial));
  sphere.add(core);

  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  let visible = false,
    lost = false;
  let elapsed = 3.8,
    previous = 0,
    pointerX = 0,
    pointerY = 0;
  const paint = (time = 0) => {
    const delta =
      previous && time ? Math.min((time - previous) / 1000, 0.05) : 0;
    previous = time;
    if (!reduce.matches) elapsed += delta;
    sphere.rotation.x = THREE.MathUtils.lerp(
      sphere.rotation.x,
      pointerY * 0.24,
      0.055,
    );
    sphere.rotation.y = THREE.MathUtils.lerp(
      sphere.rotation.y,
      pointerX * 0.35,
      0.055,
    );
    rings.forEach(({ group, bead, direction, offset }, index) => {
      group.rotation.set(
        offset + elapsed * (0.028 + index * 0.002) * direction,
        index * 0.72 + elapsed * (0.038 + index * 0.003) * -direction,
        index * 0.31 + elapsed * 0.025 * direction,
      );
      const angle = offset + elapsed * (0.22 + index * 0.015) * direction;
      bead.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    });
    core.rotation.z = elapsed * 0.11;
    renderer.render(scene, camera);
  };
  const playback = () => {
    previous = 0;
    const active = visible && !document.hidden && !reduce.matches && !lost;
    root.dataset.orbitActive = String(active);
    renderer.setAnimationLoop(active ? paint : null);
    if (!lost) paint();
  };
  const size = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    paint();
  };
  const pointer = (event: PointerEvent) => {
    if (!fine.matches || reduce.matches || event.pointerType === "touch")
      return;
    const box = host.getBoundingClientRect();
    pointerX = Math.max(
      -1,
      Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1),
    );
    pointerY = Math.max(
      -1,
      Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1),
    );
    root.dataset.orbitPointer = `${pointerX.toFixed(2)},${pointerY.toFixed(2)}`;
  };
  const reset = () => {
    pointerX = pointerY = 0;
  };
  const preference = () => {
    reset();
    sphere.rotation.set(0, 0, 0);
    playback();
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    renderer.setAnimationLoop(null);
    root.dataset.orbitRenderer = "svg";
  };
  const contextRestored = () => {
    lost = false;
    size();
    root.dataset.orbitRenderer = "webgl";
    playback();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    playback();
  });
  const resize = new ResizeObserver(size);
  observer.observe(host);
  resize.observe(host);
  host.addEventListener("pointermove", pointer, { passive: true });
  host.addEventListener("pointerleave", reset);
  document.addEventListener("visibilitychange", playback);
  reduce.addEventListener("change", preference);
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  renderer.domElement.addEventListener("webglcontextrestored", contextRestored);
  size();
  root.dataset.orbitRenderer = "webgl";
  root.dataset.orbitRings = "10";
  return () => {
    renderer.setAnimationLoop(null);
    observer.disconnect();
    resize.disconnect();
    host.removeEventListener("pointermove", pointer);
    host.removeEventListener("pointerleave", reset);
    document.removeEventListener("visibilitychange", playback);
    reduce.removeEventListener("change", preference);
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    renderer.domElement.removeEventListener(
      "webglcontextrestored",
      contextRestored,
    );
    orbitGeometry.dispose();
    orbitMaterial.dispose();
    outlineMaterial.dispose();
    envelopeGeometry.dispose();
    envelopeMaterial.dispose();
    beadGeometry.dispose();
    goldMaterial.dispose();
    spokeGeometry.dispose();
    coreGeometry.dispose();
    glowTexture.dispose();
    glowMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    root.dataset.orbitRenderer = "svg";
  };
}
