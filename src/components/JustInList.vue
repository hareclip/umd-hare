<template>
    <div>
        <img src="/static/banner_square.png" alt="square banner" width="90%" height="90%"/>
        <h2>Just In...</h2>
        <hr/>
        <just-in-preview v-for="article in articles" :key="article.id" :article="article"/>
    </div>
</template>

<script>
import JustInPreview from '@/components/JustInPreview'

export default {
    name: 'JustInList',
    components: {
        JustInPreview,
    },
    data() {
      return {
        articles: [],
      }
    },
    methods: {
      async load() {
        try {
            const response = await this.$http.get(`/api/articles/?amount=6`)
            this.articles = response.data.data.articles
        } catch (ex) {
            console.log(ex);
        }
      }
    },
    mounted() {
      this.load();
    }
}
</script>
<style scoped>

h2 {
  text-align: left;
  margin-top: 30px;
  color: #aaaaaa;
}

</style>
