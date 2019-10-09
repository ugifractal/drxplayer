<template>
  <div>
    loading reader..
    <input type="file" @change="readFile($event)"><br/>
    <div v-if="loaded">            
      <table class="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>PID</th>
            <th>Value</th>
            <th>Desc</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" v-bind:key="record.time">
            <td>{{record.time}}</td>
            <td>{{record.pid}}</td>
            <td>{{record.value}}</td>
            <td>{{getDesc(record.pid)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      fileContent: "",
      loaded: false,
      records: []
    }
  },
  methods: {
    getDesc: function(pid){
      return window.pidMap[pid]
    },
    readFile: function(event){
      let self = this
      let reader = new FileReader()
      console.log(event.currentTarget.files[0])
      reader.onload = function(){
        //console.log(reader.result)
        self.fileContent = reader.result
        self.loaded = true
        let rows = self.fileContent.split("\r")
        self.records.splice(0, self.records.length)
        for (let i=0; i<rows.length;i++){          
          let segments = rows[i].split(",")
          let record = {time: segments[0], pid: segments[1], value: segments[2]}
          self.records.push(record)
        }        
      }
      reader.readAsBinaryString(event.currentTarget.files[0])
    }
  }
}
</script>