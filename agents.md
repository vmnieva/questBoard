# 🤖 AGENT.md — QuestBoard

## 🎯 Objetivo del proyecto
QuestBoard es una aplicación web móvil-first para ayudar a un Game Master a crear y gestionar tableros y fichas de personaje para partidas rápidas (one-shots) de rol.

El foco principal es:
- Rapidez de uso y nula fricción (sin login)
- Simplicidad extrema y rendimiento a 60fps
- Uso optimizado para smartphone (táctil)
- Sin backend (MVP)
- Persistencia exclusiva en localStorage

## 🛑 Restricciones Importantes
- NO usar backend ni bases de datos externas.
- NO usar APIs externas ni WebSockets.
- NO usar librerías pesadas (ej: interact.js, librerías complejas de drag&drop).
- NO sobreingeniería ni abstracciones prematuras.
- NO añadir funcionalidades fuera del MVP sin justificar y consultar primero.
- NO usar TypeScript (mantener en JavaScript puro).
- SIEMPRE usar Svelte 5 (Runas: `$state`, `$props`, `$derived`). Nada de sintaxis legacy de Svelte 4.

## 🛠️ Stack Técnico
- Framework: SvelteKit 2 + Svelte 5 + Vite
- Lenguaje: JavaScript
- Estilos: CSS puro (flexbox, grid, variables CSS, sin Tailwind inicialmente)
- Interacciones: API nativa de `PointerEvents` para drag & drop
- Persistencia: API nativa de `localStorage`
- Exportación: `html2canvas` (o similar, solo cuando se aborde la feature de exportación a imagen)

## 🏗️ Arquitectura del Proyecto
src/
  lib/
    components/
      board/       # Componentes visuales e interactivos del mapa (Board, Token)
      characters/  # Fichas de personaje (micro-fichas)
      ui/          # Componentes reutilizables (Botones, Menús, Modales)
    services/      # Lógica de negocio y persistencia (storageService)
    stores/        # Estado global reactivo con Svelte 5 (boardState.svelte.js)
    utils/         # Funciones auxiliares puras (uuid, matemáticas)
    styles/        # Estilos globales (global.css)
  routes/          # Vistas principales (Página única para el MVP)

## 💾 Modelo de Datos Global (MVP)
Toda la lógica reactiva y los datos que deben persistir viven en `src/lib/stores/boardState.svelte.js`.
{
  activeMapId: "string", // ID del mapa actual
  tokens: [
    {
      id: "string",      // UUID
      label: "string",   // Iniciales (ej: "P1")
      color: "string",   // Hex color (ej: "#3b82f6")
      x: number,         // Coordenada absoluta X
      y: number          // Coordenada absoluta Y
    }
  ]
}

## 📱 UX Guidelines
- **Mobile-first SIEMPRE**: Asumir pantalla vertical táctil.
- **Botones y Touch Targets**: Grandes (mínimo 44x44px) y accesibles.
- **Interacciones simples**: Tap para seleccionar, hold & drag para mover.
- **Scroll & Zoom**: Bloquear comportamientos nativos no deseados al arrastrar (`touch-action: none`).
- Evitar menús complejos o anidados.
- Footer fijo como menú de acciones principales.
- No depender de efectos `hover` (no existen en móvil).

## 📝 Reglas de Implementación para la IA
- **Componentes pequeños**: Un archivo, un propósito.
- **Estado Global vs Local**: Usar `stores/` para datos que deben persistir (posiciones, fichas). Usar estado local (`$state` en el componente) para UI efímera (ej: `isDragging`).
- **Persistencia**: Todo cambio en el `boardState` debe sincronizarse con `localStorage`.
- **Rendimiento Visual**: Usar transformaciones CSS (`transform: translate3d`) en lugar de mutar `top/left` para animaciones y movimiento.

## ⚔️ Filosofía del Proyecto
**NO ES:**
- Un Virtual Tabletop (VTT) completo.
- Un clon de Roll20 o Foundry.
- Un motor que calcule reglas, tiradas de dados automáticas o línea de visión (LoS).

**SÍ ES:**
- Una pizarra blanca digital de respuesta inmediata para el máster.
- Una app usable en una mesa de bar con una mano.
- Un MVP funcional, directo y sin tiempos de carga.

## 🗺️ Roadmap de Producto
1. **Fase 1 (MVP CORE):** Tablero editable cuadriculado, Drag & Drop nativo, Guardado local automático.
2. **Fase 2 (MVP+):** Fichas de personaje "micro" (HP, Nombre, CA), Menú para añadir/eliminar tokens.
3. **Fase 3 (Beta):** Exportación a PNG/PDF, Múltiples escenarios/mapas guardados.

## 🤖 Comportamiento Esperado del Agente (Instrucciones operativas)
- **Lee antes de escribir:** Revisa siempre `boardState.svelte.js` y el componente relevante antes de proponer código nuevo.
- **Cambios atómicos:** Realiza cambios pequeños, progresivos y testeables.
- **No rompas nada:** Asegúrate de que tu código no rompe la funcionalidad existente de arrastre táctil ni la reactividad.
- **Comunícate:** Explica brevemente el "por qué" de cada cambio arquitectónico antes de implementarlo.
- **Prioriza la simplicidad:** Ante dos soluciones, elige siempre la que requiera menos código y menos abstracción.
