<template>
    <div>
        <!-- NEW PROJECT MODAL -->
        <div
            id="addCategory"
            class="modal fade"
            :class="{show: isShown}"
            :style="{display: blockDisplay}"
            tabindex="-1"
            role="dialog"
            data-backdrop="static"
            >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add a New Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="$emit('toggleModal')">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Enter a name for your new category</p>
                        <form id="newCategoryForm" novalidate :class="{'was-validated': validated}">
                            <div class="form-group">
                                <label for="categoryName">Category Name</label>
                                <input type="text" name="category_name" id="category_name" class="form-control" required v-model="categoryName">
                                <div class="invalid-feedback">
                                    Please provide a valid category name.
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary mx-1" data-dismiss="modal" @click.prevent="$emit('toggleModal')">Close</button>
                                <button type="button" class="btn btn-primary mx-1" @click="addCategory">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ErrorsBus } from '../../main'

    export default {
        props: ['toggle'],
        data: function() {
            return {
                categoryName: "",
                validated: false,
                isShown: false,
                blockDisplay: 'none'
            }
        },
        methods: {
            addCategory: function() {
                if (this.categoryName !== '') {
                    this.$store.dispatch('addCategory', this.categoryName)
                        .then(res => this.display = false)
                        .catch(err => {
                            ErrorsBus.errorHandler(err);
                            this.categoryName = '';
                        })
                } else if (this.categoryName === '') {
                    this.validated = true;
                }
            },
            //closeBtnHandler: function() {
            //     this.display = false;
            //     this.validated = false
            // }
        },
        watch: {
            toggle: function() {
                if (!this.toggle) {
                    this.blockDisplay = 'none'
                } else {
                    this.blockDisplay = 'block'
                }

                this.isShown = !this.isShown;
                this.validated = false;
            }
        }
    }
</script>
