export default [
    {
        // path: '/',
        // name: 'landing-page',
        // component: require('components/LandingPageView')
        path: '/',
        name: 'editor',
        component: require('components/Editor')
    },
    {
        path: '*',
        redirect: '/'
    }
]
