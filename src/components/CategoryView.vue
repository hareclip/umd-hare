<template>
    <page-wrapper :loaded="loaded">
        <h1>{{label}}</h1>
        <hr/>
        <article-list :articles="articles" class="list mx-5 mb-4"/>
    </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/PageWrapper'
import ArticleList from '@/components/ArticleList'

export default {
    name: 'Category',
    components: {
        PageWrapper,
        ArticleList,
    },
    data () {
        return {
            loaded: false,
            articles: [],
            label: ''
        }
    },
    methods: {
        async load () {
            try {
                const labelRes = await this.$http.get(`/api/categories/${this.$route.params.category}`)
                const response = await this.$http.get(`/api/articles/category/${this.$route.params.category}?amount=10`)
                this.articles = response.data.data.articles
                this.label = labelRes.data.data.label
                document.title = this.label + ' | The Hare'
                this.loaded = true
            } catch (ex) {
                console.log(ex);
            }
        }
    },
    mounted () {
        this.load()
    }
}
</script>

<style scoped>
h1 {
    font-size: 4em;
    font-weight: bold;
}
@media screen and (max-width: 768px) {
    .list {
        margin: 0 !important;
    }
}
</style>
