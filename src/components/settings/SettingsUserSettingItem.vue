<template>
    <div>
        <div class="row py-2 mx-4" >
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 form-check">
                <label class="form-check-label h4 w-100" :for="setting.key">{{ setting.displayName }}</label>
            </div>
            <div class="col-lg-6 col-sm-4 form-check">
                <input class="form-check-input mx-1" type="checkbox" :name="setting.key" v-model="checked">
            </div>
        </div>
    </div>
</template>


<script>
import { ErrorsBus } from '../../main'

    export default {
        props: {
            setting: {
                type: Object,
                required: true
            },
        },
        data: function() {
            return {
                checked: this.setting.value
            };
        },
        watch: {
            checked: function(){
                this.setting.value = this.checked
                this.$store.dispatch('setUserSettings', this.setting)
                   .catch(err => ErrorsBus.errorHandler(err))
            }
        }
    };
</script>

