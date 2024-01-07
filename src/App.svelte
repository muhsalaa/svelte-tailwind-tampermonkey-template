<script lang="ts">
  let count = 0;
  function increment() {
    count++;
  }
</script>

<main class="h-screen w-screen flex flex-col items-center justify-center">
  <h1 class="font-bold text-2xl mb-4">Tamper Monkey Svelte Template</h1>
  <button
    class="bg-green-600 text-white px-4 py-2 rounded-xl"
    on:click={increment}>Clicked {count} time{count > 1 ? "s" : ""}</button
  >
</main>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
