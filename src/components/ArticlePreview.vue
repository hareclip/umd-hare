<template>
    <div class="article">
        <arl :article="article">
            <preview-image :article="article" class="mb-3 border-top border-danger shadow-sm"/>
        </arl>
        <div class="mb-3"><arl :article="article" class="title-link">{{article.title}}</arl></div>
        <preview-text :article="article" class="text"/>
        <arl :article="article" class="inv">Continue Reading</arl>
    </div>
</template>

<script>
import ArticlePreviewText from '@/components/ArticlePreviewText'
import ArticleImage from '@/components/ArticleImage'
import ArticleLink from '@/components/ArticleLink'

export default {
    name: 'ArticlePreview',
    props: ['article'],
    components: {
        'preview-text': ArticlePreviewText,
        'preview-image': ArticleImage,
        'arl': ArticleLink,
    },
    data () {
        return {}
    },
}
</script>

<style scoped>
.article {
    text-align: left;
}
.title-link {
    font-weight: bold;
    line-height: 1.2;
    font-size: 2.5em;
}
.text {
    font-size: 1.2rem;
}
@media screen and (max-width: 768px) {
    .title-link {
        font-size: 1.8em !important;
    }

    .text {
        font-size: 1.1rem;
    }
}
</style>
