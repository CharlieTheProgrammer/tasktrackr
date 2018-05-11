<template>
    <div>
        <h2>This is the Entry Container Component</h2>
        <table class="table">
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
                <tr v-for="(entry, index) in selectedProject.entries" :key="index">
                    <td>
                        <select
                            class="custom-select w-100"
                            :data-entry_id="entry.entry_id"
                            data-cat="category_id"
                            >
                            <option
                                v-for="(categoryItem, index) in projectCategories"
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
                            v-model="entry.entry_description"
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
        <app-entry></app-entry>
        <p v-for="(project, projectID) in projects" :key="projectID" v-if="false">{{ project.project_name }} </p>
    </div>
</template>

<script>
    import Entry from './Entry.vue'

    export default {
        props: ['projects', 'selectedProject'],
        data() {
            return {
                entries: [
                    {
                        entry_id: 3,
                        category_id: "1",
                        entry_date: "11/20/2017",
                        entry_description: "Sample entry",
                        start_time: "10:22 AM",
                        end_time: "11:00 AM",
                        total_time: "130 mins",
                    }
                ],
                projectCategories: [
                    {
                        category_id: "1",
                        category_name: "Testing",
                        hidden: "false"
                    },
                ]
            }
        },
        components: {
            'app-entry': Entry
        }
    }
</script>

