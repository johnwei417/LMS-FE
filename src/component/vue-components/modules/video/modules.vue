<template>
  <div class="container-fluid" style="padding:0px; margin:0px;">
    <div class="bg-blue col-md-12" style="width: 100%; padding-bottom: 45px; margin-bottom: 33px;">
        <h1 style="margin-top: 50px; margin-left: 25px;line-height: 0.8em;">
            <strong style="font-size: 40px;">Video Module</strong><br/>
            <small class="lead" style="color:black;">Math is fun</small>
        </h1>
    </div>
    <div class="col-md-12">
        <!-- Video -->
        <div class="row" v-if="showVideo">
            <div style="max-width:1000px;" class="centered">
                <video width="1000" controls @ended="checkState()" :autoplay="autoplay" :key="videoSrc">
                    <source :src="videoSrc" type="video/mp4" >
                </video>
                <!--<button v-if="showNext" @click="nextVideo">NEXT</button>-->
            </div>
        </div>
        <!-- Quiz -->
        <div class="row" v-if="showAssesment">
            <div class="text-center">
                <h3>{{title}}</h3>
                <div v-for="(question, num) in body" :key="num">
                    <h4>{{question.question}}</h4>
                    <div v-for="(item, index) in question.selection" :key="index">
                        <input type="radio" v-model="studentAnswers[num]" :value="item.display">{{item.display}}
                    </div>
                </div>
                <button style="padding-top: 10px;" @click="checkAnswer()">Submit</button>
            </div>
        </div>
        <!-- End -->
        <div class="row" v-if="showEnd">
            <div class="text-center">
                <h2>THE END</h2>
                <h4>Total Score: 100%</h4>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import VIDEO_QUIZ_COMPONENT from './video_quiz_src.json'

  export default {
    data () {
        return {
            videoSrc: null,
            title: null,
            body: null,
            progressCount: 0,
            showVideo: process.env.WEBPACK_ENV,
            showAssesment: false,
            autoplay: false,
            showNext: false,
            showEnd: false,
            studentAnswers: [],
            video_quiz: VIDEO_QUIZ_COMPONENT.videos
        }
    },
    created () {
        this.videoSrc = process.env.WEBPACK_ENV ? '' : this.video_quiz[this.progressCount].src
        this.title = this.video_quiz[this.progressCount].title
    },
    methods: {
        checkAnswer(){
            console.log(this.studentAnswers)
            console.log(this.body)
            // assume correct at first
            let correctStatus = true

            // check every questions
            for(let i = 0; i < this.body.length; i++) {
                if (this.studentAnswers[i] != this.body[i].answer) {
                    correctStatus = false
                }
            }

            // if any one got wrong, play video and redo quiz
            if (correctStatus) {
                this.progressCount += 1
            } else {
                this.progressCount += 2
            }
            
            this.nextVideo()
        },
        checkState(){
            if (this.progressCount == 8) {
                // end module
                this.showVideo = false
                this.autoplay = false
                this.showEnd = true

            } else if (this.progressCount == 2 || this.progressCount == 6) {
                // show video
                this.progressCount += 2
                this.nextVideo()
            } else {
                if (this.progressCount == 3 || this.progressCount == 7) {
                    // repeat previous quiz again 
                    this.progressCount -= 2
                } else {
                    // progress next 
                    this.progressCount++
                }

                // show quiz
                this.title = this.video_quiz[this.progressCount].title
                this.body = JSON.parse(this.video_quiz[this.progressCount].body).quiz
                this.showVideo = false
                this.showAssesment = true
            }

        },
        nextVideo() {
            this.videoSrc = this.video_quiz[this.progressCount].src
            this.title = this.video_quiz[this.progressCount].title
            this.showAssesment = false
            this.showVideo = true
            this.autoplay = true
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
    background-color: #5DBCD2;
}
</style>