<template>
    <div class="list">
        <article-preview v-for="article in articles" :key="article.id" :article="article" class="article p-3 mb-3"/>
    </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview'

export default {
    name: 'ArticleList',
    components: {
        ArticlePreview
    },
    props: ['articles'],
    data () {
        return { }
    },
}
</script>

<style scoped>
.list {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
}
.article {
    width: 50%;
}
@media screen and (max-width: 768px) {
    .article {
        width: 100%;
    }
}


</style>
