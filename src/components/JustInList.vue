<template>
    <div>
        <img src="/static/banner_square.png" alt="square banner" width="90%" height="90%"/>
        <h2>Just In...</h2>
        <hr/>
        <just-in-preview v-for="article in recentArticles" :key="article.id" :article="article"/>
    </div>
</template>

<script>
import JustInPreview from '@/components/JustInPreview'

export default {
    name: 'JustInList',
    components: {
        JustInPreview,
    },
    props: ['recentArticles'],
}
</script>
<style scoped>

h2 {
  text-align: left;
  margin-top: 30px;
  color: #aaaaaa;
}

</style>
