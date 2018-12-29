<template>
    <div>
        <table class="table w-xl-75 w-lg-100 w-md-100 mx-auto" @change="onChanged">
            <thead>
                <tr>
                    <th id="category-column"     class="w-sm-5 w-md-20 w-lg-20 w-xl-20" scope="col">Category</th>
                    <th id="date-column"         class="w-sm-5 w-md-10 w-lg-10 w-xl-10 d-none d-sm-table-cell" scope="col">Date</th>
                    <th id="description-column"  class="w-sm-10 w-md-40 w-lg-40 w-xl-40 text-center" scope="col">Description</th>
                    <th id="starttime-column"    class="w-sm-3 w-md-5 w-lg-10 w-xl-10 text-center" scope="col">Start Time</th>
                    <th id="endtime-column"    class="w-sm-3 w-md-5 w-lg-10 w-xl-10 text-center d-none d-sm-table-cell" scope="col" v-if="displayEndTime">End Time</th>
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
                var reKeyedSelectedProject = {}
                var startTimes = []
                var entries = this.selectedProject.entries
                // Create new object where keys are the datestrings, ie replace the entry id with datestring
                for (var entry in entries) {
                    reKeyedSelectedProject[entries[entry].start_time] = entries[entry]
                    startTimes.push(entries[entry].start_time)
                }
                // Create a new array from the keys, then use the sorting mechanism to create the sorted array
                startTimes.sort(function(a, b) {
                    var date1 = new Date(a);
                    var date2 = new Date(b);

                    return a > b ? -1 : a < b ? 1 : 0;
                })

                var dateOrderedEntries = []
                startTimes.forEach(startTime => {
                    dateOrderedEntries.push(reKeyedSelectedProject[startTime])
                })

                return dateOrderedEntries;
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

