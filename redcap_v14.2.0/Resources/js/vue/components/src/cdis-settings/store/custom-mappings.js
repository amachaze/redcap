import { reactive } from 'vue'
import { saveCustomMapping } from '../API'
import { useError } from '../../utils/ApiClient'
import { deepCompare } from '../../utils'
import { convertToBoolean } from '../../utils'
import {
    useValidation,
    required,
    contains,
    isTrue,
    isFalse,
    firstError,
} from '../../utils/useValidation'

const allowedProperties = [
    'field',
    'temporal',
    'label',
    'description',
    'category',
    'subcategory',
    'identifier',
    'disabled',
    'disabled_reason',
]

export const useHeaders = () => [
    'field',
    'label',
    'description',
    'category',
    'subcategory',
    'temporal',
    'identifier',
    'disabled',
    'disabled_reason',
]

export const useSanitize = (allowedProperties = []) => {
    return (data) => {
        if (!data || typeof data !== 'object') return
        for (const [key, value] of Object.entries(data)) {
            if (allowedProperties.includes(key)) continue
            delete data[key]
        }
        return { ...data }
    }
}

export const normalize = (entry) => {
    const booleanKeys = ['temporal', 'identifier', 'disabled']
    for (const [key, value] of Object.entries(entry)) {
        if (booleanKeys.includes(key)) entry[key] = convertToBoolean(value)
    }
    return entry
}

export const sanitize = useSanitize(allowedProperties)

export default () => {
    const store = reactive({
        validCategories: [],
        originalList: [],
        list: [],
        loading: false,
        // provide default data for a new entry
        useDefaultEntry() {
            return {
                temporal: true,
                identifier: false,
                disabled: false,
            }
        },
        reset() {
            this.list = []
            for (const item of this.originalList) {
                this.list.push({ ...item })
            }
        },
        get isDirty() {
            if (this.originalList.length !== this.list.length) return true

            for (const index in this.originalList) {
                const itemA = this.originalList[index]
                const itemB = this.list[index]
                const equal = deepCompare(itemA, itemB)
                if (!equal) return true
            }
            return false
        },
        remove(item) {
            const list = [...this.list]
            const index = list.findIndex((element) => element === item)
            if (index < 0) return
            const found = list[index] // keep track of the item that will be deleted
            list.splice(index, 1)
            this.list = list
        },
        add(data) {
            this.list.push(data)
        },
        edit(item, data) {
            const index = this.list.findIndex((element) => element === item)
            if (index < 0) return // item not found in the list of items
            const currentItem = this.list[index]
            // update each property of the item
            for (const [key, value] of Object.entries(data)) {
                currentItem[key] = value
            }
            this.list[index] = currentItem
        },
        // set the list of available FHIR systems and set the first one as current
        init(data) {
            const validCategories = data?.validCategories ?? []
            this.validCategories = [...validCategories]
            const list = data?.list ?? []
            this.originalList = [...list]
            this.reset()
        },
        async save() {
            try {
                this.loading = true
                const response = await saveCustomMapping(this.list)
                return response
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        validate(entry) {
            const rules = {
                field: [required()],
                category: [
                    firstError([required(), contains(this.validCategories)]),
                ],
                label: [required()],
                temporal: [
                    isTrue({
                        message: `the 'temporal' field must be set to 'true'`,
                    }),
                ],
                identifier: [
                    isFalse({
                        message: `the 'identifier' field must be set to 'false'`,
                    }),
                ],
            }
            const validate = useValidation(rules)

            const validation = validate(entry)
            return validation
        },
    })

    return store
}
