const defaultProps = {
    initialCount: 0
}
export default function(props) {
    props = {...defaultProps, ...props}
    return {
        $template: /*html*/`
        <div v-scope>
            <p>{{ count }}</p>
            <button @click="inc">increment</button>
        </div>
        `,
        count: props.initialCount,
        inc() {
            this.count++
        },
    }
}