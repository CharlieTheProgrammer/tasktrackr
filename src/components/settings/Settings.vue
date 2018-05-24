<template>
    <div>
        <!-- PROJECT HEADER -->
        <div class="container-fluid mt-4 bg-light border">
            <p class="display-4 mx-3">Projects</p>
        </div>

        <!-- PROJECT EDIT BODY -->
        <div class="container-fluid pt-3" v-for="(project, key, index) in projects" :key="index">
            <app-project :project="project"></app-project>
        </div>

        <!-- CATEGORY HEADER -->
        <div class="container-fluid mt-4 bg-light border">
            <div class="row justify-content-between align-items-center mx-3">
                <p class="display-4">Categories</p>
                <button class="btn btn-primary btn-sm" @click="display = true">Add Category</button>
            </div>
        </div>

        <!-- CATEGORY EDIT BODY -->
        <div class="container-fluid pt-4" v-for="(category, key, index) in projectCategories" :key="index" v-if="category.hidden != 1 && key !== 0 ">
            <app-category :category="category" :index="index" ></app-category>
        </div>


        <!-- NEW PROJECT MODAL -->
        <b-modal
            class="modal-title"
            title="Add a New Category"
            role="dialog"
            v-model="display"
            >
            <p>Enter a name for your new category</p>
            <form id="newCategoryForm">
                <div class="form-group">
                    <label for="categoryName">Category Name</label>
                    <input type="text" name="category_name" id="category_name" class="form-control" required v-model="categoryName">
                    <div class="invalid-feedback">
                        Please provide a category name.
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-secondary mx-1" @click="display = false">Close</button>
                    <button type="submit" class="btn btn-primary mx-1" v-on:click.prevent="addCategory">Save changes</button>
                </div>
            </form>
            <div slot="modal-footer"></div>
        </b-modal>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'
import SettingsProjectItem from './SettingsProjectItem.vue'
import SettingsCategoryItem from './SettingsCategoryItem.vue'

    export default {
        data: function() {
            return {
                categoryName: "",
                display: false
            }
        },
        components: {
            'app-project': SettingsProjectItem,
            'app-category': SettingsCategoryItem
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
            addCategory: function() {
                this.$store.dispatch('addCategory', this.categoryName)
                    .then(res => this.display = false)
                    .catch(err => {
                        ErrorsBus.errorHandler(err);
                    })
            }
        }
    }
</script>

