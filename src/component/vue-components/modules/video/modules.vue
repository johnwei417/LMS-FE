<template>
  <div class="container-fluid" style="padding:0px; margin:0px;">
    <div class="bg-blue col-md-12" style="width: 100%; padding-bottom: 20px; margin-bottom: 33px;">
        <h1 style="padding-top: 20px; margin-left: 25px;line-height: 0.8em;">
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
            <div class="text-center" style="margin-left:auto; margin-right: auto;">
                <h3>{{title}}</h3>
                <div v-for="(question, num) in body" :key="num" class="text-left" style="margin-top: 10px;">
                    <h4>{{question.question}}</h4>
                    <div v-for="(item, index) in question.selection" :key="index" >
                        <input type="radio" v-model="studentAnswers[num]" :value="item.display" style="margin-right: 5px;">
                        {{item.display}}
                    </div>
                </div>
                <button style="margin-top: 25px;" @click="checkAnswer()">Submit</button>
            </div>
        </div>
        <!-- End -->
        <div class="row" v-if="showEnd">
            <div class="text-center">
                <h2>THE END</h2>
                <h4>Total Score: {{overallScore}}%</h4>
            </div>
            <div class="text-center">
                <button @click="goHome">HOME</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import VIDEO_QUIZ_COMPONENT from './video_quiz_src.json'
import DEV_VIDEO_QUIZ_COMPONENT from './dev_video_quiz_src.json'
import axios from 'axios'

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
            showEnd: false,
            studentAnswers: [],
            recordedAnswers: [],
            recordedCount: 0,
            video_quiz: process.env.NODE_ENV == 'development' ? DEV_VIDEO_QUIZ_COMPONENT.videos : VIDEO_QUIZ_COMPONENT.videos,
            quizScore: 0,
            overallScore: 100,
            account: JSON.parse(window.localStorage.getItem('userInfo'))
        }
    },
    created () {
        this.videoSrc = this.video_quiz[this.progressCount].src
        this.title = this.video_quiz[this.progressCount].title
    },
    methods: {
        goHome () {
          window.location.href= '/'
        },
        checkAnswer(){
            // assume correct at first
            let correctStatus = true

            // check every questions for wrong
            for(let i = 0; i < this.body.length; i++) {

                // record user answers
                if (this.recordedAnswers[this.recordedCount] !== null) {
                    console.log('student answers: ' + this.studentAnswers)
                    this.recordedAnswers[this.recordedCount] = this.studentAnswers[i]
                    console.log('recorded ' + this.recordedAnswers[this.recordedCount])
                } else {
                    this.recordedAnswers.append(this.studentAnswers[i])
                    console.log('recorded ' + this.recordedAnswers[this.recordedCount])
                }
                this.recordedCount++

                // check user answer
                if (this.studentAnswers[i] != this.body[i].answer) {
                    correctStatus = false
                }
            }

            // if any one got wrong, play video and redo quiz
            if (correctStatus) {
                this.progressCount += 1
                this.quizScore++
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

                // compute quiz score
                this.quizScore = (this.quizScore / 3) * 10

                // set json body to be post
                let info = {
                    "scoreInfo":{
                        "score": this.overallScore,
                        "class_id": "1",
                        "records": {
                            "quiz_score": this.quizScore,
                            "student_answers": [
                            {
                                "question_id": 1,
                                "answer": this.recordedAnswers[0],
                                "correct_answer": "C",
                            },
                            {
                                "question_id": 2,
                                "answer": this.recordedAnswers[1],
                                "correct_answer": "1/2"
                            },
                            {
                                "question_id": 3,
                                "answer": this.recordedAnswers[2],
                                "correct_answer": "1/1"
                            }
                            ]
                        }
                    }
                }
                
                // post scores
                axios.post(`https://laravel-lsm.herokuapp.com/api/v1/${this.account.id}/score/1`, JSON.stringify(info), {
                    headers: {
                        'Authorization': `Bearer ${this.account.api_token}`,
                        'Content-type': 'application/json'
                    }
                }).then(response => {
                    console.log(response.data.code)
                })

            } else if (this.progressCount == 2 || this.progressCount == 6) {
                // update status to in progress
                axios.put(`https://laravel-lsm.herokuapp.com/api/v1/${this.account.id}/tasks/1`, '', {
                    headers: {
                        'Authorization': `Bearer ${this.account.api_token}`,
                        'Content-type': 'application/json'
                    }
                }).then(response => {
                    console.log(response.data.code)
                })
                // show video
                this.progressCount += 2
                this.nextVideo()
            } else {
                if (this.progressCount == 3 || this.progressCount == 7) {

                    // overwrite previous recorded answers
                    if (this.progressCount == 3) {
                        this.recordedCount--
                    } else if (this.progressCount == 7) {
                        this.recordedCount -= 2
                    }

                    // repeat previous quiz again 
                    this.progressCount -= 2
                    this.overallScore -= 5

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
    background-color: #02D0FF;
}
</style>