<template>
    <div class="container-fluid mb-4 pb-4">
        <div class="row bg-light border my-4 ">
            <p class="text-center display-3 pl-4">Dashboard</p>
        </div>
        <div class="row">
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4"><u>Time Today Overall</u></p>
                <p class="text-center display-5">{{ timeStats.timeSpentTodayOnAllProjects | convertToHoursandMinutes }}</p>
            </div>
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4"><u>Time Today on Current Project</u></p>
                <p class="text-center display-5">{{ timeStats.timeSpentTodayOnSelectedProject | convertToHoursandMinutes }} </p>
            </div>
        </div>
        <div class="row my-4">
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4"><u>Total Time Across Projects</u></p>
                <p class="text-center display-5">{{ timeStats.timeSpentOnAllProjects | convertToHoursandMinutes }} </p>
            </div>
            <div class="col-lg-6 col-md-6 text-center">
                <p class="text-center display-4"><u>Total Time on Current Project</u></p>
                <p class="text-center display-5">{{ timeStats.timeSpentOnSelectedProject | convertToHoursandMinutes }} </p>
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
    filters: {
        convertToHoursandMinutes: function (totalTimeinMinutes) {
            var hours = (totalTimeinMinutes / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);

            //console.log(totalTimeinMinutes + " minutes = " + rhours + " hour(s) and " + rminutes + " minute(s).")

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
        timeStats: function() {
            return this.$store.getters.timeStats
        }
    },
    created: function() {
        let today = new Date()
        let month = ("0" + (today.getMonth() + 1)).slice(-2)
        let date = ("0" + today.getDate()).slice(-2)
        let year = today.getFullYear()

        let fullDate = year + '-' + month + '-' + date

        console.log("Requesting Stats with " + fullDate + 'as date')
        this.$store.dispatch('getStats', {date: fullDate})
            .then(results =>{
                this.$store.dispatch('updateTimeStatsHandler')
            })
            .catch(error => {
                console.log("Error occurred updating time statistics")
                console.log(error)
            })

        //this.createChart()
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

