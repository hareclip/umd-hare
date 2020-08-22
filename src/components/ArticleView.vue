<template>
  <page-wrapper :loaded="loaded">
    <div class="headline mt-3 mb-2">
      <arl :article="article">{{article.title}}</arl>
    </div>
    <div class="info-line mb-2">
      <p class="info-line ml-1 pr-3 border-right">{{dateStr}}</p>
      <p class="info-line px-3">By {{article.authorFullName}}</p>
      <p class="info-line px-3 border-left d-none d-md-block">
        <a :href="categoryLink" class="category-link">{{article.categoryLabel}}</a>
      </p>
    </div>
    <div v-if="article.headerImageFileName" class="image-container mb-4">
      <article-image :article="article" :width="imageWidth" class="mb-3 shadow-sm" />
    </div>
    <div class="text px-5" v-html="text"></div>
  </page-wrapper>
</template>

<script>
import PageWrapper from "@/components/PageWrapper";
import ArticleImage from "@/components/ArticleImage";
import ArticleLink from "@/components/ArticleLink";
import moment from "moment";

export default {
  name: "Article",
  components: {
    PageWrapper,
    ArticleImage,
    arl: ArticleLink
  },
  data() {
    return {
      loaded: false,
      article: {},
      dateStr: "",
      text: "",
      imageWidth: 70,
      categoryLink: ""
    };
  },
  methods: {
    async load() {
      this.resizeImage();

      try {
        const response = await this.$http.get(
          `/api/articles/${this.$route.params.id}`
        );
        this.article = response.data.data;

        if (this.article.contentsFileName) {
          const textResponse = await this.$getFromBucket(
            this.article.contentsFileName
          );
          this.text = this.$commonmarkRenderHtml(textResponse.data);
        }

        const dateCreated = moment(this.article.dateCreated);
        const dateVisible = moment(this.article.dateVisible);
        const date = dateCreated.isAfter(dateVisible)
          ? dateCreated
          : dateVisible;
        this.dateStr = this.$formatDate(date);

        this.categoryLink = `#/category/${this.article.categoryId}`;
        document.title = this.article.title + " | The Hare";
        this.loaded = true;
      } catch (ex) {
        console.log(ex);
      }
    },

    resizeImage() {
      this.$ifOnMobile(
        () => {
          this.imageWidth = 100;
        },
        () => {
          this.imageWidth = 70;
        }
      );
    }
  },
  mounted() {
    this.load();
  },
  created() {
    window.addEventListener("resize", this.resizeImage);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeImage);
  }
};
</script>

<style scoped>
.text {
  font-family: Georgia, Times, "Times New Roman", serif;
  text-align: left;
  line-height: 1.6;
  font-size: 1.25em;
  overflow-wrap: break-word;
}
.headline {
  font-family: Georgia, Times, "Times New Roman", serif;
  text-align: left;
  line-height: 1.15;
  font-weight: bold;
  font-size: 3.375em;
}
@media screen and (max-width: 768px) {
  .text {
    padding: 0 0.5rem !important;
    font-size: 1.1em;
  }

  .headline {
    margin-top: 0 !important;
    font-size: 2em;
  }
}
.info-line {
  display: flex;
  flex-direction: row;
}
.info-line {
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 1.25em;
  color: #555;
}
.category-link:link {
  color: #700d0d;
}
.image-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>

<style>
.text p {
  margin-bottom: 1.4rem;
}
.text a {
  color: #a01010;
}
</style>
