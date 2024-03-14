
import stats from '@/API/modules/stats'

export default (context, API) => {

  const api = new API({
    modules: {
      stats,
    },
  })

  /**
   * set a visitor method to remove the pid from
   * the default query params.
   * the pid must be removed because this API calls are made at system level
   * @param {object} params
   * @returns modified paramsobject
   */
   api.visitDefaultQueryParams = (params) => {
    delete params.pid
    return params
  }

  return api
}
