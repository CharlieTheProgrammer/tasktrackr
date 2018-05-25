<template>
  <div id="myalert">
    <!-- <b-alert show>Default Alert</b-alert>

    <b-alert variant="success" dismissible show>Success Alert</b-alert> -->

    <!-- <b-alert variant="danger"
            v-for="(error, index) in errors" :key="index"
             dismissible
             :show="true"
             @dismissed="showDismissibleAlert=false">
      <p>{{error.title }}: {{ error.message }}</p>
    </b-alert> -->

    <b-alert
            v-for="(error, index) in errors" :key="index"
            :show="dismissCountDown"
            fade
            dismissible
            variant="danger"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
      <p>{{ error.title }}: {{ error.message }}</p>
    </b-alert>

    <!-- <b-btn @click="showAlert" variant="info" class="m-1">
      Show alert with count-down timer
    </b-btn> -->
  </div>
</template>

<script>
import { ErrorsBus } from '../../main'

export default {
    props: ['errorObj'],
    data() {
        return {
            dismissSecs: 10,
            dismissCountDown: 10,
            showDismissibleAlert: false,
            errors: []
        };
    },
    created: function() {
        ErrorsBus.$on('errorEvent', (errorObj) => {
                this.errors.push(errorObj)
                this.dismissCountDown = 10;

        });
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown;
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs;
        }
    }
};
</script>

<style scoped>
    #myalert {
        position: fixed;
        top: 75px;
        right: 15px
    }
</style>
