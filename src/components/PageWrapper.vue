<template>
    <div class="outer-wrapper">
        <b-navbar class="hello-nav d-none d-md-flex" align="left">
            <b-nav-item href="#/category/1" class="px-2 ">News</b-nav-item>
            <b-nav-item href="#/category/2" class="px-2 ">Features</b-nav-item>
            <b-nav-item href="#/category/5" class="px-2 ">Sports</b-nav-item>
            <b-nav-item href="#/category/6" class="px-2 ">Art</b-nav-item>
            <b-nav-item href="#/category/4" class="px-2 ">Rabbithole</b-nav-item>
            <b-nav-item href="#/category/?" class="px-2 ">News in Images</b-nav-item>

             <!-- right side of navbar -->
            <b-nav class="orient-right">
              <b-nav-item href="https://twitter.com/theumdhare"><icon :icon="['fab', 'twitter']" class="mr-1"/></b-nav-item>
              <b-nav-item href="https://www.instagram.com/theumdhare/"><icon :icon="['fab', 'instagram']" class="mr-1"/></b-nav-item>
              <b-nav-item href="https://www.facebook.com/TheUMDHare/"><icon :icon="['fab', 'facebook']" class="mr-2"/></b-nav-item>
              <b-nav class="search-container">
                <form action="/search" method="get">
                  <input class="search expandright" id="searchright" type="search" name="q" placeholder="Search">
                  <label class="button searchbutton" for="searchright"><span class="mglass">&#9906;</span></label>
                </form>
              </b-nav>
            </b-nav>

        </b-navbar>

        <b-navbar class="secondary-nav d-none d-md-flex" align="left">
            <b-nav-text class="">More:</b-nav-text>
            <b-nav-item href="#/category/2" class="px-1 ">Advertising</b-nav-item>
            <b-nav-item href="#/category/5" class="px-1 ">Contact</b-nav-item>
            <b-nav-item href="#/category/6" class="px-1 ">Donate</b-nav-item>
            <b-nav-item href="#/category/4" class="px-1 ">Comedy on Campus</b-nav-item>
            <b-nav-item href="#/category/?" class="px-1 ">Our Publishing Schedule</b-nav-item>
            <b-nav-item href="#/category/?" class="px-1 ">Podcast</b-nav-item>
            <b-nav-item href="#/category/?" class="px-1 ">Jobs</b-nav-item>
            <b-nav-item href="#/category/?" class="px-1 ">Merchandise</b-nav-item>
            <b-nav-item href="#/category/?" class="px-1 ">Submissions</b-nav-item>

            </b-nav>

        </b-navbar>

        <hr class="mx-2 mt-2 d-none d-md-block"/>
        <div class="pad">
            <loader :loaded="loaded">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <just-in-list :recentArticles="recentArticles"/>
                        </div>
                        <div class="col-9">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </loader>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import JustInList from '@/components/JustInList'

export default {
    name: 'PageWrapper',
    components: {
        Loader,
        JustInList,
    },
    props: {
        'loaded': {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            recentArticles: [],
        }
    },
    methods: {
        async load () {
            try {
                const response = await this.$http.get(`/api/articles/recent`)
                this.recentArticles = response.data.data.articles
            } catch (ex) {
                console.log(ex);
            }
        }
    },
    mounted () {
        this.load();
    }
}
</script>

<style scoped>
.outer-wrapper {
    width: 100%;
    height: 100%;
}
.hello-nav {
  background: #c12a2a;
  list-style: none;
}
.secondary-nav {
  background: white;
  list-style: none;
}
.pad {
    padding: 1rem 5% 3rem 5%;
}
.nav-link {
    font-family: "Arial";
    font-size: 24px;
    font-weight: bold;
    color: white;
}
.secondary-nav .nav-link {
    font-family: "Verdana";
    font-size: 12px;
    font-weight: bold;
    color: #888888;
}
.secondary-nav .navbar-text {
  font-family: "Verdana";
  color: black;
  font-size: 15px;
  padding-left: 3rem;
}
.orient-right {
  position: fixed;
  top: 5px;
  right: 0;
  /* margin: 0;
  border: 0;
  padding: 0; */
}
.button {
	display: inline-block;
	margin: 4px 2px;
	background-color: #c12a2a;
	font-size: 14px;
	padding-left: 32px;
	padding-right: 32px;
	height: 48px;
	line-height: 48px;
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
	color: #f00;
}
.search-container {
	position: relative;
	display: inline-block;
  /* top: -5px; */
  border-left: 1px solid #888888;
	/* margin: 4px 2px; */
	height: 65px;
	width: 62px;
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
  /* top: 5px; */
	font-size: 30px;
	width: 100%;
  height: 100%;
	margin: 0;
	padding: 0;
  padding-top: 2px;
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

.container {
  float: left;
  width: 120%;
         .row {
            width: 120%;
         }
}

</style>
