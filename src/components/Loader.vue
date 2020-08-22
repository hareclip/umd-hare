<template>
    <div>
        <b-spinner v-if="!loaded" class="spinner" label="Loading..." variant="danger"></b-spinner>
        <slot v-if="loaded"></slot>
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: {
        'loaded': {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {}
    },
}
</script>

<style scoped>
.spinner {
    width: 5rem;
    height: 5rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -2.5rem;
    margin-left: -2.5rem;
}
</style>