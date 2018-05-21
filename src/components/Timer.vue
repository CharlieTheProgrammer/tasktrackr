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
        data: function() {
            return {
                timer: {
                    hour: '00',
                    minute: '00',
                    second: '00',
                    tInterval: false
                }
            }
        },
        created: function() {
            TimerBus.$on('startTimer', () => {
                this.startTimer();
            });

            TimerBus.$on('stopTimer', () => {
                TimerBus.$emit('TimerData', this.timer)
                this.stopTimer();
            });

            TimerBus.$on('resetTimer', () => {
                this.resetTimer();
            });
        },
        methods: {
            setInterval: function() {
                if (!this.timer.tInterval) {
                    this.timer.tInterval = setInterval(this.startTimer, 1000);
                };
            },
            startTimer: function() {
                this.setInterval();

                this.timer.second++;
                if (this.timer.second >= 60) {
                    this.timer.second = 0;
                    this.timer.minute++;
                    if (this.timer.minute >= 60) {
                        this.timer.minute = 0;
                        this.timer.hour++;
                    }
                };

                this.timer.hour = ("0" + this.timer.hour).slice(-2);
                this.timer.minute = ("0" + this.timer.minute).slice(-2);
                this.timer.second = ("0" + this.timer.second).slice(-2);

                console.log("Timer Started");
            },
            stopTimer: function() {
                clearInterval(this.timer.tInterval);
                this.timer.tInterval = false;

                this.resetTimer();
            },
            resetTimer: function() {
                this.timer = {
                    hour: '00',
                    minute: '00',
                    second: '00'
                }
            }
        }
    }
</script>

