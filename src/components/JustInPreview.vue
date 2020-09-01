<template>
    <div id="article">
        <div id="title"><arl :article="article">{{article.title}}</arl></div>
        {{article.authorFullName}} -
        {{daysAgo}} days ago
        <hr/>
    </div>
</template>

<script>
import moment from 'moment';
import ArticleLink from '@/components/ArticleLink';

export default {
    name: 'JustInPreview',
    props: ['article'],
    components: {
        'arl': ArticleLink,
    },
    data () {
        return {
            daysAgo: "",
        }
    },
    mounted () {
        const dateCreated = moment(this.article.dateCreated);
        const dateVisible = moment(this.article.dateVisible);
        const date = dateCreated.isAfter(dateVisible) ? dateCreated : dateVisible;
        this.daysAgo = (new moment()).diff(date, 'days');
    }
}
</script>

<style scoped>
#article {
  text-align: left;
  font-family: "Helvetica","Arial";
}

#title {
  font-weight: bold;
  font-family: "Helvetica","Arial";
}
</style>
