<template>
    <div>
        <p>hello</p>
        <!-- <template v-for="i in elements" :key="i">

            <rc-checkbox :value="`ciaoi${i}`" v-model="checked"  />
        </template> -->
        <div ref="header" />
        {{isIndeterminate}}
        <div>
            {{$store.test.count}}
            <button @click="$store.test.increment()">increment</button>
        </div>
        <div ref="default">
            default values
        </div>
        <div>
            <ul>
                <li v-for="(todo, index) in todos" :key="index">
                <span>{{todo}}</span>
                </li>
            </ul>
            <button @click="getTodos">get todos</button>
        </div>

        <div>
            <span>{{todo}}</span>
            <button @click="getTodo(1)">get todo 1</button>
        </div>

        <rc-checkbox value="ciao" v-model="checked" v-model:indeterminate="isIndeterminate" />
        <button @click="isIndeterminate=!isIndeterminate" class="btn btn-xs btn-secondary">toggle indeterminate</button>
        <div>
            <button class="btn btn-sm btn-primary" @click="currentPage--">decrement page</button>
            <button class="btn btn-sm btn-primary" @click="currentPage++">increment page</button>
            <rc-pagination :per-page="2"  :total-rows="200" :limit="9" v-model="currentPage"/>
        </div>
        <div ref="footer" />
    </div>
</template>

<script>
import storeCallback from '../store'
import apiCallback from '../API'

export default {
    storeCallback,
    apiCallback,
    data() {
        return {
            elements: [...Array(5).keys()],
            checked: [],
            isIndeterminate: false,
            currentPage: 0,
            todo: {},
            todos: [],
        };
    },
    computed: {
        allChecked() {
            return this.checked.length === this.elements.length;
        },
        indeterminate() {
            return this.checked.length > 0 && this.checked.length !== this.elements.length;
        },
    },
    methods: {
        async getTodos() {
            const response = await this.$API.todos.getTodos();
            this.todos = response.data
        },
        async getTodo(id) {
            const response = await this.$API.todos.getTodo(id);
            this.todo = response.data
        },
    },
}
</script>

<style scoped>

</style>