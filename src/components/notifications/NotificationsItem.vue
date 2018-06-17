<template>
    <div>
        <b-alert
            :show="dismissCountDown"
            fade
            dismissible
            variant="danger"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            <p>{{ message.title }}: {{ message.message }}</p>
        </b-alert>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'

    export default {
        props: {
            message: {
                type: Object,
                required: true,
            },
            countDownToDismiss: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                dismissSecs: this.countDownToDismiss,
                dismissCountDown: this.countDownToDismiss,
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            }
        },
        // Didn't work. Not every instance hit countdown of 0. Not sure if issue with Vue watch or way BSVue works.
        // watch: {
        //     dismissCountDown: function() {
        //         console.log(this.dismissCountDown)
        //         if (!this.dismissCountDown) {
        //             console.log("Completed count down detected")
        //             // emit event to delete component
        //             ErrorsBus.$emit('deleteMessage')
        //         }
        //     }
        // }
        watch: {
            message: function() {
                if (!this.message.type || !this.message.title || !this.message.message) {
                    throw new Error("Custom error object does not match format.");
                    return;
                }
            }
        }
    }
</script>

