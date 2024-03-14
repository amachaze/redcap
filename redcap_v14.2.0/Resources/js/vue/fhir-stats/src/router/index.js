import routes from '@/router/routes'


export default (context, VueRouter) => {

    const router = new VueRouter({
        mode: 'hash', // hash|history
        base: process.env.BASE_URL,
        routes
    })
    
    router.beforeEach((to, from, next) => {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            const authorized = true
            if(authorized===true) {
                next()
            }else {   
                next({
                    path: '/',
                    // query: { redirect: to.fullPath }
                })
            }
        }else {
            next() // make sure to always call next()!
        }
    })

    return router
}