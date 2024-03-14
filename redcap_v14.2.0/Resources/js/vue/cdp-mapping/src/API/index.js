import settings from '@/API/modules/settings'

export default (context, API) => {

    const api = new API({
      modules: {
          settings,
      },
    })

    return api
}
