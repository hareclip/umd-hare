<template>
  <page-wrapper :loaded="loaded">
    <h1 class="title">Search: {{$route.query.searchTerm}}</h1>
    <hr/>
    <archives-preview
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
    <router-link
      :to="{ path: '/search/' + (parseInt(this.$route.params.page) - 1) + '?searchTerm=' + $route.query.searchTerm}"
      v-if="$route.params.page > 0"
    >
      prev
    </router-link>
    <router-link
      :to="{ path: '/search/' + (parseInt(this.$route.params.page) + 1) + '?searchTerm=' + $route.query.searchTerm}"
      v-if="articles.length === 20"
    >
      next
  </router-link>
  </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper";
import ArchivesPreview from '@/components/ArchivesPreview';

export default {
  name: "SearchList",
  components: {
    PageWrapper,
    ArchivesPreview,
  },
  data() {
    return {
      loaded: false,
      articles: [],
    }
  },
  methods: {
    async load() {
      try {
        const searchTerm = this.$route.query.searchTerm;
        const offset = parseInt(this.$route.params.page) * 20;
        const response = await this.$http.get(
          `articles/search?searchTerm=${searchTerm}&offset=${offset}`
        );
        this.articles = response.data.data.articles;
        this.loaded = true;
      } catch(ex) {
        console.log(ex);
      }
    }
  },
  mounted() {
    this.load();
  }
}
</script>
