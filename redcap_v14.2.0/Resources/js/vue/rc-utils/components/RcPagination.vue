<template>
<div class="rc-pagination">
  <span class="rc-pagination-item first" @click="firstPage()" :class="{disabled: isFirst}">{{SYMBOLS.FIRST}}</span>
  <span class="rc-pagination-item prev" @click="prevPage()" :class="{disabled: isFirst}">{{SYMBOLS.PREV}}</span>
  <template v-for="(index) in pages" :key="`pagination${index}`">
    <template v-if="isEllipsis(index)">
      <span class="rc-pagination-item ellipsis" >{{SYMBOLS.ELLIPSIS}}</span>
    </template>
    <template v-else>
      <span class="rc-pagination-item" @click="changePage(index)" :class="{active: modelValue==index}">{{index}}</span>
    </template>
  </template>
  <span class="rc-pagination-item next" @click="nextPage()" :class="{disabled: isLast}">{{SYMBOLS.NEXT}}</span>
  <span class="rc-pagination-item last" @click="lastPage()" :class="{disabled: isLast}">{{SYMBOLS.LAST}}</span>
</div>
</template>

<script>


const SYMBOLS = Object.freeze({
    FIRST: '«',
    LAST: '»',
    PREV: '‹',
    NEXT: '›',
    ELLIPSIS: '…',
})

const START = 1

export default {
    data() {
        return {
          SYMBOLS,
          currentPage: START,
        }
    },
    props: {
      modelValue: {type: Number, default: START},
      totalRows: {type: Number, default: 0},
      perPage: {type: Number, default: 0},
      limit: {type: Number, default: 5}, // max number of buttons (including ellipsis)
    },
    computed: {
      totalPages() { return Math.ceil(this.totalRows/this.perPage) },
      pages() {
        const pages = []
        let max = this.start+(this.limit-1)
        if(max>this.totalPages) max=this.totalPages
        for (let index = this.start; index <= max; index++) {
          pages.push(index)
        }
        return pages
      },
      start() {
        let start = START
        const currentPage = this.modelValue
        const beginning = START
        const end = this.totalPages
        const delta = Math.ceil(this.limit/2)
        const deltaAdjustment = this.limit%2 // adjust the delta for odd/even rows
        if( currentPage < beginning+delta ) return START // beginning
        if( currentPage > end-delta ) start = end-(this.limit-1) // end
        else start = currentPage-delta+deltaAdjustment
        if(start<0) start=START
        return start
      },
      isFirst() { return this.modelValue==START },
      isLast() { return this.modelValue==this.totalPages },
    },
    methods: {
      changePage(index) {
        if(index<START) return
        if(index>this.totalPages) return
        this.$emit('update:modelValue', index)
      },
      firstPage() { this.changePage(START) },
      prevPage() { this.changePage(this.modelValue-1) },
      nextPage() { this.changePage(this.modelValue+1) },
      lastPage() { this.changePage(this.totalPages) },
      isEllipsis(index) {
        const initialEllipsis = (index!=START && index==this.start)
        const finalEllipsis = (index!=this.totalPages) && (index==this.start+this.limit-1)
        return initialEllipsis || finalEllipsis
      },
    }
}
</script>

<style scoped>
.rc-pagination {
  --main-color: #007bff;
  --secondary-color: white;
  font-size: 1rem;
}
.rc-pagination .rc-pagination-item {
  cursor: pointer;
  display: inline-block;
  border-style: solid;
  border-width: .5px;
  border-color: lightgray;
  padding: 6px 12px;
  user-select: none;
  background-color: var(--secondary-color);
  color: var(--main-color);
  font-weight: normal;
  font-variant-numeric: tabular-nums;
}
.rc-pagination .rc-pagination-item.first {
  border-radius: 5px 0 0 5px;
}
.rc-pagination .rc-pagination-item.last {
  border-radius: 0 5px 5px 0;
}
.rc-pagination-item.active {
  background-color: var(--main-color);
  color: var(--secondary-color);
}
.rc-pagination-item.disabled {
  pointer-events: none;
  color: lightgray;
}
.rc-pagination-item.ellipsis {
  pointer-events: none;
  color: darkgray;
}
</style>