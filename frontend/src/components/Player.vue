<template>
  <div>
    <a @click="playPrev()" class="ctrl">Prev</a>
    <a @click="pause()" class="ctrl">Stop</a>
    <a @click="playNext()" class="ctrl">Next</a>
    <ul>
      <li v-for="(file,index) in files" v-bind:key="file">
        <a @click="playIndex(index)">
          {{file}}
        </a>
      </li>
    </ul>
    <audio controls autoplay ref="player" style="display: none;" @ended="playNext">
      <source  src="/musics/0">
    </audio>

    
  </div>
  
</template>

<script>
export default {
  mounted(){
    let self = this
    let audio;
    window.store.fetchGet("/musics", function(data){
      console.log(data)
      self.files.splice(0, self.files.length)
      for (let i=0; i<data.files.length;i++){
        self.files.push(data.files[i])
      }            
    })
    
  },
  data: function(){
    return {
      files: [],
      index: 0
    }
  },
  methods: {
    playNext(){
      this.index++
      if (this.index == this.files.length){
        this.index = 0
      }
      let player = this.$refs.player
      console.log(player.src)

      player.src = ("/musics/" + this.index)
      //player.play()
    },
    playPrev(){
      this.index--
      if (this.index < 0){
        this.index = this.files.length - 1
      }
      let player = this.$refs.player
      console.log(player.src)

      player.src = ("/musics/" + this.index)
      //player.play()
    },
    pause(){
      let player = this.$refs.player
      player.src = ""
    },
    playIndex(index){
      this.index = index
      let player = this.$refs.player
      player.src = ("/musics/" + this.index)
    }  
  }
}
</script>

<style scoped>
  a.ctrl{
    color: white;
    border: 1px solid green;
    font-size: 30pt;
  }
  
</style>