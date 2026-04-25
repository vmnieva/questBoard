<script>
  // El token recibido debe ser reactivo (un $state creado en un store o un proxy).
  // Svelte 5 nos permite mutar este objeto profundamente y la UI lo registrará.
  let { token } = $props();

  const GRID_SIZE = 50;
  
  // Estado local efímero para controlar el drag
  let isDragging = $state(false);
  let startX = 0;
  let startY = 0;
  let initialTokenX = 0;
  let initialTokenY = 0;

  function onPointerDown(e) {
    if (!e.isPrimary) return;
    
    e.target.setPointerCapture(e.pointerId);
    isDragging = true;
    
    startX = e.clientX;
    startY = e.clientY;
    
    initialTokenX = token.x;
    initialTokenY = token.y;
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Actualizamos la posición visual de forma fluida (sin snapping todavía)
    token.x = initialTokenX + dx;
    token.y = initialTokenY + dy;
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    
    try {
      if (e.target.hasPointerCapture(e.pointerId)) {
        e.target.releasePointerCapture(e.pointerId);
      }
    } catch {}

    // LÓGICA MATEMÁTICA: Snap-to-Grid + Boundaries (Mínimo 0)
    token.x = Math.max(0, Math.round(token.x / GRID_SIZE) * GRID_SIZE);
    token.y = Math.max(0, Math.round(token.y / GRID_SIZE) * GRID_SIZE);
  }
</script>

<!-- Renderizado UI con performace basada en translate3d -->
<div
  class="token"
  style="transform: translate3d({token.x}px, {token.y}px, 0); background-color: {token.color || '#3b82f6'};"
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={onPointerUp}
  onpointercancel={onPointerUp}
>
  {token.label}
</div>

<style>
  .token {
    /* Es vital que el contenedor padre (board) tenga relative o absoluto */
    position: absolute;
    left: 0; 
    top: 0;
    
    /* Tamaño fijo de cuadrícula */
    width: 50px;
    height: 50px;
    
    border-radius: 9999px; /* Aspecto circular */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
    cursor: pointer;
    
    /* Bloqueo comportamientos default del navegador/móvil */
    touch-action: none;   
    user-select: none;    
    
    /* Micro-animación en transición para que el "snap" se vea natural */
    transition: transform 0.15s ease-out;
  }
  
  /* Cuando estamos arrastrando cancelamos la transición para máxima fluidez */
  .token:active {
    transition: none;
    z-index: 10;
  }
</style>
