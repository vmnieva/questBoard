<script>
  import { resolve } from '$app/paths';
</script>

<main class="container home">
  <h1>QuestBoard</h1>
  <p>Prueba el editor del tablero desde la ruta dedicada.</p>

  <a class="cta" href={resolve('/tablero')}>Ir al editor</a>
</main>

<style>
  .home {
    display: grid;
    gap: 1rem;
    justify-items: start;
    padding-block: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    color: #334155;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    background: #2563eb;
    color: #f8fafc;
    font-weight: 600;
    transition: background 0.2s ease;
  }

  .cta:hover {
    background: #1d4ed8;
  }
</style>
