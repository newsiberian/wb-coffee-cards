<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { coffeeStore, loadingStore } from './store/coffee';
  import Layout from './components/Layout/index.svelte';
  import ButtonLayout from './components/ButtonLayout/index.svelte';
  import Card from './components/Card/index.svelte';
  import Button from './components/Button/index.svelte';

  let buttonEl: HTMLButtonElement;
  let seconds = 0;
  const DURATION = 30;

  const timerId = setInterval(() => {
    if (seconds >= DURATION) {
      coffeeStore.getCoffeeKind();
      seconds = 0;
    } else {
      seconds++;
    }
  }, 1000);

  onMount(coffeeStore.getCoffeeKind);

  onDestroy(() => clearInterval(timerId));

  const handleClick = () => {
    loadingStore.update(() => true);
    coffeeStore.getCoffeeKind().finally(() => {
      loadingStore.update(() => false);
      seconds = 0;
      // we must wait until the button is moved to a new position
      requestAnimationFrame(() => {
        buttonEl.scrollIntoView({ behavior: 'smooth' });
      });
    });
  };
</script>

<Layout>
  {#each $coffeeStore as coffee (coffee.id)}
    <Card {...coffee} />
  {/each}

  <ButtonLayout>
    <Button bind:ref={buttonEl} on:click={handleClick} />
  </ButtonLayout>
</Layout>
