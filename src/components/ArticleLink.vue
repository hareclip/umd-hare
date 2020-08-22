<template>
    <a :href="link">
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'ArticleLink',
    props: ['article'],
    data () {
        return {
            link: '',
        }
    },
    methods: {
        async load () {
            this.link = `#/articles/${this.article.id}`
        },
    },
    mounted () {
        this.load()
    },
    watch: {
        article: function (val, oldVal) {
            this.load()
        },
    },
}
</script>

<style scoped>
</style>
