<template>
  <div id="notifications">
    <app-notif-item
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        :countDownToDismiss="countDownToDismiss">
    </app-notif-item>
  </div>
</template>

<script>
import { ErrorsBus } from '../../main'
import NotificationItem from './NotificationsItem.vue'

export default {
    components: {
        'app-notif-item': NotificationItem
    },
    data() {
        return {
            messages: [],
            countDownToDismiss: 10,
            tInterval: false
        };
    },
    created: function() {
        ErrorsBus.$on('errorEvent', (message) => {
            this.messages.push(message)
        })
        // Didn't work because not every component hit a countdown of 0. See Notification Item.
        // ErrorsBus.$on('deleteMessage', () => {
        //     this.messages.pop()
        // }),
    },
    watch: {
        messages: function() {
            // Destroys NotificationItem components / cleans up messages queue
            if (this.messages.length > 0) {
                if (!this.tInterval) {
                    this.tInterval = setInterval(() => {
                       this.messages.pop()
                    }, this.countDownToDismiss * 1000 + 2000)
                }
            } else {
                clearInterval(this.tInterval);
                this.tInterval = false;
            }
        }
    }
};
</script>

<style scoped>
    #notifications {
        position: fixed;
        top: 75px;
        right: 15px
    }
</style>
