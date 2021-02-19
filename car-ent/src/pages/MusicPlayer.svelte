<script>
  import * as Api from '../apis/http'
  import { onMount } from 'svelte';
  let musics = []

  let currentSongIndex = 0;
  let player;
  let songUrl;

  function test(){
    alert('done')
  }

  onMount(()=> {
    player = document.getElementById('player')
    
  })

  async function fetchMusics(){    
    let response = await Api.musicList()
    let json = await response.json()

    musics = json.files
  }
  function filename(url){
    if (url){
      return url.split("/").pop()
    }
    return ""
  }

  function playMusic(index){
    currentSongIndex = index
    songUrl = `http://localhost:8000/musics/${currentSongIndex}`
    player.src = songUrl
  }

  function playNext(){
    currentSongIndex++
    if (currentSongIndex >= musics.length){
      currentSongIndex = 0
    }
    playMusic(currentSongIndex)
  }

  function timeUpdate(e){
    
  }

  fetchMusics()
  
  
</script>
<div class="mt-7"/>
{#each musics as music,i}
<div class="text-center  text-yellow-400 text-red-300 border-b-4 border-yellow-800 h-16 text-xl align-middle pt-3" on:click={() => playMusic(i)}>
  {#if i == currentSongIndex}
    <span class="text-yellow-100">{filename(music)}</span>
  {:else}
    {filename(music)}
  {/if}
</div>
{/each}
<audio controls autoplay id="player"  on:ended={playNext} on:timeupdate={timeUpdate} class="hidden">
  <source  src="{songUrl}">
</audio>