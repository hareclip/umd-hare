<template>
  <div class="list">
    <div
      id="feature-article"
      class="px-4 border-right"
      :style="handleMobileStyle('feature-article')"
    >
      <div v-if="articles[0]">
        <arl :article="articles[0]">
          <preview-image :article="articles[0]" class="mb-3 border-top border-danger shadow-sm" />
        </arl>
        <div class="mb-3" id="feature-title" :style="handleMobileStyle('feature-title')">
          <arl :article="articles[0]" class="title-link">{{articles[0].title}}</arl>
        </div>
        <!-- <preview-text :article="featuredArticleA" class="text"/> -->
      </div>
      <hr />
    </div>
    <div id="mobile-smaller-article" :style="handleMobileStyle('smaller-article')">
      <div class="article-image">
        <arl :article="articles[0]">
          <preview-image :article="articles[0]" class="mb-2 border-top border-danger shadow-sm" />
        </arl>
      </div>
      <div class="mb-2">
        <arl :article="articles[0]" class="title-link-small">{{articles[0].title}}</arl>
      </div>
      <preview-text :article="articles[0]" :chars="200" class="text" />
    </div>
    <b-container>
      <b-row v-for="n in 3" :key="n">
        <b-col v-for="m in 2" :key="getArticle(n,m).id" id="smaller-article">
          <hr v-if="n > 1" />
          <div class="article-image">
            <arl :article="getArticle(n,m)">
              <preview-image
                :article="getArticle(n,m)"
                class="mb-2 border-top border-danger shadow-sm"
              />
            </arl>
          </div>
          <div class="mb-2">
            <arl :article="getArticle(n,m)" class="title-link-small">{{getArticle(n,m).title}}</arl>
          </div>
          <preview-text :article="getArticle(n,m)" :chars="200" class="text" />
        </b-col>
      </b-row>
    </b-container>
    <!-- <article-preview v-for="article in articles" :key="article.id" :article="article" class="article p-3 mb-3"/> -->
  </div>
</template>

<script>
import ArticlePreview from "@/components/ArticlePreview";
import ArticleImage from "@/components/ArticleImage";
import ArticlePreviewText from "@/components/ArticlePreviewText";
import ArticleLink from "@/components/ArticleLink";
import { BContainer } from "bootstrap-vue";

export default {
  name: "ArticleList",
  components: {
    ArticlePreview,
    "preview-image": ArticleImage,
    "preview-text": ArticlePreviewText,
    arl: ArticleLink,
    BContainer,
  },
  props: ["articles"],
  data() {
    return {};
  },
  methods: {
    getArticle: function (row, col) {
      return this.articles[2 * (row - 1) + (col - 1) + 1];
    },
    handleMobileStyle: function (element) {
      let style = {};
      this.$ifOnMobile(
        () => {
          if (element === "feature-article") {
            style = { display: "none !important" };
          }
        },
        () => {
          if (element === "smaller-article") {
            style = { display: "none" };
          }
        }
      );
      return style;
    },
  },
};
</script>

<style scoped>
#smaller-article {
  width: 100%;
  text-align: left;
}
#feature-article {
  width: 100%;
  /*--width: calc(var(min-width));*/
  height: 28rem;
}
#feature-title {
  text-align: left;
  position: relative;
  bottom: 145px;
  padding-left: 10px;
  padding-top: 10px;
  z-index: 9;
  background-color: rgba(9, 9, 9, 0.5);
  width: 100%;
  height: 130px;
  /* line-height: 15%; */
  /* color: white; */
}
.article-image {
  width: 100%;
}
.title-link {
  font-weight: bold;
  line-height: 1.1;
  font-size: 4em;
  font-size: 35px;

  text-align: left;
  /* position: relative;
  bottom: 50px; */
  z-index: 10;
  background-color: rgba(b, b, b, 0.5);
  width: 100%;
  height: 100%;
  color: white;
}
.title-link-small {
  font-weight: bold;
  line-height: 1.1;
  font-size: 1.6em;
  font-size: 20px;
}
.text {
  font-size: 1.1rem;
  font-size: 13px;
}
.list {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
}
@media not screen and (max-width: 768px) {
  .list {
    margin-left: 3rem;
    margin-right: 3rem;
  }
}
.article {
  width: 50%;
}
@media screen and (max-width: 768px) {
  .article {
    width: 100%;
  }
}
</style>
