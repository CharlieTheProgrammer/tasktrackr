<template>

        <tr>
            <td>
                <select
                    class="custom-select w-100"
                    :data-entry_id="entry.entry_id"
                    data-cat="category_id"
                    >
                    <option
                        v-for="(categoryItem, index) in projectCategories" :key="index"
                        :selected="entry.category_id == categoryItem.category_id ? 'selected' : null"
                        :value="categoryItem.category_id"
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
                :data-entry_id="entry.entry_id" data-cat="start_time">{{ entry.start_time | toTimeFormat }}
            </td>
            <td
                class="text-center"
                :data-entry_id="entry.entry_id">{{ entry.total_time | generateTotalTime(entry.start_time) }}
            </td>
        </tr>

</template>

<script>
    import { ErrorsBus } from '../../main'

    export default {
        props: {
            entry: {
                type: Object,
                required: true
            },
            projectCategories: {
                type: Object,
                required: true
            }
        },
        data: function() {
            return {
                tt: ""
            }
        },
        watch: {
            'entry.total_time': function(newValue, oldValue) {
                console.log("Change to Total Time detected -- " + this.entry.total_time)
                var fakeEventData = {
                    target: {
                        dataset: {
                            cat: 'total_time',
                            entry_id: this.entry.entry_id
                        },
                        value: this.entry.total_time
                    }
                }

                this.$store.dispatch('updateEntry', fakeEventData)

            }
        },
        filters: {
            toTimeFormat: function(isostring){
                var date = new Date(isostring);
                return date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
            },
            generateTotalTime: function(endTimeinISO, startTimeinISO) {
                var oldDate = new Date(startTimeinISO);
                var newDate = new Date(endTimeinISO);

                var timeDiff = newDate.getTime() - oldDate.getTime();

                if (isNaN(Math.round(timeDiff / 1000 / 60)) || Number(timeDiff) < 0) {
                    return ""
                } else {
                    return Math.round(timeDiff / 1000 / 60)
                }
            }
        }
    }
</script>

