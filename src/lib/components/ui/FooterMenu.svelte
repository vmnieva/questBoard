<footer class="footer-menu">
  <slot />
</footer>

<style>
  .footer-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid #e2e8f0;
    box-shadow: 0 -4px 12px rgba(15, 23, 42, 0.08);
  }
</style>
