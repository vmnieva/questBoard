# QuestBoard 🎲

QuestBoard es una aplicación web *móvil-first* diseñada para ayudar a un Game Master (Director de Juego) a crear y gestionar tableros y fichas de personaje para partidas de rol rápidas (one-shots) con la mínima fricción posible.

## 🎯 Características Principales

- **Fricción cero**: Sin registro, sin servidores ni bases de datos. Todo ocurre en tu navegador.
- **Mobile-First**: Pensado y optimizado para ser usado en dispositivos móviles de manera táctil durante la partida.
- **Rápido y Fluido**: Animaciones a 60fps usando transformaciones CSS nativas y `PointerEvents` para el arrastre de elementos.
- **Persistencia Local**: Tu tablero, fichas y estado se guardan automáticamente en el `localStorage` de tu dispositivo.
- **Multi-idioma**: Soporte para inglés y español (i18n ligero nativo en Svelte 5).

## 🛠️ Stack Tecnológico

- **Framework**: [SvelteKit 2](https://kit.svelte.dev/) con [Svelte 5](https://svelte.dev/) (uso extensivo de Runas: `$state`, `$props`, `$derived`).
- **Lenguaje**: JavaScript.
- **Estilos**: Vanilla CSS.

## 🚀 Desarrollo Local

Para ejecutar este proyecto en tu máquina:

1. Instala las dependencias:
   ```sh
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```

3. Abre `http://localhost:5173` en tu navegador. Para usar el tablero directamente navega a `/tablero`.

## 📜 Licencia

Este proyecto está bajo la [Licencia MIT](./LICENSE).
Copyright (c) 2026 Victor Manuel Nieva Sanchez.
