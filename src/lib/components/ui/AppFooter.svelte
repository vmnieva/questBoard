<script>
  import { environment } from '$lib/config/environment.js';
</script>

<footer class="app-footer">
  <p>{environment.appName} v{environment.version} | &copy; {environment.year} {environment.author}</p>
</footer>

<style>
  .app-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(15, 23, 42, 0.6); /* Slate 900, más oscuro para contrastar */
    z-index: 100; /* Asegurar que se renderice por encima de otros contenedores */
    pointer-events: none; /* No interfiere con clics */
  }
  
  .app-footer p {
    margin: 0;
    /* Un sutil sombreado blanco puede ayudar a leerlo sobre cualquier fondo */
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  }
</style>
