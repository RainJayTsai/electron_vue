export default [
    {
        // path: '/',
        // name: 'landing-page',
        // component: require('components/LandingPageView')
        path: '/xxx',
        name: 'editor',
        component: require('components/Editor')
    },
    {
        path: '/',
        name: 'fileinput',
        component: require('components/FileInput')
    },
    {
        path: '*',
        redirect: '/'
    }
]
