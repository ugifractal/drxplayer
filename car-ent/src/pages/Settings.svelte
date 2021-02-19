<script>
  
  import * as Api from '../apis/http'
  let value = 21

  
  
  async function increaseBrightness(){
    value++
    await Api.brightnessSet(value)
  }

  async function decreaseBrightness(){
    value--
    await Api.brightnessSet(value)
  }

  async function fetchBrightness(){    
    let response = await Api.brightnessGet()
    let json = await response.json()
    value = json.brightness
  }

  fetchBrightness()

</script>

<div class="p-6 text-3xl text-center text-yellow-400">
    {value}
</div>
<div class="text-center text-yellow-500">
  <button class="bg-yellow-900 w-2/12 h-12" on:click={decreaseBrightness}>-</button>
  <button class="bg-yellow-900 w-2/12 h-12" on:click={increaseBrightness}><span class="text-xs">+</span></button>
</div>