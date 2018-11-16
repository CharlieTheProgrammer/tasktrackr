<template>
    <div class="container-fluid">
        <div class="row">
            <p class="text-center display-2">At a glance</p>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4">Time JUST Today</p>
                <p class="text-center display-4">{{ times.totalTimeTodayForAllProjects }}</p>
            </div>
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4">Time Today on Current Project</p>
                <p class="text-center display-4">{{ times.totalTimeTodayForSelectedProject }} </p>
            </div>
        </div>
        <div class="row my-4">
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4">Total Time OVERALL</p>
                <p class="text-center display-4">{{ times.totalTimeForAllProjects }} </p>
            </div>
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4">Total Time on Current Project</p>
                <p class="text-center display-4">{{ times.totalTimeForSelectedProject }} </p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <p class="display-4">Weekly and monthly stats here</p>
            </div>
            <p class="display-4">Nothing to display yet</p>
        </div>
    </div>
</template>

<script>
/**
Big question is how do we get the data to generate the metrics?
We have start and end times in ISO format.
Caveat, not all entries have a total time.

Metrics
 - Total time spent today

 - Total time spent today per project
This is actually a superset of the above, the same calculations apply

 - Weekly/Monthly Stats
1 toggle: Weekly/Monthly
1 dropdown: Project selection (including all)
Should aggregate totals spent on those projects and display them in bar form.
Will probably need to use a library for chart generation.

*/
export default {
    data: function() {
        return {
            totalTimeTodayForSelectedProjectMins: 0,
            totalTimeTodayForAllProjectsMins: 0,
            totalTimeForSelectedProjectMins: 0,
            totalTimeForAllProjectsMins: 0,
            times: {
                'totalTimeTodayForSelectedProject': '0',
                'totalTimeTodayForAllProjects': '0',
                'totalTimeForSelectedProject': '0',
                'totalTimeForAllProjects': '0'
            }
        }
    },
    methods: {
        totalTimeTodayForSelectedProject: function() {
            let stats = this.$store.getters.stats
            let projectId = this.$store.getters.currentProjectId
            let today = new Date(Date.now()).toISOString().split('T')[0]
            this.totalTimeTodayForSelectedProjectMins = 0

            stats.forEach((entry) => {
                if (entry.total_time != null & entry.project_id == projectId & entry.start_timeYMD == today) {
                    let startTime = new Date(entry.start_time)
                    let totalTime = new Date(entry.total_time)
                    let timeDiff = totalTime.getTime() - startTime.getTime();
                    let t = new Date(timeDiff)
                    this.totalTimeTodayForSelectedProjectMins += Math.round(t / 1000 / 60)
                }
            })
        },
        totalTimeTodayForAllProjects: function() {
            let stats = this.$store.getters.stats
            let today = new Date(Date.now()).toISOString().split('T')[0]
            this.totalTimeTodayForAllProjectsMins = 0

            stats.forEach((entry) => {
                if (entry.total_time != null & entry.start_timeYMD == today) {
                    let startTime = new Date(entry.start_time)
                    let totalTime = new Date(entry.total_time)
                    let timeDiff = totalTime.getTime() - startTime.getTime();
                    let t = new Date(timeDiff)
                    this.totalTimeTodayForAllProjectsMins += Math.round(t / 1000 / 60)
                }
            })
        },
        totalTimeForSelectedProject: function() {
            let stats = this.$store.getters.stats
            let projectId = this.$store.getters.currentProjectId
            let today = new Date(Date.now()).toISOString().split('T')[0]
            this.totalTimeForSelectedProjectMins = 0

            stats.forEach((entry) => {
                if (entry.total_time != null & entry.project_id == projectId) {
                    let startTime = new Date(entry.start_time)
                    let totalTime = new Date(entry.total_time)
                    let timeDiff = totalTime.getTime() - startTime.getTime();
                    let t = new Date(timeDiff)
                    this.totalTimeForSelectedProjectMins += Math.round(t / 1000 / 60)
                }
            })
        },
        totalTimeForAllProjects: function() {
            let stats = this.$store.getters.stats
            let today = new Date(Date.now()).toISOString().split('T')[0]
            this.totalTimeForAllProjectsMins = 0

            stats.forEach((entry) => {
                if (entry.total_time != null) {
                    let startTime = new Date(entry.start_time)
                    let totalTime = new Date(entry.total_time)
                    let timeDiff = totalTime.getTime() - startTime.getTime();
                    let t = new Date(timeDiff)
                    this.totalTimeForAllProjectsMins += Math.round(t / 1000 / 60)
                }
            })
        },
        convertToHoursandMinutes: function (totalTimeinMinutes) {
            var hours = (totalTimeinMinutes / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);

            console.log(totalTimeinMinutes + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).")

            let timeToDisplay = 0
            if (rhours === 0 && rminutes === 0) {
                timeToDisplay = '0 Mins'
            }
            if (rhours > 0 && rminutes === 0) {
                timeToDisplay = rhours + ' hr(s)'
            }
            if (rhours === 0 && rminutes > 0) {
                timeToDisplay = rminutes + ' min(s)'
            }
            if (rhours > 0 && rminutes > 0) {
                rminutes = ("0" + rminutes).slice(-2);
                timeToDisplay = rhours + ' hr(s) and ' + rminutes + ' min(s)'
            }

            return timeToDisplay
        }
    },
    computed: {
        stats: function() {
            // Generate time spent on currently selected project
            this.totalTimeTodayForSelectedProject()
            this.times.totalTimeTodayForSelectedProject = this.convertToHoursandMinutes(this.totalTimeTodayForSelectedProjectMins)
            // Generate time spent across all projects TODAY
            this.totalTimeTodayForAllProjects()
            this.times.totalTimeTodayForAllProjects = this.convertToHoursandMinutes(this.totalTimeTodayForAllProjectsMins)

            // Generate total time spent on currently selected project
            this.totalTimeForSelectedProject()
            this.times.totalTimeForSelectedProject = this.convertToHoursandMinutes(this.totalTimeForSelectedProjectMins)
            // Generate total time spent across all projects OVERALL
            this.totalTimeForAllProjects()
            this.times.totalTimeForAllProjects = this.convertToHoursandMinutes(this.totalTimeForAllProjectsMins)

            console.log(this.times)
            return this.$store.getters.stats
        }
    },
    mounted: function() {
        var today = new Date(Date.now()).toISOString().split('T')[0]
        console.log("GOT Stats")
        this.$store.dispatch('getStats', {date: today})
    },
    watch: {
        stats: function() {
            // For some odd reason, the code under the computed stats block only runs if this is here ???
        }
    }
}
</script>
