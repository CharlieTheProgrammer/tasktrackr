const state = {
    // Changing data model. Entries will now be a subset of projects.
    // entries: [
    //     //  SAMPLE
    //     // {
    //     //     entry_id: 3,
    //     //     category_id: "1",
    //     //     entry_date: "11/20/2017",
    //     //     entry_description: "Sample entry",
    //     //     start_time: "10:22 AM",
    //     //     end_time: "11:00 AM",
    //     //     total_time: "130 mins",
    //     // }
    // ],
    projectCategories: [
        {
            category_id: "",
            category_name: "",
            hidden: ""
        },
    ],
    // The Object Version
// Access signature projects[projectID].entries[id].entry_date
// Downsides - Unsorted
// In order to properly sort through the object I would have to do the following:
// Get all the keys from projects and store them in an array.
// Sort the array
// When going through the object properties, use the sorted array values as keys, not object keys.
// I would actually have to do this twice, once for the projects (because I don't want the projects list to be randomly sorted)
// and once for the entries (because they obviously should be sorted in either ascending or descending order).

// I just had another thought, I could cache the sorted array values on the object itself. This gives me a bit more future proofing.

// Upsides
    // Sorting procedure is done only once to load the data properly onto the screen.
    // Afterwhich, updating or getting data becomes easy because the object is using indexed keys.
    // Gives me the flexibility to sort by ascending or descending easily since it's being done by one function.
    projects_Object: {
        _sortedArrayCache: [1,2,3,9,300],
        1: {
            project_name: "First One",
            created_date: "",
            entries: {
                1: {
                    category_id: "1",
                    entry_date: "11/20/2017",
                    entry_description: "Sample entry",
                    start_time: "10:22 AM",
                    end_time: "11:00 AM",
                    total_time: "130 mins",
                }
            }
        }
    },
    // The Array Version
// Access signature projects[projectID].entries[id].entry_date - same as object
// Downsides -
    // In order to update or get anything specific, I will have to make a call which would iterate over the array and
    // return the index of the element I want to update to get. That's because I wouldn't know in advance which element
    // has the data I'm looking for. Performance is definitely not an issue now, but the object version is obviously faster.

    // Also, I can't do the caching sorted values trick since the root is an array and it just wouldn't make any sense.
    projects_Array: [
        {
            project_id:  1,
            project_name: "First One",
            created_date: "",
            entries: [
                {
                    entry_id: 1,
                    category_id: "1",
                    entry_date: "11/20/2017",
                    entry_description: "Sample entry",
                    start_time: "10:22 AM",
                    end_time: "11:00 AM",
                    total_time: "130 mins",
                }
            ]
        }
    ]
}


const mutations = {
    // Relating to Entries
    // Add entry
    // Update Entry ... and if we wanted to further break these down
        // Update entry category
        // Update entry description
        // Update end time and total time, although contextually, this occurs differently.

    // Relating to Project categories... I will mutate these here
    // Update category name
    // 'Delete a category' - actually just marks it as hidden.

    // Relating to Projects
    // Add a project

    // Edit a project name - Something that occurs on settings page



};

const actions = {
    // Everything under here is bassically everything under mutations
};

const getters = {
    // Load all projects


    // Load categories


    // Load entries -
        // Load entries for all projects or just current project? Sticking to current implemetaton on the backend
};

export default {
    state,
    mutations,
    actions,
    getters
}