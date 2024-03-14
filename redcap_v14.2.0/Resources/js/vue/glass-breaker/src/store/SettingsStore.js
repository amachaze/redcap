export default ({defineStore}) => {
    /* const initialState = () => {
        return {
            lang: {},
            user: {
                username: null,
                emails: []
            },
        }
    } */
    const useStore = defineStore('settings', {
        state: () => {
            return {
                counter: 23,
                lang: {},
                user: {
                    username: null,
                    emails: [],
                },
                settings: [],
            }
        },
        actions: {
            loadData(data) {
                this.lang = data.lang
                this.user = data.user
                this.settings = data.settings || []
            },
            increment() {
                console.log('something')
                this.counter++
            }
        },
        getters: {
            
        }
    })
    return useStore
}