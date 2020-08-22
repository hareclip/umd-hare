<template>
    <div class="outer-wrapper">
        <div class="hero py-2 mb-2">
            <a href="#/"><div class="banner"></div></a>
        </div>
        <b-nav class="hello-nav d-none d-md-flex" align="left">
            <b-nav-item href="#/" class="px-2 border-right">HOME</b-nav-item>
            <b-nav-item href="#/category/1" class="px-2 border-right">NEWS</b-nav-item>
            <b-nav-item href="#/category/2" class="px-2 border-right">OPINION</b-nav-item>
            <b-nav-item href="#/category/5" class="px-2 border-right">SPORTS</b-nav-item>
            <b-nav-item href="#/category/3" class="px-2 border-right">POLITICS</b-nav-item>
            <b-nav-item href="#/category/6" class="px-2 border-right">ARTS</b-nav-item>
            <b-nav-item href="#/category/4" class="px-2 border-right">RABBITHOLE</b-nav-item>
            <b-nav-item href="#/category/7" class="px-2 border-right">BACKPAGE</b-nav-item>
            <b-nav-item href="http://ter.ps/writesatire" class="px-2">WRITE FOR US!</b-nav-item>
            <b-nav-item href="https://twitter.com/theumdhare"><icon :icon="['fab', 'twitter']" class="mr-1"/></b-nav-item>
            <b-nav-item href="https://www.instagram.com/theumdhare/"><icon :icon="['fab', 'instagram']" class="mr-1"/></b-nav-item>
            <b-nav-item href="https://www.facebook.com/The-UMD-Hare-105016634398923/"><icon :icon="['fab', 'facebook']" class="mr-1"/></b-nav-item>
        </b-nav>
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
.hero {
    color: #c0c0c0;
    background-color: #aa0000;
    font-family: serif;
}
.banner {
    background-image: url('/static/banner.png');
    width: 100%;
    padding-top: calc(60px + 3%);
    margin-left: 1rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: left;
}
.pad {
    padding: 1rem 5% 3rem 5%;
}
.nav-link {
    font-family: serif;
    font-size: 1.2rem;
}
</style>
