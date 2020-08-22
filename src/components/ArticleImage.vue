<template>
    <div :style="{ 'background-image': `url(${imageUrl})`, 'width': width+'%', 'padding-top': (width*.5625)+'%' }" class="header-image"/>
</template>

<script>
export default {
    name: 'ArticleImage',
    props: {
        'article': Object, 
        'width': {
            type: Number,
            default: 100
        }
    },
    data () {
        return {
            imageUrl: '',
        }
    },
    methods: {
        async load () {
            this.imageUrl = this.$bucketUrl + (this.article.headerImageFileName || 'images/default.jpg')
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
.header-image {
    background-size: cover;
    background-position: center;
}
</style>
