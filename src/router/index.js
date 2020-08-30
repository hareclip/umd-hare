import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ArticleView from '@/components/ArticleView'
import CategoryView from '@/components/CategoryView'
import PublishArticle from '@/components/PublishArticle'
import CreateUser from '@/components/CreateUser'
import DeleteArticle from '@/components/DeleteArticle'
import ArchivesList from '@/components/ArchivesList';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/category/:category',
            alias: '/category/:category/*',
            name: 'Category',
            component: CategoryView,
            meta: {
                customTitle: true
            }
        },
        {
            path: '/articles/:id',
            alias: '/articles/:id/*',
            name: 'Article',
            component: ArticleView,
            meta: {
                customTitle: true
            }
        },
        {
            path: '/staff/publish-article',
            name: 'Publish Article',
            component: PublishArticle,
            meta: {
                title: 'Publish Article'
            }
        },
        {
            path: '/admin/create-user',
            name: 'Create User',
            component: CreateUser,
            meta: {
                title: 'Create User'
            }
        },
        {
            path: '/admin/delete-article',
            name: 'Delete Article',
            component: DeleteArticle,
            meta: {
                title: 'Delete Article'
            }
        },
        {
            path: '/archives/:page?',
            name: 'ArchivesList',
            component: ArchivesList,
            meta: {
                title: 'ArchivesList'
            }
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
