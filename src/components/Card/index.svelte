<script lang="ts">
  import { fade } from 'svelte/transition';
  import Image from '../Image/index.svelte';
  import Note from '../Note/index.svelte';
  import Notes from '../Notes/index.svelte';

  export let id: number;
  export let origin: string;
  export let blend_name: string;
  export let variety: string;
  export let notesList: string[];
  export let intensifier: string;
</script>

<div transition:fade class="card-root">
  <span class="intensifier">{intensifier}</span>

  <Image {id} imageAlt={blend_name} />

  <div class="card-content">
    <span class="origin">{origin}</span>
    <h3>{blend_name}</h3>
    <span>{variety}</span>

    <Notes>
      {#each notesList as note}
        <Note label={note} />
      {/each}
    </Notes>
  </div>
</div>

<style lang="less">
  @import './style.less';
</style>
