<template>
  <div class="container-fluid" style="padding:0px;">
    <div class="bg-blue col-md-12" style="width: 100%; padding-bottom: 20px; margin-bottom: 33px;">
        <h1 style="padding-top: 20px; margin-left: 25px;line-height: 0.8em;">
            <strong style="font-size: 40px;">Game Module</strong><br/>
            <small class="lead" style="color:black;">Pizza Slicer</small>
        </h1>
    </div>
    <div id="phaserID">
    </div>
  </div>
</template>

<script>
import phaser from './src/phaser.min.js'
import pizza from './src/pizza.js'
import axios from 'axios'

  export default {
    data () {
        return {
          current: false,
          account: JSON.parse(window.localStorage.getItem('userInfo'))
        }
    },
    created () {
    },
    mounted () {
      this.updateStatus()
    },
    methods: {
      updateStatus () {
        // update status to in progress
        axios.put(`https://laravel-lsm.herokuapp.com/api/v1/${this.account.id}/tasks/3`, "", {
          headers: {
            'Authorization': `Bearer ${this.account.api_token}`,
            'Content-type': 'application/json'
          }
        }).then(response => {
          console.log(response.data.code)
        })
      }
    }
  }
</script>

<style>
.centered{
    margin-left:auto;
    margin-right:auto;
}
.bg-blue{
    background-color: #02D0FF;
}
</style>