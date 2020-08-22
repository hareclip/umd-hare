<template>
    <p>{{text}}</p>
</template>

<script>
export default {
    name: 'ArticlePreviewText',
    props: {
        'article': Object,
        'chars': {
            type: Number,
            default: 365
        }
    },
    data () {
        return {
            text: '',
        }
    },
    methods: {
        async load () {
            if(this.article.contentsFileName) {
                const response = await this.$getFromBucket(this.article.contentsFileName)
                this.text = this.$commonmarkRenderPlaintext(response.data)
                if(this.text.length > this.chars) {
                    let len = this.text.length
                    const words = this.text.split(' ')
                    while(len > this.chars) {
                        len -= words.pop().length + 1
                    }
                    this.text = words.join(' ') + '…'
                }
            }
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
