<script lang="ts">
  import { onMount } from 'svelte';

  let loaded = false;
  let imageSrc = 'https://placehold.co/500x500';
  export let id: number;
  export let imageAlt: string;

  function fetchCoffeeImage() {
    return fetch(`https://loremflickr.com/500/500/coffee_bean?lock=${id}`)
      .then((response) => response.blob())
      .then((parsedBlob) => {
        loaded = true;
        imageSrc = URL.createObjectURL(parsedBlob);
      })
      .catch((error) => console.error(error));
  }

  onMount(() => fetchCoffeeImage());
</script>

<img class="image" src={imageSrc} alt={loaded ? imageAlt : 'coffee placeholder'} />

<style lang="less">
  @import './style.less';
</style>
