<script lang="ts">
  import { loadingStore } from '../../store/coffee';

  export let ref: HTMLButtonElement;
</script>

<button class="fab-button" bind:this={ref} on:click disabled={$loadingStore}>
  {#if $loadingStore}
    <span class="loader" />
  {/if}
  +
</button>

<style lang="less">
  @import './style.less';
</style>
