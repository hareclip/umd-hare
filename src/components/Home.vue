<template>
    <div>
        <div class="hero py-2 mb-3">
            <a href="#/"><div class="banner"></div></a>
        </div>
        <b-nav class="hello-nav d-none d-md-flex" align="center">
            <b-nav-item href="#/category/1" class="px-2 border-right">NEWS</b-nav-item>
            <b-nav-item href="#/category/2" class="px-2 border-right">OPINION</b-nav-item>
            <b-nav-item href="#/category/5" class="px-2 border-right">SPORTS</b-nav-item>
            <b-nav-item href="#/category/3" class="px-2 border-right">POLITICS</b-nav-item>
            <b-nav-item href="#/category/6" class="px-2 border-right">ARTS</b-nav-item>
            <b-nav-item href="#/category/4" class="px-2 border-right">RABBITHOLE</b-nav-item>
            <b-nav-item href="#/category/7" class="px-2 border-right">BACKPAGE</b-nav-item>
            <b-nav-item href="http://ter.ps/writesatire" class="px-2">WRITE FOR US!</b-nav-item>
        </b-nav>
	<div class="search-container">
  		<form action="/search" method="get">
    			<input class="search expandright" id="searchright" type="search" name="q" placeholder="Search">
   			<label class="button searchbutton" for="searchright"><span class="mglass">&#9906;</span></label>
 		</form>
	</div>
        <hr class="mx-5 d-none d-md-block"/>
        <article-list :articles="articles" class="d-md-none mx-2 mb-4"/>
        <loader :loaded="loaded">
            <div id="home-articles" class="d-none d-md-flex px-3 mb-4">
                <div id="left-column" class="px-4 border-right">
                    <div v-if="featuredArticleA">
                        <arl :article="featuredArticleA">
                            <preview-image :article="featuredArticleA" class="mb-3 border-top border-danger shadow-sm"/>
                        </arl>
                        <div class="mb-3"><arl :article="featuredArticleA" class="title-link">{{featuredArticleA.title}}</arl></div>
                        <preview-text :article="featuredArticleA" class="text"/>
                    </div>
                    <hr/>
                    <div v-if="featuredArticleB">
                        <arl :article="featuredArticleB">
                            <preview-image :article="featuredArticleB" class="mb-3 border-top border-danger shadow-sm"/>
                        </arl>
                        <div class="mb-3"><arl :article="featuredArticleB" class="title-link">{{featuredArticleB.title}}</arl></div>
                        <preview-text :article="featuredArticleB" class="text"/>
                    </div>
                </div>
                <div id="right-column">
                    <div class="inner-column px-3 border-right">
                        <div v-for="(article, i) in leftArticles" :key="article.id">
                            <hr v-if="i > 0" />
                            <arl :article="article">
                                <preview-image :article="article" class="mb-2 border-top border-danger shadow-sm"/>
                            </arl>
                            <div class="mb-2"><arl :article="article" class="title-link-small">{{article.title}}</arl></div>
                            <preview-text :article="article" :chars="200" class="text"/>
                        </div>
                    </div>
                    <div class="inner-column px-3">
                        <div v-for="(article, i) in rightArticles" :key="article.id">
                            <hr v-if="i > 0" />
                            <arl :article="article">
                                <preview-image :article="article" class="mb-2 border-top border-danger shadow-sm"/>
                            </arl>
                            <div class="mb-2"><arl :article="article" class="title-link-small">{{article.title}}</arl></div>
                            <preview-text :article="article" :chars="200" class="text"/>
                        </div>
                    </div>
                </div>
            </div>
        </loader>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import ArticleList from '@/components/ArticleList'
import ArticleImage from '@/components/ArticleImage'
import ArticlePreviewText from '@/components/ArticlePreviewText'
import ArticleLink from '@/components/ArticleLink'

export default {
    name: 'Home',
    components: {
        Loader,
        ArticleList,
        'preview-image': ArticleImage,
        'preview-text': ArticlePreviewText,
        'arl': ArticleLink,
    },
    data () {
        return {
            loaded: false,
            articles: [],
            featuredArticleA: {},
            featuredArticleB: {},
            leftArticles: [],
            rightArticles: []
        }
    },
    methods: {
        async load () {
            try {
                const response = await this.$http.get('/api/articles/home')
                this.articles = response.data.data.articles
                this.featuredArticleA = this.articles[0]
                this.featuredArticleB = this.articles[1]
                this.leftArticles = this.articles.slice(2,5)
                this.rightArticles = this.articles.slice(5,8)
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
.hero {
    color: #c0c0c0;
    background-color: #aa0000;
    font-family: serif;
}
.hello-nav {
    min-width: 75%;
}
.clear-link {
    color: #fff;
    text-decoration: none;
}
.nav-link {
    font-family: serif;
    font-size: 1.5rem;
}
.banner {
    background-image: url('/static/banner.png');
    width: 100%;
    margin-top: 1rem;
    padding-top: calc(80px + 8%);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
#home-articles {
    text-align: left;
}
#left-column {
    width: 50%;
}
#right-column {
    width: 50%;
    min-width: 30rem;
    display: flex;
    flex-direction: row;
}
.inner-column {
    width: 50%;
}
.title-link {
    font-weight: bold;
    line-height: 1.1;
    font-size: 2.0em;
}
.title-link-small {
    font-weight: bold;
    line-height: 1.1;
    font-size: 1.6em;
}
.text {
    font-size: 1.1rem;
}

.button {
	display: inline-block;
	margin: 4px 2px;
	background-color: #444;
	font-size: 14px;
	padding-left: 32px;
	padding-right: 32px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	color: white;
	text-decoration: none;
	cursor: pointer;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.button:hover {
	transition-duration: 0.4s;
	-moz-transition-duration: 0.4s;
	-webkit-transition-duration: 0.4s;
	-o-transition-duration: 0.4s;
	background-color: white;
	color: black;
}

.search-container {
	position: relative;
	display: inline-block;
	margin: 4px 2px;
	height: 50px;
	width: 50px;
	vertical-align: bottom;
}

.mglass {
	display: inline-block;
	pointer-events: none;
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
}

.searchbutton {
	position: absolute;
	font-size: 22px;
	width: 100%;
	margin: 0;
	padding: 0;
}

.search:focus + .searchbutton {
	transition-duration: 0.4s;
	-moz-transition-duration: 0.4s;
	-webkit-transition-duration: 0.4s;
	-o-transition-duration: 0.4s;
	background-color: white;
	color: black;
}

.search {
	position: absolute;
	left: 49px; /* Button width-1px (Not 50px/100% because that will sometimes show a 1px line between the search box and button) */
	background-color: white;
	outline: none;
	border: none;
	padding: 0;
	width: 0;
	height: 100%;
	z-index: 10;
	transition-duration: 0.4s;
	-moz-transition-duration: 0.4s;
	-webkit-transition-duration: 0.4s;
	-o-transition-duration: 0.4s;
}

.search:focus {
	width: 363px; /* Bar width+1px */
	padding: 0 16px 0 0;
}

.expandright {
	left: auto;
	right: 49px; /* Button width-1px */
}

.expandright:focus {
	padding: 0 0 0 16px;
}

</style>
