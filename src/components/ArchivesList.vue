<template>
  <page-wrapper :loaded="loaded">
    <h1 class="title">Archives</h1>
    <hr />
    <archives-preview
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
    <router-link
      :to="{ path: '/archives/' + (parseInt(this.$route.params.page) - 1) }"
      v-if="$route.params.page > 0"
    >
      prev
    </router-link>
    <router-link
      :to="{ path: '/archives/' + (parseInt(this.$route.params.page) + 1) }"
      v-if="articles.length === 20"
    >
      next
  </router-link>
  </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper";
import ArchivesPreview from "@/components/ArchivesPreview";

export default {
  name: "ArchivesList",
  components: {
    PageWrapper,
    ArchivesPreview,
  },
  data() {
    return {
      loaded: false,
      articles: [],
    };
  },
  methods: {
    async load() {
      try {
        const offset = this.$route.params.page * 20;
        const response = await this.$http.get(
          `/api/articles/?amount=20&offset=${offset}`
        );
        this.articles = response.data.data.articles;
        this.loaded = true;
      } catch (ex) {
        console.log(ex);
      }
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style scoped>
</style>
