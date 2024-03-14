
import Counter from './components/Counter.js'

export default function(props) {
    return {
        Counter,
        $template: /*html*/`
        <h3>Welcome</h3>
        <div v-scope="Counter()"></div>
        `
    }
}