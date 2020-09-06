<template>
  <page-wrapper :loaded="loaded">
    <div>
        <hr class="mx-5 d-none d-md-block"/>
        <article-list :articles="articles" class="d-md-none mx-2 mb-4"/>
        <loader :loaded="loaded">
            <div id="feature-article" class="px-4 border-right">
                <div v-if="featuredArticleA">
                    <arl :article="featuredArticleA">
                        <preview-image :article="featuredArticleA" class="mb-3 border-top border-danger shadow-sm"/>
                    </arl>
                    <div class="mb-3" id="feature-title"><arl :article="featuredArticleA" class="title-link">{{featuredArticleA.title}}</arl></div>
                    <!-- <preview-text :article="featuredArticleA" class="text"/> -->
                </div>
                <hr/>
            </div>
            <div id="home-articles" class="d-none d-md-flex px-3 mb-4">
              <b-container>

                <b-row v-for="n in 3">
                  <b-col v-for="m in 2">

                    <hr v-if="n > 1" />
                    <div class="article-image">
                      <arl :article="all_articles[((2*(n-1))+(m-1))]">
                          <preview-image :article="all_articles[((2*(n-1))+(m-1))]" class="mb-2 border-top border-danger shadow-sm"/>
                      </arl>
                    </div>
                    <div class="mb-2"><arl :article="all_articles[((2*(n-1))+(m-1))]" class="title-link-small">{{all_articles[((2*(n-1))+(m-1))].title}}</arl></div>
                    <preview-text :article="all_articles[((2*(n-1))+(m-1))]" :chars="200" class="text"/>

                  </b-col>
                </b-row>

              </b-container>
            </div>
        </loader>
    </div>

    </page-wrapper>
</template>

<script>
import Loader from '@/components/Loader'
import PageWrapper from '@/components/PageWrapper'
import ArticleList from '@/components/ArticleList'
import ArticleImage from '@/components/ArticleImage'
import ArticlePreviewText from '@/components/ArticlePreviewText'
import ArticleLink from '@/components/ArticleLink'
import { BContainer } from 'bootstrap-vue'

export default {
    name: 'Home',
    components: {
        Loader,
        ArticleList,
        PageWrapper,
        'preview-image': ArticleImage,
        'preview-text': ArticlePreviewText,
        'arl': ArticleLink,
        BContainer,
    },
    data () {
        return {
            loaded: false,
            articles: [],
            featuredArticleA: {},
            all_articles: [],
        }
    },
    methods: {
        async load () {
            try {
                const response = await this.$http.get('/api/articles/home')
                this.articles = response.data.data.articles
                this.featuredArticleA = this.articles[0]
                this.all_articles = this.articles.slice(1,7)

                this.loaded = true
            } catch (ex) {
                console.log(ex);
            }
        }
    },
    mounted () {
        this.load()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clear-link {
    color: #fff;
    text-decoration: none;
}
.nav-link {
    font-size: 1.5rem;
}
#home-articles {
    text-align: left;
}
#feature-article {
  min-width: 100%;
  --width: calc(var(min-width));
  height: calc(var(--width)*9/16);
}

.title-link {

  font-weight: bold;
  line-height: 1.1;
  font-size: 4.0em;
  font-size: 26px;

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

#feature-title {
  text-align: left;
  font-size: 2.5em;
  position: relative;
  bottom: 100px;
  padding-left: 10px;
  padding-top: 10px;
  z-index: 9;
  background-color: rgba(9,9,9,0.5);
  width: 100%;
  height: 83px;
  /* line-height: 15%; */
  /* color: white; */
}

.article-image {
  width: 100%;
  height: auto;
}

</style>
