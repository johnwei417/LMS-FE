<template>
  <div class="container">
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
            <button @click="checkAnswer()">Submit</button>
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
            showVideo: true,
            showAssesment: false,
            autoplay: false,
            showNext: false,
            showVideo2: false,
            showEnd: false,
            studentAnswers: [],
            video_quiz: VIDEO_QUIZ_COMPONENT.videos
        }
    },
    created () {
        this.videoSrc = this.video_quiz[this.progressCount].src
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
</style>