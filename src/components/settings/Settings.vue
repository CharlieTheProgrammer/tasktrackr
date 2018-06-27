<template>
    <div>
        <!-- PROJECT HEADER -->
        <div class="container-fluid mt-4 bg-light border">
            <div class="row justify-content-between align-items-center mx-3">
                <p class="display-4">Projects</p>
                <button class="btn btn-primary btn-sm" @click.prevent="toggleProjectAddModal = !toggleProjectAddModal">Add Project</button>
            </div>
        </div>

        <!-- PROJECT EDIT BODY -->
        <div class="container-fluid pt-3" v-for="(project, key, index) in projects" :key="index + '-project'">
            <app-project :project="project" @confirmDelete="confirmDelete"></app-project>
        </div>

        <!-- NEW PROJECT MODAL -->
        <app-add-item-modal
            :toggle="toggleProjectAddModal"
            @toggleModal="toggleProjectAddModal = !toggleProjectAddModal"
            :modalTitle="'Add a New Project'"
            :modalDescription="'Enter a name for your new project.'"
            :inputLabel="'Project Name'"
            :inputName="'project_name'"
            :invalidFeedbackDescription="'Please provide a valid project name.'"
            :dispatchAction="'createProject'"
            ></app-add-item-modal>


        <!-- CATEGORY HEADER -->
        <div class="container-fluid mt-4 bg-light border">
            <div class="row justify-content-between align-items-center mx-3">
                <p class="display-4">Categories</p>
                <button class="btn btn-primary btn-sm" @click.prevent="toggleCategoryAddModal = !toggleCategoryAddModal">Add Category</button>
            </div>
        </div>

        <!-- CATEGORY EDIT BODY -->
        <div class="container-fluid pt-4" v-for="(category, key, index) in projectCategories" :key="index + '-category'" v-if="category.hidden != 1 && key !== '0' ">
            <app-category :category="category" @confirmDelete="confirmDelete"></app-category>
        </div>

        <!-- USER SETTINGS HEADER -->
        <div class="container-fluid mt-4 bg-light border">
            <div class="row justify-content-between align-items-center mx-3">
                <p class="display-4">Other</p>
            </div>
        </div>

        <!-- USER SETTINGS EDIT BODY -->
        <div class="container-fluid pt-3" v-for="(setting, key, index) in userSettings" :key="index + '-setting'">
            <app-user-setting :setting="setting"></app-user-setting>
        </div>

        <!-- NEW CATEGORY MODAL -->
        <app-add-item-modal
            :toggle="toggleCategoryAddModal"
            @toggleModal="toggleCategoryAddModal = !toggleCategoryAddModal"
            :modalTitle="'Add a New Category'"
            :modalDescription="'Enter a name for your new category.'"
            :inputLabel="'Category Name'"
            :inputName="'category_name'"
            :invalidFeedbackDescription="'Please provide a valid category name.'"
            :dispatchAction="'addCategory'"
            ></app-add-item-modal>


        <!-- DELETE CONFIRMATION MODAL -->
        <app-delete-confirmation-modal
            :toggle="toggleDeleteConfirmationModal"
            :thingToDelete="thingToDelete"
            :projectOrCategory="projectOrCategory"
            @resetDeleteConfirmationModal="resetDeleteConfirmationModal"
            ></app-delete-confirmation-modal>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'
import SettingsProjectItem from './SettingsProjectItem.vue'
import SettingsCategoryItem from './SettingsCategoryItem.vue'
import SettingsUserSettingItem from './SettingsUserSettingItem.vue'
import SettingsDeleteConfirmation from './SettingsDeleteConfirmation.vue'
import SettingsAddItemModal from './SettingsAddModal-Generic.vue'

    export default {
        data: function() {
            return {
                toggleProjectAddModal: false,
                toggleCategoryAddModal: false,
                toggleDeleteConfirmationModal: false,
                thingToDelete: '',
                projectOrCategory: ''
            }
        },
        components: {
            'app-project': SettingsProjectItem,
            'app-category': SettingsCategoryItem,
            'app-user-setting': SettingsUserSettingItem,
            'app-delete-confirmation-modal': SettingsDeleteConfirmation,
            'app-add-item-modal': SettingsAddItemModal
        },
        computed: {
            projects: function() {
                return this.$store.getters.projects;
            },
            projectCategories: function() {
                return this.$store.getters.projectCategories;
            },
            userSettings: function() {
                return this.$store.getters.userSettings;
            }
        },
        methods: {
            confirmDelete: function(thingToDelete, projectOrCategory) {
                this.toggleDeleteConfirmationModal = true;
                this.thingToDelete = thingToDelete;
                this.projectOrCategory = projectOrCategory;
            },
            resetDeleteConfirmationModal: function() {
                this.toggleDeleteConfirmationModal = false;
                this.thingToDelete = '';
                this.projectOrCategory = '';
            }
        }
    }
</script>

<style scoped>
.btn {
    min-width: 7rem;
}
</style>
