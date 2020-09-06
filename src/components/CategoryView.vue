<template>
    <page-wrapper :loaded="loaded">
        <h1>{{label}}</h1>
        <h2>{{description}}</h2>
        <hr/>
        <article-list :articles="articles" class="list mx-5 mb-4"/>
        <hr/>
        <div id="linkToArchives">
          View more articles in <router-link to="/archives/0" style="color:blue">Archives</router-link>
        </div>
    </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/PageWrapper'
import ArticleList from '@/components/ArticleList'
import JustInList from '@/components/JustInList'

export default {
    name: 'Category',
    components: {
        PageWrapper,
        ArticleList,
        JustInList,
    },
    data () {
        return {
            loaded: false,
            articles: [],
            label: '',
            description: ''
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
                switch (this.label) {
                    case 'News':
                        this.description = 'This definitely happened.';
                        break;
                    case 'Features':
                        this.description = 'Glorious.';
                        break;
                    case 'Sports':
                        this.description = 'Probably the least controversial thing here.';
                        break;
                    case 'Arts':
                        this.description = 'Our writers are probably on something.'
                        break;
                    case 'Rabbithole':
                        this.description = '60% shit. 50% posts.';
                        break;
                    case 'News in Images':
                        this.description = 'For the illiterate.';
                        break;
                }
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
    text-align: left;
    font-size: 4em;
    font-weight: bold;
    margin-bottom: 0pt;
    color: #c12a2a;
}
h2 {
  text-align: left;
  color: #aaaaaa;
}

@media screen and (max-width: 768px) {
    .list {
        margin: 0 !important;
    }
}
#linkToArchives {
  text-align: right;
}
</style>
