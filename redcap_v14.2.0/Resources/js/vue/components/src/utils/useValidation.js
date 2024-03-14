const useValidationManager = () => {
    let errors = {}

    return {
        addError(propertyName, error) {
            const message = error?.message ?? error
            if (!(propertyName in errors)) errors[propertyName] = []
            errors[propertyName].push(message)
        },
        hasErrors() {
            const found = Object.keys(errors).find(
                (_fieldErrors) => _fieldErrors?.length > 0
            )
            return found ? true : false
        },
        errors: () => errors,
    }
}

/**
 * Creates a validation handler based on the provided rules.
 *
 * @param {Object} rules - An object containing validation rules. Each key in this object
 *                         represents a field to be validated. The value for each key is
 *                         a callable function that performs validation for that field.
 *                         The callable should return `true` if the field data is valid,
 *                         or it should throw an error if the validation fails.
 * @returns {Function} A validation function based on the specified rules.
 *
 * @example
 * // Example of a rules object:
 * const validationRules = {
 *   username: (value) => {
 *     if (!value || value.length < 3) {
 *       throw new Error("Username must be at least 3 characters long");
 *     }
 *     return true;
 *   },
 *   email: (value) => {
 *     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 *     if (!emailRegex.test(value)) {
 *       throw new Error("Invalid email format");
 *     }
 *     return true;
 *   }
 * };
 *
 * // Usage of the useValidation function with the defined rules:
 * const validate = useValidation(validationRules);
 * try {
 *   validate({ username: "user", email: "user@example.com" });
 *   // Proceed if validation passes
 * } catch (error) {
 *   // Handle validation error
 * }
 */
export const useValidation = (rules) => {
    const validate = (data) => {
        const validationManager = useValidationManager()

        for (const [key, keyRules] of Object.entries(rules)) {
            for (const rule of keyRules) {
                if (typeof rule !== 'function') {
                    console.warn(
                        `the provided rule ${rule} is not a valid function`
                    )
                    continue
                }
                try {
                    const valid = rule(data?.[key])
                } catch (error) {
                    validationManager.addError(key, error)
                }
            }
        }

        return validationManager
    }

    return validate
}

/**
 * built in validators
 */

export const required = (props) => {
    const message = props?.message ?? `this value is required`
    return (value) => {
        if (typeof value === 'string') {
            value = value.trim()
            if (value.length < 1) throw new Error(message)
        }
        if (!value) throw new Error(message)
    }
}

export const contains = (array = [], props) => {
    const message =
        props?.message ??
        `this value must be one of these: '${array.join(', ')}`
    return (value) => {
        if (!array.includes(value)) throw new Error(message)
    }
}

export const isTrue = (props) => {
    const message = props?.message ?? `this value must be 'true'`
    return (value) => {
        if (value !== true) throw new Error(message)
    }
}

export const isFalse = (props) => {
    const message = props?.message ?? `this value must be 'false'`
    return (value) => {
        if (value !== false) throw new Error(message)
    }
}

/**
 * execute all provided validators and return only the first not being valid.
 * this will stop as soon as the first validators fails.
 * 
 * @param {Array} validators 
 * @throws {Error} 
 */
export const firstError = (validators = []) => {
    return (value) => {
        for (const validator of validators) {
            validator(value)
        }
    }
}
