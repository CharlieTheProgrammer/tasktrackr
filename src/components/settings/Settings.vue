<template>
    <div>
        <!-- PROJECT HEADER -->
        <div class="container-fluid mt-4 bg-light border">
            <p class="display-4 mx-3">Projects</p>
        </div>

        <!-- PROJECT EDIT BODY -->
        <div class="container-fluid pt-3" v-for="(project, key, index) in projects" :key="index">
            <app-project :project="project"></app-project>
                    <!-- <div class="row py-2 mx-4" >
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <input
                        class="h4 w-100"
                        type="text"
                        :value="project.project_name"
                        :class="{
                        'border border-primary bg-light': !isDisabled,
                        'bg-transparent border-0': isDisabled,
                        }"
                        v-bind:disabled="isDisabled">
                </div>
                <div class="col-lg-6 col-sm-4">
                    <button
                        class="btn btn-primary btn-sm mx-1"
                        v-on:click="onEdit()"
                        v-if="isDisabled">Edit</button>
                    <button
                        class="btn btn-warning btn-sm mx-1"
                        v-else
                        v-on:click="onSave()">Save</button>
                    <button
                        class="btn btn-danger btn-sm mx-1"
                        v-on:click="deleteProject(project.project_id)">Delete</button>
                </div>
            </div> -->
        </div>

        <!-- CATEGORY HEADER -->
        <div class="container-fluid mt-4 bg-light border">
            <div class="row justify-content-between align-items-center mx-3">
                <p class="display-4">Categories</p>
                <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addCategory">Add Category</button>
            </div>
        </div>

        <!-- CATEGORY EDIT BODY -->
        <div class="container-fluid pt-4" v-for="(category, key, index) in projectCategories" :key="index" v-if="category.hidden != 1 && key !== 0 ">
            <app-category :category="category" :index="index" ></app-category>
        </div>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'
import SettingsProjectItem from './SettingsProjectItem.vue'
import SettingsCategoryItem from './SettingsCategoryItem.vue'

    export default {
        data: function() {
            return {
                editedName: ""
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
    }
</script>

