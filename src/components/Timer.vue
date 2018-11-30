<template>
    <div>
        <!-- TIMER -->
        <p class="text-center display-4">Timer</p>
        <p id="timer" class="text-center display-3">{{ timer.hour }}:{{ timer.minute }}:{{ timer.second }}</p>
    </div>
</template>

<script>
    import { TimerBus } from '../main'

    export default {
        computed: {
            timer: function() {
                return TimerBus.getTimerData();
            }
        },
        created: function() {
            TimerBus.$on('startTimer', () => {
                TimerBus.startTimer();
            });

            TimerBus.$on('stopTimer', () => {
                TimerBus.$emit('TimerData', TimerBus.timer)
                TimerBus.stopTimer();
            });

            TimerBus.$on('resetTimer', () => {
                TimerBus.resetTimer();
            });
        }
    }
</script>