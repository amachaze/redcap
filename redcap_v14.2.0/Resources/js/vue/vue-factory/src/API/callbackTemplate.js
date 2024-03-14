import settings from '@/API/modules/settings'

export default (context, API) => {

  const api = new API({
    modules: {
        settings,
    },
  })


  api.customFunction = (options={}) => {
    console.log('custom function', options)
    alert(123)
  }

  return api
}