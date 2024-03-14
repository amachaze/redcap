((typeof self !== 'undefined' ? self : this)["webpackChunkcdp_mapping_vue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkcdp_mapping_vue"] || []).push([[123],{

/***/ 7123:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Test; }
});

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Test.vue?vue&type=template&id=2f1c6559&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm._v(" " + _vm._s(_vm.mapping) + " " + _vm._s(_vm.mappingObjects) + " "), _c('draggable', _vm._b({
    on: {
      "input": _vm.onInput,
      "start": function ($event) {
        _vm.drag = true;
      },
      "end": function ($event) {
        _vm.drag = false;
      }
    },
    model: {
      value: _vm.draggable_items,
      callback: function ($$v) {
        _vm.draggable_items = $$v;
      },
      expression: "draggable_items"
    }
  }, 'draggable', _vm.dragOptions, false), [_c('transition-group', {
    attrs: {
      "type": "transition",
      "name": !_vm.drag ? 'flip-list' : null
    }
  }, _vm._l(_vm.draggable_items, function (item) {
    return _c('div', {
      key: item.id,
      staticClass: "draggable-item"
    }, [_vm._v(_vm._s(item.id) + " " + _vm._s(item.name))]);
  }), 0)], 1)], 1);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/vuedraggable/dist/vuedraggable.umd.js
var vuedraggable_umd = __webpack_require__(9980);
var vuedraggable_umd_default = /*#__PURE__*/__webpack_require__.n(vuedraggable_umd);
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(7203);
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Test.vue?vue&type=script&lang=js&


external_commonjs_vue_commonjs2_vue_root_Vue_default().directive('demo', {
  bind: function (el, binding, vnode) {
    el.addEventListener('input', event => {
      console.log(event);
    });
    console.log(el, binding, vnode);
    vnode.elm.value = 'FIRST';
    const component = vnode.context.getConfigProperty(1, 'preselect');
  }
});
/* harmony default export */ var Testvue_type_script_lang_js_ = ({
  components: {
    draggable: (vuedraggable_umd_default())
  },
  async created() {
    const initSelect = async () => {
      const {
        fhir_fields
      } = this.$store.state.settings;
      const cloned_fields = JSON.parse(JSON.stringify(fhir_fields));
      let fields_list = Object.values(cloned_fields); // just get the values as array
      await this.$store.dispatch('fhir_fields_select/setFields', fields_list);
      this.ready = true;
    };
  },
  data() {
    return {
      drag: false,
      ready: false,
      items: [1, 2, 3],
      draggable_items: [{
        id: 1,
        name: 'Francesco'
      }, {
        id: 2,
        name: 'Penny'
      }, {
        id: 3,
        name: 'Betsy'
      }]
    };
  },
  computed: {
    fhir_field_tree() {
      return this.$store.state.fhir_fields_tree.fields[0];
    },
    fhir_field_select() {
      return this.$store.state.fhir_fields_select.fields[0];
    },
    fhir_field() {
      return this.$store.state.settings.fhir_fields;
    },
    mapping() {
      return this.$store.state.mapping.list;
    },
    mappingObjects() {
      return this.$store.getters['mapping/models'];
    },
    dragOptions() {
      return {
        animation: 500,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  methods: {
    onInput(event) {
      console.log(event);
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length);
    },
    add: function () {
      let random = this.randomIndex();
      console.log(random);
      this.items.splice(random, 0, Math.max(...this.items) + 1);
    },
    remove: function () {
      let random = this.randomIndex();
      console.log(random);
      this.items.splice(random, 1);
    }
  }
});
;// CONCATENATED MODULE: ./src/pages/Test.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Testvue_type_script_lang_js_ = (Testvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Test.vue?vue&type=style&index=0&id=2f1c6559&prod&scope=true&lang=css&
var Testvue_type_style_index_0_id_2f1c6559_prod_scope_true_lang_css_ = __webpack_require__(4683);
;// CONCATENATED MODULE: ./src/pages/Test.vue?vue&type=style&index=0&id=2f1c6559&prod&scope=true&lang=css&

// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/pages/Test.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  pages_Testvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Test = (component.exports);

/***/ }),

/***/ 9944:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".list-item{display:inline-block;margin-right:10px}.list-enter-active,.list-leave-active{transition:all 1s}.list-enter,.list-leave-to{opacity:0;transform:translateY(30px)}.draggable-item{padding:10px;border:1px solid #000}.flip-list-move{transition:transform .5s}.no-move{transition:transform 0s}.ghost{opacity:.5;background:#c8ebfb}.list-group{min-height:20px}.list-group-item{cursor:move}.list-group-item i{cursor:pointer}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4683:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9944);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("041403e0", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);