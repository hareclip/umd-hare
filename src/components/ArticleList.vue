<template>
    <div class="list">
      <div id="feature-article" class="px-4 border-right">
          <div v-if="articles[0]">
              <arl :article="articles[0]">
                  <preview-image :article="articles[0]" class="mb-3 border-top border-danger shadow-sm"/>
              </arl>
              <div class="mb-3" id="feature-title"><arl :article="articles[0]" class="title-link">{{articles[0].title}}</arl></div>
              <!-- <preview-text :article="featuredArticleA" class="text"/> -->
          </div>
          <hr/>
      </div>
      <b-container>

        <b-row v-for="n in 3">
          <b-col v-for="m in 2">

            <hr v-if="n > 1" />
            <div class="article-image">
              <arl :article="articles[((2*(n-1))+(m-1))+1]">
                  <preview-image :article="articles[((2*(n-1))+(m-1))+1]" class="mb-2 border-top border-danger shadow-sm"/>
              </arl>
            </div>
            <div class="mb-2"><arl :article="articles[((2*(n-1))+(m-1))+1]" class="title-link-small">{{articles[((2*(n-1))+(m-1))+1].title}}</arl></div>
            <preview-text :article="articles[((2*(n-1))+(m-1))+1]" :chars="200" class="text"/>

          </b-col>
        </b-row>

      </b-container>
        <!-- <article-preview v-for="article in articles" :key="article.id" :article="article" class="article p-3 mb-3"/> -->
    </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview'
import ArticleImage from '@/components/ArticleImage'
import ArticlePreviewText from '@/components/ArticlePreviewText'
import ArticleLink from '@/components/ArticleLink'
import { BContainer } from 'bootstrap-vue'

export default {
    name: 'ArticleList',
    components: {
        ArticlePreview,
        'preview-image': ArticleImage,
        'preview-text': ArticlePreviewText,
        'arl': ArticleLink,
        BContainer
    },
    props: ['articles'],
    data () {
        return { }
    },
}
</script>

<style scoped>
#feature-article {
  height: 0px;
  --width: calc(var(min-width));
}
#feature-title {
  text-align: left;
  position: relative;
  bottom: 145px;
  padding-left: 10px;
  padding-top: 10px;
  z-index: 9;
  background-color: rgba(9,9,9,0.5);
  width: 100%;
  height: 130px;
  /* line-height: 15%; */
  /* color: white; */
}
.title-link {
  font-weight: bold;
  line-height: 1.1;
  font-size: 60px;

  text-align: left;
  /* position: relative;
  bottom: 50px; */
  z-index: 10;
  background-color: rgba(b,b,b,0.5);
  width: 100%;
  height: 100%;
  color: white;
}
.article-image {
  width: 100%;
  height: auto;
}
.title-link {

  font-weight: bold;
  line-height: 1.1;
  font-size: 4.0em;
  font-size: 35px;

  text-align: left;
  /* position: relative;
  bottom: 50px; */
  z-index: 10;
  background-color: rgba(b,b,b,0.5);
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
.article {
    width: 50%;
}
@media screen and (max-width: 768px) {
    .article {
        width: 100%;
    }
}


</style>
