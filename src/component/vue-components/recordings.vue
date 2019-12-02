<template>
  <div class="container-fluid" style="padding:0px;">
    <div class="bg-blue col-md-12" style="width: 100%; padding-bottom: 20px; margin-bottom: 33px;">
        <h1 style="padding-top: 20px; margin-left: 25px;line-height: 0.8em;">
            <strong style="font-size: 40px;">Student's Answers</strong><br/>
        </h1>
    </div>
    <div class="text-center" style="margin-left:auto; margin-right:auto;" v-if="this.recordings != null">
        <div>
            <h3>Scores: </h3>
            <p v-if="this.recordings.game_score">Game Score: {{this.recordings.game_score}}</p>
            <p v-if="this.recordings.quiz_score">Game Score: {{this.recordings.quiz_score}}</p>
        </div>
        <div v-if="this.recordings.student_answers">
            <h3>Quiz Answers:</h3>
            <div v-for="answer in this.recordings.student_answers" :key="answer.question_id">
                <p>
                    {{answer.question_id + ") "+ answer.answer}}
                    <i class="fa fa-check" aria-hidden="true" v-if="answer.answer == answer.correct_answer"></i>
                    <i class="fa fa-times" aria-hidden="true" v-else>{{answer.correct_answer}}</i>
                </p>
            </div>

        </div>
    </div>
    <div v-else>
        <div class="lds-ring-black centered"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import css from './index.scss'

  export default {
    data () {
        return {
          current: false,
          recordID: window.location.pathname.split('/')[2],
          account: JSON.parse(window.localStorage.getItem('userInfo')),
          record: null,
          recordings: null
        }
    },
    created () {
        this.getRecordings()
    },
    methods: {
        getRecordings () {
            axios.get(`https://laravel-lsm.herokuapp.com/api/v1/${this.account.id}/record/${this.recordID}`, {
                headers: {
                        'Authorization': `Bearer ${this.account.api_token}`,
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
            }).then(response => {
                this.record = response.data.record
                this.recordings = JSON.parse(this.record.details.module_records).records
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