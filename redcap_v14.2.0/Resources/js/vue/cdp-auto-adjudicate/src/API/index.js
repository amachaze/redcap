import ddp_records from '@/API/modules/ddp_records'

export default (context, API) => {

  const api = new API({
    modules: {
      ddp_records,
    },
  })

  return api
}