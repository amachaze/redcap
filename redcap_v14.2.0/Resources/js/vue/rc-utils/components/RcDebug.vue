<template>
  <div @click="onClick" class="debug-wrapper">
    <div class="debug-indicator" v-if="debug" @click="onIndicatorClicked" :class="[position]">
      <span>debug mode</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { computed } from 'vue'

const clicksToDebug = 7
const timeoutDelay = 500
let timeout = null
const positions = ['position-left', 'position-right']

export default {

  data() {
    return {
      clicks: 0,
      debug: false,
      position: positions[0],
    }
  },
  provide() {
    return {
      // explicitly provide a computed property
      $debugMode: computed(() => this.debug)
    }
  },
  methods: {
    onClick(event) {
      const {shiftKey, altKey, detail} = event
      if(!shiftKey || !altKey) return
      if(timeout) clearTimeout(timeout)
      this.clicks++
      if(clicksToDebug==this.clicks) {
        this.debug = !this.debug
        this.clicks = 0
        if(this.debug) console.log('debug mode enabled')
        else console.log('debug mode disabled')
        return
      }
      timeout = setTimeout(() => {
        this.clicks = 0
      }, timeoutDelay)

    },
    // cicle through available positioning classes
    onIndicatorClicked() {
      let index = positions.indexOf(this.position) // index of the currently used class
      if(index<0) return
      if(++index>=positions.length) index = 0
      this.position = positions[index]
    }
  }
}
</script>

<style scoped>
:root {
  }
div.debug-wrapper {
  --wrapper-width: 200px;
  position: relative;
}
.debug-indicator {
  user-select: none;
  bottom: calc(100% + 5px);
  position: absolute;
  z-index: 9000;
  width: var(--wrapper-width);
  border-radius: .25em;
  background-color: rgb(221, 20, 20);
  box-shadow: 2px 2px 5px rgba(0,0,0,.4);
  text-align: center;
  transition: left ease-in-out 500ms;
}
.debug-indicator.position-left {
  left: 0;
}
.debug-indicator.position-right {
  left: calc(100% - var(--wrapper-width));
}
.debug-indicator.position-left:hover {
  cursor: e-resize;
}
.debug-indicator.position-right:hover {
  cursor: w-resize;
}
.debug-indicator > span {
  text-transform: uppercase;
  transform-origin: top right;
  color: white;
  display: inline-block;
  text-shadow: 1px 1px rgba(0, 0, 0, .5);
  padding: 2px 10px;
}

@keyframes bounce {
  0% {
    left: 0;
  }

  80% {
    left: calc(110% - var(--wrapper-width));
  }

  90% {
    left: calc(95% - var(--wrapper-width));
  }

  100% {
    left: calc(100% - var(--wrapper-width));
  }
}
</style>
