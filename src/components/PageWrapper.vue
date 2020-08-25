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
              <b-nav-item href="https://www.facebook.com/The-UMD-Hare-105016634398923/"><icon :icon="['fab', 'facebook']" class="mr-1"/></b-nav-item>
              <b-nav class="search-container mr-4">
                <form action="/search" method="get">
                  <input class="search expandright" id="searchright" type="search" name="q" placeholder="Search">
                  <label class="button searchbutton" for="searchright"><span class="mglass">&#9906;</span></label>
                </form>
              </b-nav>
            </b-nav>

        </b-navbar>
        <hr class="mx-2 mt-2 d-none d-md-block"/>
        <div class="pad">
            <loader :loaded="loaded">
                <slot></slot>
            </loader>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
    name: 'PageWrapper',
    components: {
        Loader,
    },
    props: {
        'loaded': {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {}
    },
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
.pad {
    padding: 1rem 5% 3rem 5%;
}
.nav-link {
    font-family: "Arial";
    font-size: 24px;
    font-weight: bold;
    color: white;
}
.button {
	display: inline-block;
	margin: 4px 2px;
	background-color: #f00;
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

.orient-right {
  position: fixed;
  right: 0;
  margin: 0;
  border: 0;
  padding: 0;
}
</style>
