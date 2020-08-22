<template>
    <div id="app">
        <b-navbar type="dark" variant="dark" class="d-md-none">
            <b-navbar-nav class="ml-auto">
                <b-dropdown size="sm" class="my-2 pr-3" variant="outline-light" text="Show Categories...">
                    <b-dropdown-item href="#/">Home Page</b-dropdown-item>
                    <b-dropdown-item href="#/category/1/">News</b-dropdown-item>
                    <b-dropdown-item href="#/category/2/">Opinion</b-dropdown-item>
                    <b-dropdown-item href="#/category/5/">Sports</b-dropdown-item>
                    <b-dropdown-item href="#/category/3/">Politics</b-dropdown-item>
                    <b-dropdown-item href="#/category/6/">Arts</b-dropdown-item>
                    <b-dropdown-item href="#/category/4/">Rabbithole</b-dropdown-item>
                    <b-dropdown-item href="#/category/7/">Backpage</b-dropdown-item>
                    <b-dropdown-item href="http://ter.ps/writesatire">Write for us!</b-dropdown-item>
                </b-dropdown>
            </b-navbar-nav>
        </b-navbar>
        <div id="app-inner">
            <router-view :key="$route.fullPath" style="min-height: fit-content; width: 100%;"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    watch: {
        '$route' (to, from) {
            const meta = to.meta
            if(!meta.customTitle) {
                document.title = meta.title ? meta.title + ' | The Hare' : 'The Hare'
            }
        }
    }
}
</script>

<style>
html, body {
    position: absolute;
    top: 0;
    left: 0;
    /* min-width: fit-content; */
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}
a {
    color: #404040;
}
a:hover {
    color: #a01010;
}
a.inv {
    color: #a01010;
}
a.inv:hover {
    color: #404040;
}
</style>

<style scoped>
#app {
    font-family: serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100% !important;
    position: relative;
}
#app-inner {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: auto;
    min-height: 100%;
    padding-bottom: 10rem;
}
#nav-left {
    min-width: 10rem;
    background-color: #434343;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
}
.nav-link, .nav-left-link, .btn {
    color: #e0e0e0 !important;
    font-weight: bold;
}
.nav-left-link {
    border-bottom: 1px solid #777;
    width: 100%;
    text-align: left;
    padding: 1rem 2rem 0.7rem 1rem;
    font-family: sans-serif;
}
#search-dropdown.b-dropdown-form {
    padding: 0 0.5rem;
}
#search-collapse-div {
    display: flex;
}
#footer {
    background-color: #434343;
    color: white;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10rem;
    font-size: 1.4em;
    font-family: Georgia,Times,Times New Roman,serif; 
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#footer a:link, a:visited {
    text-decoration: underline;
    color: white;
}

#footer a:hover {
    text-decoration: underline;
    color: #a01010;
}

#footer-links {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    width: 50%;
    min-width: 35rem;
}

.footer-link {
    width: 50%;
}
@media screen and (max-width: 768px) {
    #footer-links {
        width: 100%;
        min-width: 0;
    }

    .footer-link {
        width: 100%;
        font-size: 0.7em;
    }
}
</style>
