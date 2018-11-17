<template>
    <div class="container-fluid mb-4 pb-4">
        <div class="row bg-light border my-4 ">
            <p class="text-center display-3 pl-4">Dashboard</p>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4"><u>Time Today Overall</u></p>
                <p class="text-center display-5">{{ times.totalTimeTodayForAllProjects }}</p>
            </div>
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4"><u>Time Today on Current Project</u></p>
                <p class="text-center display-5">{{ times.totalTimeTodayForSelectedProject }} </p>
            </div>
        </div>
        <div class="row my-4">
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4"><u>Total Time Across Projects</u></p>
                <p class="text-center display-5">{{ times.totalTimeForAllProjects }} </p>
            </div>
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4"><u>Total Time on Current Project</u></p>
                <p class="text-center display-5">{{ times.totalTimeForSelectedProject }} </p>
            </div>
        </div>
        <!-- <div class="row">
            <div class="col-lg-12 bg-light border my-4">
                <p class="display-4">Weekly and Monthly stats here</p>
            </div>
            <p class="display-5 pl-4">Mins This Week</p>
        </div>
        <div class="row">
            <div>
                <canvas id="drawTest" class="ml-4"></canvas>
            </div>
        </div> -->
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
        isoStringToLocaleDate: function(isoString) {
            return new Date(isoString).toLocaleDateString().replace(new RegExp('/', 'g'), '-')
        },
        totalTimeTodayForSelectedProject: function() {
            let stats = this.$store.getters.stats
            let projectId = this.$store.getters.currentProjectId
            let today = new Date(Date.now()).toISOString().split('T')[0]
            this.totalTimeTodayForSelectedProjectMins = 0
    //console.log('totalTimeToday for Selected Project Date: ' + today)
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
            let today = new Date(Date.now()).toLocaleDateString().replace(new RegExp('/', 'g'), '-')
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
        },
    /**
        createChart: function (chartId, chartData) {
            const ctx = document.getElementById('drawTest');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
                    datasets: [
                        { // one line graph
                            label: 'Number of Moons',
                            data: [0, 0, 1, 2, 67, 62, 27, 14],
                            backgroundColor: [
                            'rgba(54,73,93,.5)', // Blue
                            'rgba(54,73,93,.5)',
                            'rgba(54,73,93,.5)',
                            'rgba(54,73,93,.5)',
                            'rgba(54,73,93,.5)',
                            'rgba(54,73,93,.5)',
                            'rgba(54,73,93,.5)',
                            'rgba(54,73,93,.5)'
                            ],
                            borderColor: [
                            '#36495d',
                            '#36495d',
                            '#36495d',
                            '#36495d',
                            '#36495d',
                            '#36495d',
                            '#36495d',
                            '#36495d',
                            ],
                            borderWidth: 3
                        }]
                },
                  options: {
                    responsive: true,
                    lineTension: 1,
                    scales: {
                    yAxes: [{
                        ticks: {
                        beginAtZero: true,
                        padding: 25,
                        }
                    }]
                    }
                }
                })
            // const myChart = new Chart(ctx, {
            //     type: chartData.type,
            //     data: chartData.data,
            //     options: chartData.options,
            //     })
        }
    */
    },
    computed: {
        stats: function() {
            // Generate time spent on currently selected project
            this.totalTimeTodayForSelectedProject()
            this.times.totalTimeTodayForSelectedProject = this.convertToHoursandMinutes(this.totalTimeTodayForSelectedProjectMins)
            //Vue.set(this.times, totalTimeTodayForSelectedProject, this.convertToHoursandMinutes(this.totalTimeTodayForSelectedProjectMins))
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
    created: function() {
        var today = new Date(Date.now()).toISOString().split('T')[0] // This is correct because the stored time strings in DB are ISO formatted
        console.log("GOT Stats")
        this.$store.dispatch('getStats', {date: today})
        //this.createChart()
    },
    watch: {
        stats: function() {
            // For some odd reason, the code under the computed stats block only runs if this is here ???
        }
    }
}
</script>

<style scoped>
    .display-5 {
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 1.1;
    }
</style>

