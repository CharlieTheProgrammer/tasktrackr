<template>
    <div>
        <!-- PROJECT HEADER -->
        <div class="container-fluid mt-4 bg-light border">
            <p class="display-4 mx-3">Projects</p>
        </div>

        <!-- PROJECT EDIT BODY -->
        <div class="container-fluid pt-3" v-for="(project, key, index) in projects" :key="index + '-project'">
            <app-project :project="project" @confirmDelete="confirmDelete"></app-project>
        </div>

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


        <!-- NEW CATEGORY MODAL -->
        <app-add-category-modal :toggle="toggleCategoryAddModal" @toggleModal="toggleCategoryAddModal = !toggleCategoryAddModal"></app-add-category-modal>

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
import SettingsCategoryModal from './SettingsCategoryModal.vue'
import SettingsDeleteConfirmation from './SettingsDeleteConfirmation.vue'

    export default {
        data: function() {
            return {
                toggleCategoryAddModal: false,
                toggleDeleteConfirmationModal: false,
                thingToDelete: '',
                projectOrCategory: ''
            }
        },
        components: {
            'app-project': SettingsProjectItem,
            'app-category': SettingsCategoryItem,
            'app-add-category-modal': SettingsCategoryModal,
            'app-delete-confirmation-modal': SettingsDeleteConfirmation
        },
        computed: {
            projects: function() {
                return this.$store.getters.projects;
            },
            projectCategories: function() {
                return this.$store.getters.projectCategories;
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