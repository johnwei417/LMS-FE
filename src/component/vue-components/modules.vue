<template>
  <div class="container">
    <!-- Video -->
    <div class="row" v-if="showVideo">
        <div style="max-width:1000px;" class="centered">
            <video width="1000" controls @ended="toAssesment()" :autoplay="autoplay" :key="part">
                <source :src="videoSrc" type="video/mp4" >
            </video>
            <button v-if="showNext" @click="nextVideo()">NEXT</button>
        </div>
    </div>
    <!-- Quiz -->
    <div class="row" v-if="showAssesment">
        <div class="text-center"> 
            <p>{{assesment}}</p>
            <button @click="toVideo(1)">GOT IT RIGHT</button>
            <button @click="toVideo(0)">GOT IT WRONG</button>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
        return {
            videoSrc: '/src/resources/Blackmer1.mp4',
            assesmentCount: 0,
            assesment: 'FIRST ASSESMENT',
            showVideo: true,
            showAssesment: false,
            currentStatus: false,
            autoplay: false,
            showStatusVideo: false,
            showNext: false,
            part: 0,
            showVideo2: false
        }
    },
    methods: {
        toAssesment(){
            if (!this.currentStatus) {
                this.showVideo = false
                this.showAssesment = true
            } else {
                console.log('go it right!')
                this.showNext = true
            }
        },
        toVideo(status){
            this.autoplay = true
            if (status) {
                this.currentStatus = true
                // got right
                this.videoSrc = '/src/resources/Blackmer2.mp4'
                this.assesment = 'Which fraction represents half of a candy bar: a) 1/1, b) 1/2, c) 2/1, or d) 2/2.'
            } else {
                this.currentStatus = false
                // got wrong
                this.assesment = 'Alternative slide #2'
                this.videoSrc = '/src/resources/Blackmer3.mp4'
            }
            this.showVideo = true
            this.showAssesment = false
        },
        nextVideo () {
            this.currentStatus = false
            this.videoSrc = '/src/resources/Blackmer4.mp4'
            this.showNext = false
            this.part++
            console.log('NEXT')
        }
    }
  }
</script>

<style>
.centered{
    margin-left:auto;
    margin-right:auto;
}
</style>