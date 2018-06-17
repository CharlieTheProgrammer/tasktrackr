<template>
    <div>
        <div class="row py-2 mx-4" >
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <input
                    class="h4 w-100"
                    type="text"
                    v-model="name"
                    :class="{
                        'border border-primary bg-light': !isDisabled,
                        'bg-transparent border-0': isDisabled,
                        }"
                    :disabled="isDisabled">
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
                    v-on:click="onDelete()">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'

    export default {
        props: {
            category: {
                type: Object,
                required: true
            }
        },
        data: function() {
            return {
                name: this.category.category_name,
                isDisabled: true
            }
        },
        methods: {
            onEdit: function() {
                this.isDisabled = false;
                console.log(this.category.category_name)

            },
            onSave: function() {
                this.isDisabled = true;
                this.updateCategory();
            },
            onDelete: function() {
                this.deleteCategory();
            },
            addCategory: function() {
                // Validate category name here. This is where the errors file comes in.

                this.$store.dispatch('addCategory', this.name)
                    .catch(err => {
                        ErrorsBus.errorHandler(err);
                    })
            },
            updateCategory: function() {
                // Get category name from input field.
                var payload = {
                    category_id: this.category.category_id,
                    new_category_name: this.name,
                }

                this.$store.dispatch('updateCategory', payload)
                    .catch(err => {
                        ErrorsBus.errorHandler(err);
                    })
            },
            deleteCategory: function() {
                this.$emit('confirmDelete', this.category, "category");
            }
        }
    }
</script>