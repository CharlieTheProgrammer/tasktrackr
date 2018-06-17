<template>
    <div>
        <!-- NEW ITEM MODAL -->
        <div
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
                        <h5 class="modal-title">{{ modalTitle }}</h5>
                        <button type="button" class="close" aria-label="Close" @click="userInput=''" @click.prevent="$emit('toggleModal')">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{ modalDescription }}</p>
                        <form novalidate :class="{'was-validated': validated}">
                            <div class="form-group">
                                <label>{{ inputLabel }}</label>
                                <input type="text" :name="inputName" class="form-control" required v-model="userInput" @keyup="validated = true">
                                <div class="invalid-feedback">
                                    {{ invalidFeedbackDescription }}
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-secondary mx-1" @click="userInput=''" @click.prevent="$emit('toggleModal')">Close</button>
                                <button type="button" class="btn btn-primary mx-1" @click.prevent="createNewItem()">Save changes</button>
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
        props: ['toggle', 'modalTitle', 'modalDescription', 'inputLabel', 'inputName', 'invalidFeedbackDescription', 'dispatchAction'],
        data: function() {
            return {
                userInput: '',
                validated: false,
                isShown: false,
                blockDisplay: 'none',
            }
        },
        methods: {
            createNewItem: function() {
                if (this.userInput !== '') {
                    this.$store.dispatch(this.dispatchAction, this.userInput)
                        .then(this.$emit('toggleModal'))
                        .catch(err => ErrorsBus.errorHandler(err))
                    this.userInput = '';
                } else if (this.userInput === '') {
                    this.validated = true;
                }
            }
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
