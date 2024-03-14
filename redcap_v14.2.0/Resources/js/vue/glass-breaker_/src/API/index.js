import glassBreaker from '@/API/modules/glassBreaker'

export default (context, API) => {

    const api = new API({
      modules: {
        glassBreaker,
      },
    })

    return api
}
