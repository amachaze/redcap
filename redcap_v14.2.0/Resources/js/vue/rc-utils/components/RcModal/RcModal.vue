<template>
    <transition name="rc-modal">
      <div class="rc-modal-mask" v-if="visible_" @click.self="cancel">
        <div class="rc-modal-wrapper">
          <div class="rc-modal-container">

            <div class="rc-modal-header p-3 d-flex justify-content-between align-items-center">
              <div>
                  <slot name="header"></slot>
              </div>
              <span class="close-button" @click="cancel" v-html="closeText"></span>
            </div>

            <div class="rc-modal-body p-3">
              <slot></slot>
            </div>

            <div class="rc-modal-footer p-3 d-flex">
              <slot name="footer ">
                  <div class="ml-auto">
                      <button class="btn btn-secondary me-2" @click="cancel" v-if="!hideCancel" v-html="cancelText"></button>
                      <button class="btn btn-primary" @click="okClicked" v-html="okText"></button>
                  </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>

const RETURN_VALUE = Object.freeze({
    OK: 1,
    CANCEL: 0,
    ERROR: -1
})
export default {
    emits: ['update:visible', 'show', 'hide', 'mounted'],
    data() {
        return {
            visible_: false,
            status: RETURN_VALUE.CANCEL,
        }
    },
    props: {
        visible: { type: Boolean, default: false },
        backdrop: { type: Boolean, default: false },
        allowOutsideClick: { type: Boolean, default: true },
        hideCancel: { type: Boolean, default: false },
        okText: { type: String, default: 'Ok' },
        cancelText: { type: String, default: 'Cancel' },
        closeText: { type: String, default: '&times;' },
    },
    mounted() {
      this.$emit('mounted', this)
      if(this.visible===true) this.show()
    },
    watch: {
      /**
       * immediate is false or the show animation won't work
       * use mounted instead
       */
      visible: {
        immediate: false,
        handler(value) {
          if(value===true) this.show()
          else this.hide()
        }
      },
      /**
       * apply a class on the body when the modal is open
       */
      visible_(value) {
          const modalOpenClassName = 'rc-modal-open'
          if(value) document.body.classList.add(modalOpenClassName)
          else document.body.classList.remove(modalOpenClassName)
          this.$emit('update:visible', value)
      },
    },
    methods: {
        show() {
            if(!this.visible_) {
                this.visible_ = true
                this.$emit('show', this)
            }
            const promise = new Promise((resolve, reject) => {
                const unwatch = this.$watch('visible_', (newVal, oldVal) => {
                    if(newVal==true) return
                    unwatch()
                    switch (this.status) {
                        case RETURN_VALUE.OK:
                            resolve(true)
                            break;
                        case RETURN_VALUE.CANCEL:
                            resolve(false)
                            break;
                        case RETURN_VALUE.ERROR:
                            reject(true)
                            break;
                        default:
                            break;
                    }
                })
            })
            return promise
        },
        hide() {
            if(this.visible_) {
              this.visible_ = false
              setTimeout(() => {
                this.$emit('hide', this, this.status)
              }, 300) // the time here must match the one in the transition

            }
        },
        toggle() {
            this.visible_ ? this.hide() : this.show()
        },
        /**
         * hide if the user clicks on the outside mask
         */
        cancel(e) {
            this.status = RETURN_VALUE.CANCEL
            this.hide()
        },
        okClicked(e) {
            this.status = RETURN_VALUE.OK
            this.hide()
        },
    }
}
</script>

<style scoped>
.rc-modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  display: table;
  transition: opacity .3s ease;
}

.rc-modal-wrapper {
  max-width: 500px;
  margin: 50px auto;
}

.rc-modal-container {
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  max-height: 80vh;
  width: auto;
  margin: auto;
  /* padding: 20px 20px; */
  background-color: #fff;
  border-radius: .3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.rc-modal-header {
    border-bottom: 1px solid #e9ecef;
}

.rc-modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.rc-modal-header .close-button {
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
}

.rc-modal-body {
    flex: 1;
    overflow: auto;
    border-bottom: 1px solid #e9ecef;
}

.rc-modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.rc-modal-enter {
  opacity: 0;
}

.rc-modal-leave-active {
  opacity: 0;
}

.rc-modal-enter-active .rc-modal-container {
  /* animation: bounceIn .5s; */
  animation: slideIn .3s;
}
.rc-modal-leave-active .rc-modal-container {
  /* animation: bounceIn .5s reverse; */
  animation: slideIn .3s reverse;
}

@keyframes slideIn {
    from,
    to {
        transition: transform ease-out;
    }
    0% {
        transform: translateY(-50px);
    }

    100% {
        transform: translateY(0);
    }


}

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.bounceIn {
  animation-duration: calc(var(--animate-duration) * 0.75);
  animation-name: bounceIn;
}
</style>