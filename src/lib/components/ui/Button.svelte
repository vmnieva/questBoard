<button class="button">
  <slot />
</button>

<style>
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    background: #2563eb;
    color: #f8fafc;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .button:hover {
    background: #1d4ed8;
  }

  .button:active {
    background: #1e40af;
  }
</style>
