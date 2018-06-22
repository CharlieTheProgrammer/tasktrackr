<template>
    <div>
        <table class="table w-75 mx-auto" @change="onChanged">
            <thead>
                <tr>
                    <th id="category-column"     class="w-sm-5 w-md-10 w-lg-20 w-xl-20" scope="col">Category</th>
                    <th id="date-column"         class="w-sm-5 w-md-10 w-lg-10 w-xl-10" scope="col">Date</th>
                    <th id="description-column"  class="w-sm-10 w-md-40 w-lg-40 w-xl-40 text-center" scope="col">Description</th>
                    <th id="starttime-column"    class="w-sm-3 w-md-5 w-lg-10 w-xl-10 text-center" scope="col">Start Time</th>
                    <th id="endtime-column"    class="w-sm-3 w-md-5 w-lg-10 w-xl-10 text-center" scope="col" v-if="displayEndTime">End Time</th>
                    <th id="totaltime-column"    class="w-sm-3 w-md-5 w-lg-10 w-xl-10 text-center" scope="col">Total Time &nbsp;(mins)</th>
                </tr>
            </thead>
            <tbody>
                <app-entry
                    v-for="entry in orderedTable" :key="entry.entry_id"
                    :entry="entry"
                    :projectCategories="projectCategories"
                    ></app-entry>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { ErrorsBus } from '../../main'
    import Entry from './Entry'

    export default {
        props: {
            selectedProject: {
                type: Object,
                required: true
            },
            projectCategories: {
                type: Object,
                required: true
            }
        },
        components: {
            'app-entry': Entry
        },
        computed: {
            orderedTable: function(){
                var orderedEntries = [];

                Object.keys(this.selectedProject.entries).reverse().forEach(element => {
                    orderedEntries.push(this.selectedProject.entries[element]);
                });

                return orderedEntries;
            },
            displayEndTime: function() {
                var settings = this.$store.getters.userSettings;

                if (settings.displayEndTime.value === true) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            onChanged: function(event) {
                this.$store.dispatch('updateEntry', event)
                    .catch(err => {
                        // What kind of error message is returned here?
                        ErrorsBus.$emit("ErrorEvent", err)
                    })
            }
        }
    }
</script>

