<template>
    <div>
        <table class="table w-75 mx-auto" @blur="onChanged" @change="onChanged">
            <thead>
                <tr>
                    <th id="category-column"     class="w-sm-5 w-md-10 w-lg-20 w-xl-20" scope="col">Category</th>
                    <th id="date-column"         class="w-sm-5 w-md-10 w-lg-10 w-xl-10" scope="col">Date</th>
                    <th id="description-column"  class="w-sm-10 w-md-40 w-lg-40 w-xl-40 text-center" scope="col">Description</th>
                    <th id="starttime-column"    class="w-sm-3 w-md-5 w-lg-10 w-xl-10 text-center" scope="col">Start Time</th>
                    <th id="totaltime-column"    class="w-sm-3 w-md-5 w-lg-10 w-xl-10 text-center" scope="col">Total Time &nbsp;(mins)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in orderedTable" :key="entry.entry_id">
                    <td>
                        <select
                            class="custom-select w-100"
                            :data-entryid="entry.entry_id"
                            data-cat="category_id"
                            >
                            <option
                                v-for="(categoryItem, index) in projectCategories"
                                :selected="entry.category_id == categoryItem.category_id ? 'selected' : null"
                                :value="categoryItem.category_id" :key="index"
                                >{{ categoryItem.category_name}}</option>
                        </select>
                    </td>
                    <td
                        class="text-center"
                        :data-entry_id="entry.entry_id"
                        data-cat="entry_date">{{ entry.entry_date }}</td>
                    <td>
                        <textarea
                            class="w-100 bg-transparent"
                            :data-entry_id="entry.entry_id"
                            data-cat="entry_description"
                            :value="entry.entry_description"
                            >
                        </textarea>
                    </td>
                    <td
                        class="text-center"
                        :data-entry_id="entry.entry_id" data-cat="start_time">{{ entry.start_time }}</td>
                    <td
                        class="text-center"
                        :data-entry_id="entry.entry_id">{{ entry.total_time }}</td>
                </tr>
            </tbody>
        </table>
        <!-- <p v-for="entry in orderedTable">{{entry.entry_date}}</p> -->
    </div>
</template>

<script>
    import Entry from './Entry.vue'
    import { MainBus } from '../../main'

    export default {
        props: ['selectedProject', 'projectCategories'],
        components: {
            'app-entry': Entry
        },
        computed: {
            orderedTable: function(){
                var orderedEntries = [];

                Object.keys(this.selectedProject.entries).reverse().forEach(element => {
                    orderedEntries.push(this.selectedProject.entries[element]);
                    // console.log(element);
                    // console.log(this.selectedProject.entries[element]);
                });
                // console.log(orderedEntries)
                return orderedEntries;
            }
        },
        methods: {
            onChanged: function(event) {
                console.log(event)
                // this.$store.dispatch('updateEntry', event)
                //     .catch(err => {
                //         console.log(err)
                //     })
                this.$store.dispatch('newEntry')
            }
        },
        created: function() {
            // This is when a new entry is made
            MainBus.$on('startTimer', () => {
                // Send dispatch to store
                this.$store.dispatch('newEntry')
                    .then(res => {
                        // Push new entry object to selected project with entry id received from db
                    })
                    .catch(err => console.log(err))
            });

            // This is when an entry is closed.
            MainBus.$on('stopTimer', () => {
                // Add total time to last entry
                var time = new Date()

                // This is wholly unnecessay since objects are passed by reference.
                // var keysArray = Object.keys(this.selectedProject.entries)
                // var entry = this.selectedProject.entries[keysArray[keysArray.length-1]]

                // Send dispatch to store
                this.$store.dispatch('updateEntry', entry)
            });
        }
    }
</script>

