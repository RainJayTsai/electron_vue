export default [
    {
        // path: '/',
        // name: 'landing-page',
        // component: require('components/LandingPageView')
        path: '/xxx',
        component: require('components/Editor')
    },
    {
        path: '/',
        component: require('pages/JsonTool')
    },
    {
        path: '*',
        redirect: '/'
    }
]
