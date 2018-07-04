<template>
    <div class="d-flex justify-content-center w-100">
        <!-- Only one of these buttons should display at a time. This is done through the shared used of the displayMe variable. -->
        <button class="btn btn-info btn-lg btn-block w-75 mx-1" @click="startTimer" v-if="displayme">New Entry</button>
        <button class="btn btn-warning btn-lg btn-block w-75 mx-1" @click="stopTimer" v-else>Log Time</button>
    </div>
</template>

<script>
    import { TimerBus } from '../main'

    export default {
        data: function() {
            return {
                clicked: false
            }
        },
        methods: {
            startTimer: function() {
                if (!this.clicked) {
                    TimerBus.$emit('startTimer');
                    console.log("Start Timer");
                    this.displayme = false;
                    this.clicked = true
                }
            },
            stopTimer: function() {
                TimerBus.$emit('stopTimer');
                console.log("Stop Timer");
                this.displayme = true;
                this.clicked = false;
            },
        },
        computed: {
            displayme: function() {
                var timerData = TimerBus.getTimerData()
                if (timerData.tInterval) {
				    return false
			    } else {
                    return true
                }
            }
        }
    }
</script>


