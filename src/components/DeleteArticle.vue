<template>
  <page-wrapper>
    <auth-form v-model="auth" url="admin/auth" v-if="!auth.accepted"></auth-form>
    <div v-if="auth.accepted">
      <h1>Delete Article</h1>
      <hr />
      <div class="grid">
        <div class="label">Article:</div>
        <b-form-select v-model="selectedArticle" :options="articles" class="left-right-input"></b-form-select>
        <b-button @click="deleteArticle" class="end-input">Delete</b-button>
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper";
import AuthForm from "@/components/AuthForm";

export default {
  name: "DeleteArticle",
  components: {
    PageWrapper,
    AuthForm
  },
  data() {
    return {
      auth: {},
      articles: [],
      selectedArticle: 0
    };
  },
  methods: {
    async load() {
      await this.loadArticles();
    },

    async loadArticles() {
      this.selectedArticle = 0;
      try {
        const articlesRes = await this.$http.get(`articles?amount=30`);
        this.articles = articlesRes.data.data.articles.map(a => ({
          value: a.id,
          text: `[${a.id}] ${a.title}`
        }));
      } catch (e) {
        console.log(e);
      }
    },

    async deleteArticle() {
      if (this.selectedArticle === 0) {
        return;
      }

      try {
        await this.$http.post("admin/delete-article", {
          username: this.auth.username,
          password: this.auth.password,
          id: this.selectedArticle
        });
      } catch (e) {
        return;
      }

      await this.loadArticles();
    }
  },
  mounted() {
    this.load();
  }
};
</script>

<style scoped>
.grid {
  width: 50rem;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 20% 35% 30% 15%;
  grid-template-rows: repeat(4, 2.5rem) 9rem repeat(4, 2.5rem);
  grid-auto-flow: row;
  justify-items: stretch;
  align-items: stretch;
}
.label {
  grid-column: 1 / 2;
  padding-right: 1rem;
  justify-self: right;
  align-self: center;
}
.left-right-input {
  grid-column: 2 / 4;
}
.end-input {
  grid-column: 4 / 5;
  margin-left: 1em;
}
</style>
