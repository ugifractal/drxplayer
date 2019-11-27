<template>
  <div>
    <a @click="playPrev()" class="ctrl">Prev</a>
    <a @click="pause()" class="ctrl">Stop</a>
    <a @click="playNext()" class="ctrl">Next</a>
    <a @click="cls()" class="ctrl">Close</a>
    <br/>
    <video controls autoplay ref="player" @ended="playNext">
      <source  src="/videos/0">
    </video>
    <ul>
      <li v-for="(file,idx) in files" v-bind:key="file" style="list-style-type:none;">
        <a @click="playIndex(idx)">
          {{file}}
        </a>
        <span v-if="index == idx" style="color:white;">
          &lt;&lt;&lt;
        </span>
      </li>
    </ul>
    

    
  </div>
  
</template>

<script>
export default {
  mounted(){
    let self = this
    let audio;
    window.store.fetchGet("/videos", function(data){
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

      player.src = ("/videos/" + this.index)
      //player.play()
    },
    playPrev(){
      this.index--
      if (this.index < 0){
        this.index = this.files.length - 1
      }
      let player = this.$refs.player
      console.log(player.src)

      player.src = ("/videos/" + this.index)
      //player.play()
    },
    pause(){
      let player = this.$refs.player
      player.src = ""
    },
    playIndex(index){
      this.index = index
      let player = this.$refs.player
      player.src = ("/videos/" + this.index)
    },
    cls(){
      window.close()
    }  
  }
}
</script>

<style scoped>
  a.ctrl{
    color: white;
    border: 1px solid #333;
    font-size: 30pt;
    padding-left: 20px;
    padding-right: 20px;
  }
  
</style>