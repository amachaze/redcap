import { reactive } from 'vue'
import { useLang } from '../../directives/TranslateDirective'
import { deepCompare } from '../../utils'
import { saveSettings } from '../API'

export default () => {
    return reactive({
        _lang: {},
        breakTheGlassUserTypes: [], // user types for the rbeak-the-glass feature
        redcapConfig: {}, // original data as it comes from the server
        newConfig: {}, // data modified by the user that will be sent if saved
        loading: false,
        redirectURL: '',
        get isDirty() {
            const equal = deepCompare(this.redcapConfig, this.newConfig)
            if (equal) return false
            return true
        },
        get lang() {
            return this._lang
        },
        set lang(value) {
            useLang(value)
            this._lang = value
        },
        reset() {
            this.newConfig = { ...this.redcapConfig }
        },
        async save() {
            try {
                if (this.isDirty) {
                    this.loading = true
                    const response = await saveSettings(this.newConfig)
                    return response
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
    })
}
