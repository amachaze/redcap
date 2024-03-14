((typeof self !== 'undefined' ? self : this)["webpackChunkcdp_mapping_vue"] = (typeof self !== 'undefined' ? self : this)["webpackChunkcdp_mapping_vue"] || []).push([[542],{

/***/ 7542:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Home; }
});

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Home.vue?vue&type=template&id=73d156f7&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('section', {
    staticClass: "text-justify"
  }, [_c('p', [_vm._v(_vm._s(_vm.translations['rws_description']))]), _c('p', [_vm._v(_vm._s(_vm.translations['rws_description_1']))]), _c('p', [_c('span', [_vm._v(_vm._s(_vm.translations['rws_description_2']))]), _c('span', {
    staticClass: "d-block"
  }, [_c('a', {
    attrs: {
      "href": "#"
    },
    on: {
      "click": function ($event) {
        $event.preventDefault();
        return _vm.onTellMeMoreClicked.apply(null, arguments);
      }
    }
  }, [_vm._v(_vm._s(_vm.translations['tell_me_more']) + ".")])])]), _vm.projectType == 'FHIR' ? _c('MappingHelperPanel', {
    staticClass: "my-2"
  }) : _vm._e()], 1), _c('SettingsTable', {
    staticClass: "mb-2"
  }), _c('MappingTable', {
    scopedSlots: _vm._u([{
      key: "head",
      fn: function () {
        return [_c('ImportExport')];
      },
      proxy: true
    }])
  }), _c('SaveCancel', {
    staticClass: "mt-2"
  }), _c('CDPInfoModal', {
    ref: "info-modal"
  })], 1);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/MappingTable.vue?vue&type=template&id=a55dea78&scoped=true&
var MappingTablevue_type_template_id_a55dea78_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('table', {
    ref: "table",
    staticClass: "table table-bordered table-hover"
  }, [_c('thead', {
    staticClass: "header thead-light"
  }, [_c('tr', [_c('th', {
    attrs: {
      "colspan": "6"
    }
  }, [_c('section', {
    staticClass: "d-flex flex-row justify-content-space-between align-items-center"
  }, [_c('span', {
    staticClass: "mr-auto"
  }, [_vm._v(_vm._s(_vm.translations['mapping_table_title']))]), _vm._t("head")], 2)])]), _c('tr', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.mapping.length > 0,
      expression: "mapping.length>0"
    }],
    staticClass: "col-names"
  }, [_c('th', [_c('span', {
    attrs: {
      "title": _vm.fhirSourceName
    }
  }, [_vm._v(_vm._s(_vm.translations['mapping_table_header_external_source']))])]), _c('th', [_c('span', {
    attrs: {
      "title": _vm.translations['mapping_table_header_event']
    }
  }, [_vm._v(_vm._s(_vm.translations['mapping_table_header_event']))])]), _c('th', [_c('span', {
    attrs: {
      "title": _vm.translations['mapping_table_header_field']
    }
  }, [_vm._v(_vm._s(_vm.translations['mapping_table_header_field']))])]), _c('th', [_c('span', {
    attrs: {
      "title": _vm.translations['mapping_table_header_date']
    }
  }, [_vm._v(_vm._s(_vm.translations['mapping_table_header_date']))])]), _c('th', [_c('span', {
    attrs: {
      "title": _vm.translations['mapping_table_header_preselect_strategy']
    }
  }, [_vm._v(_vm._s(_vm.translations['mapping_table_header_preselect_strategy']))])]), _c('th', [_c('span', {
    attrs: {
      "title": _vm.translations['mapping_table_header_actions']
    }
  }, [_vm._v(_vm._s(_vm.translations['mapping_table_header_actions']))])])])]), _c('transition-group', {
    attrs: {
      "tag": "tbody",
      "name": "list"
    }
  }, [_vm._l(_vm.mapping, function (item, index) {
    return [_c('tr', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: item.status !== 'deleted',
        expression: "item.status!=='deleted'"
      }],
      key: item.id,
      class: [_vm.getStatusClass(item), item === _vm.selected_mapping ? 'selected' : ''],
      attrs: {
        "id": `row-${item.id}`
      }
    }, [_c('td', [item.disabled ? _c('span', {
      directives: [{
        name: "b-tooltip",
        rawName: "v-b-tooltip.hover",
        modifiers: {
          "hover": true
        }
      }],
      staticClass: "text-danger",
      attrs: {
        "title": `${item.disabled_reason}`
      }
    }, [_c('font-awesome-icon', {
      attrs: {
        "icon": ['fas', 'exclamation-circle'],
        "fixed-width": ""
      }
    })], 1) : _vm._e(), _c('FhirFieldLabel', {
      class: {
        disabled: item.disabled
      },
      attrs: {
        "identifier": item.is_record_identifier,
        "name": item.fhir_field_name,
        "label": item.fhir_label,
        "category": item.category
      }
    })], 1), _c('td', [_c('span', {
      attrs: {
        "title": `Event ID: ${item.event_id}`
      }
    }, [_vm._v(_vm._s(_vm.getEventName(item.event_id)))])]), _c('td', [_c('FieldLabel', {
      attrs: {
        "title": `Field Name: ${item.field_name}`,
        "field_name": item.field_name
      }
    })], 1), _c('td', [_c('FieldLabel', {
      attrs: {
        "title": `Temporal Field Name: ${item.temporal_field}`,
        "field_name": item.temporal_field
      }
    })], 1), _c('td', [item.is_temporal ? [_c('PreselectLabel', {
      attrs: {
        "value": item.preselect
      }
    })] : _vm._e()], 2), _c('td', {
      staticClass: "actions"
    }, [_c('div', {
      staticClass: "w-100 d-inline-flex flex-row align-items-center justify-content-end"
    }, [_c('b-button', {
      attrs: {
        "id": `button-edit-${item.id}`,
        "variant": "outline-secondary",
        "size": "sm"
      },
      on: {
        "click": function ($event) {
          return _vm.onEditClicked(item, index);
        }
      }
    }, [_c('font-awesome-icon', {
      staticClass: "text-primary",
      attrs: {
        "icon": ['fas', 'edit']
      }
    })], 1), _c('b-tooltip', {
      attrs: {
        "target": `button-edit-${item.id}`,
        "placement": "bottom"
      }
    }, [_vm._v("Edit")]), !item.is_record_identifier ? [_c('b-button', {
      attrs: {
        "id": `button-copy-${item.id}`,
        "title": _vm.translations['ws_112'],
        "variant": "outline-secondary",
        "size": "sm"
      },
      on: {
        "click": function ($event) {
          return _vm.onCopyClicked(item);
        }
      }
    }, [_c('font-awesome-icon', {
      attrs: {
        "icon": ['fas', 'copy']
      }
    })], 1), _c('b-tooltip', {
      attrs: {
        "target": `button-copy-${item.id}`,
        "placement": "bottom"
      }
    }, [_vm._v("Copy")])] : _vm._e(), [_c('b-button', {
      attrs: {
        "id": `button-delete-${item.id}`,
        "title": _vm.translations['ws_115'],
        "variant": "outline-secondary",
        "size": "sm"
      },
      on: {
        "click": function ($event) {
          return _vm.onDeleteClicked(item);
        }
      }
    }, [_c('font-awesome-icon', {
      staticClass: "text-danger",
      attrs: {
        "icon": ['fas', 'times']
      }
    })], 1), _c('b-tooltip', {
      attrs: {
        "target": `button-delete-${item.id}`,
        "placement": "bottom"
      }
    }, [_vm._v("Delete")])]], 2), item.has_errors ? _c('div', {
      staticClass: "alert alert-warning mt-2"
    }, [_c('span', {
      staticClass: "small"
    }, [_c('font-awesome-icon', {
      staticClass: "text-warning",
      attrs: {
        "icon": ['fas', 'exclamation-triangle']
      }
    }), _vm._v(" Revision needed")], 1), _c('b-button', {
      directives: [{
        name: "b-modal",
        rawName: "v-b-modal",
        value: `validation-errors-modal-${item.id}`,
        expression: "`validation-errors-modal-${item.id}`"
      }],
      attrs: {
        "size": "sm"
      }
    }, [_vm._v("details...")]), _c('b-modal', {
      attrs: {
        "id": `validation-errors-modal-${item.id}`,
        "title": "Validation errors",
        "ok-only": ""
      }
    }, [_c('ul', _vm._l(item.validation_errors, function (error, error_index) {
      return _c('li', {
        key: error_index
      }, [_c('span', [_vm._v(_vm._s(error))])]);
    }), 0)])], 1) : _vm._e(), _vm.mapping_duplicates.indexOf(item.id) > -1 ? _c('div', {
      staticClass: "duplicate-warning"
    }, [_c('span', {
      staticClass: "small text-muted"
    }, [_c('font-awesome-icon', {
      staticClass: "text-warning",
      attrs: {
        "icon": ['fas', 'exclamation-triangle']
      }
    }), _vm._v(" duplicate")], 1)]) : _vm._e(), _vm.mapping_record_identifiers.indexOf(item.id) > 0 ? _c('div', {
      staticClass: "duplicate-warning"
    }, [_c('span', {
      staticClass: "small text-muted"
    }, [_c('font-awesome-icon', {
      staticClass: "text-warning",
      attrs: {
        "icon": ['fas', 'exclamation-triangle']
      }
    }), _vm._v(" record identifier already set")], 1)]) : _vm._e()])])];
  })], 2), _c('tfoot', {
    staticClass: "thead-light"
  }, [_c('tr', [_c('th', {
    attrs: {
      "scope": "row",
      "colspan": "6"
    }
  }, [_vm._t("foot"), _c('button', {
    staticClass: "btn btn-success btn-sm",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.onNewItemClicked
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "plus-circle"
    }
  }), _c('span', [_vm._v(" " + _vm._s(_vm.translations['find_more_sources_fields_to_map']))])], 1)], 2)])])], 1), _c('b-modal', {
    attrs: {
      "title": "Edit",
      "hide-footer": ""
    },
    model: {
      value: _vm.show_edit,
      callback: function ($$v) {
        _vm.show_edit = $$v;
      },
      expression: "show_edit"
    }
  }, [_c('MappingForm', {
    attrs: {
      "mapping": _vm.getMappingConfig(_vm.selected_mapping)
    },
    scopedSlots: _vm._u([{
      key: "footer",
      fn: function ({
        config,
        validation
      }) {
        return [_c('div', {
          staticClass: "d-flex justify-content-end"
        }, [_c('b-button', {
          staticClass: "me-2",
          attrs: {
            "size": "sm",
            "variant": "secondary"
          },
          on: {
            "click": function ($event) {
              _vm.show_edit = false;
            }
          }
        }, [_vm._v("Cancel")]), _c('b-button', {
          attrs: {
            "size": "sm",
            "variant": "success",
            "disabled": validation.$invalid
          },
          on: {
            "click": function ($event) {
              return _vm.update(_vm.selected_mapping, config);
            }
          }
        }, [_vm._v("OK")])], 1)];
      }
    }])
  })], 1), _c('b-modal', {
    attrs: {
      "title": "Create",
      "hide-footer": ""
    },
    model: {
      value: _vm.show_create,
      callback: function ($$v) {
        _vm.show_create = $$v;
      },
      expression: "show_create"
    }
  }, [_c('MappingForm', {
    attrs: {
      "mapping": _vm.new_mapping
    },
    scopedSlots: _vm._u([{
      key: "footer",
      fn: function ({
        config,
        validation
      }) {
        return [_c('div', {
          staticClass: "d-flex justify-content-end"
        }, [_c('b-button', {
          staticClass: "me-2",
          attrs: {
            "size": "sm",
            "variant": "secondary"
          },
          on: {
            "click": function ($event) {
              _vm.show_create = false;
            }
          }
        }, [_vm._v("Cancel")]), _c('b-button', {
          attrs: {
            "size": "sm",
            "variant": "success",
            "disabled": validation.$invalid
          },
          on: {
            "click": function ($event) {
              return _vm.create(config);
            }
          }
        }, [_vm._v("OK")])], 1)];
      }
    }])
  })], 1)], 1);
};
var MappingTablevue_type_template_id_a55dea78_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/FieldLabel.vue?vue&type=template&id=519de945&
var FieldLabelvue_type_template_id_519de945_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.field_data ? _c('span', {
    attrs: {
      "title": _vm.title
    }
  }, [_c('span', {
    staticClass: "d-block small font-weight-bold"
  }, [_vm._v(_vm._s(_vm.field_data.field_name))]), _c('span', {
    staticClass: "d-block",
    domProps: {
      "innerHTML": _vm._s(_vm.field_data.element_label)
    }
  }), _c('span', {
    staticClass: "d-block small muted font-italic"
  }, [_vm._v("(" + _vm._s(_vm.form_data.menu) + ")")])]) : _vm._e();
};
var FieldLabelvue_type_template_id_519de945_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/FieldLabel.vue?vue&type=script&lang=js&
/* harmony default export */ var FieldLabelvue_type_script_lang_js_ = ({
  data() {
    return {
      field_data: {},
      form_data: {}
    };
  },
  computed: {},
  props: {
    field_name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    getFieldData(field_name) {
      return this.$store.getters['app_settings/getFieldData'](field_name);
    },
    getFormData(form_name) {
      return this.$store.getters['app_settings/getFormData'](form_name);
    }
  },
  watch: {
    field_name: {
      immediate: true,
      handler(field_name) {
        this.field_data = this.getFieldData(field_name);
        const {
          form_name
        } = {
          ...this.field_data
        };
        this.form_data = this.getFormData(form_name);
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappingTable/FieldLabel.vue?vue&type=script&lang=js&
 /* harmony default export */ var MappingTable_FieldLabelvue_type_script_lang_js_ = (FieldLabelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1001);
;// CONCATENATED MODULE: ./src/components/MappingTable/FieldLabel.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  MappingTable_FieldLabelvue_type_script_lang_js_,
  FieldLabelvue_type_template_id_519de945_render,
  FieldLabelvue_type_template_id_519de945_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FieldLabel = (component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/FhirFieldLabel.vue?vue&type=template&id=03f6f364&scoped=true&
var FhirFieldLabelvue_type_template_id_03f6f364_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "fhir-field-label"
  }, [_vm.identifier ? [_c('span', {
    staticClass: "identifier small me-2"
  }, [_vm._v("("), _c('font-awesome-icon', {
    staticClass: "text-warning",
    attrs: {
      "icon": "star"
    }
  }), _vm._v(_vm._s(_vm.translations['source_identifier_field']) + ")")], 1)] : _vm._e(), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.name,
      expression: "name"
    }],
    staticClass: "small font-weight-bold"
  }, [_vm._v(_vm._s(_vm.name))]), _c('span', {
    staticClass: "d-block"
  }, [_vm._v(_vm._s(_vm.label))]), _vm.category ? _c('span', {
    staticClass: "d-block font-italic small"
  }, [_vm._v("(" + _vm._s(_vm.category) + ")")]) : _vm._e()], 2);
};
var FhirFieldLabelvue_type_template_id_03f6f364_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/FhirFieldLabel.vue?vue&type=script&lang=js&
/* harmony default export */ var FhirFieldLabelvue_type_script_lang_js_ = ({
  computed: {
    translations() {
      return this.$store.state.app_settings.translations;
    }
  },
  props: {
    identifier: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappingTable/FhirFieldLabel.vue?vue&type=script&lang=js&
 /* harmony default export */ var MappingTable_FhirFieldLabelvue_type_script_lang_js_ = (FhirFieldLabelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/FhirFieldLabel.vue?vue&type=style&index=0&id=03f6f364&prod&scoped=true&lang=css&
var FhirFieldLabelvue_type_style_index_0_id_03f6f364_prod_scoped_true_lang_css_ = __webpack_require__(3728);
;// CONCATENATED MODULE: ./src/components/MappingTable/FhirFieldLabel.vue?vue&type=style&index=0&id=03f6f364&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/MappingTable/FhirFieldLabel.vue



;


/* normalize component */

var FhirFieldLabel_component = (0,componentNormalizer/* default */.Z)(
  MappingTable_FhirFieldLabelvue_type_script_lang_js_,
  FhirFieldLabelvue_type_template_id_03f6f364_scoped_true_render,
  FhirFieldLabelvue_type_template_id_03f6f364_scoped_true_staticRenderFns,
  false,
  null,
  "03f6f364",
  null
  
)

/* harmony default export */ var FhirFieldLabel = (FhirFieldLabel_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/PreselectLabel.vue?vue&type=template&id=457151b4&
var PreselectLabelvue_type_template_id_457151b4_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    domProps: {
      "textContent": _vm._s(_vm.label)
    }
  });
};
var PreselectLabelvue_type_template_id_457151b4_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/PreselectLabel.vue?vue&type=script&lang=js&
/* harmony default export */ var PreselectLabelvue_type_script_lang_js_ = ({
  computed: {
    options() {
      return this.$store.getters['app_settings/getPreselectOptions'];
    },
    label() {
      let option = this.options.find(option => option.value === this.value);
      if (!option) return '';
      return option.label;
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappingTable/PreselectLabel.vue?vue&type=script&lang=js&
 /* harmony default export */ var MappingTable_PreselectLabelvue_type_script_lang_js_ = (PreselectLabelvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/MappingTable/PreselectLabel.vue





/* normalize component */
;
var PreselectLabel_component = (0,componentNormalizer/* default */.Z)(
  MappingTable_PreselectLabelvue_type_script_lang_js_,
  PreselectLabelvue_type_template_id_457151b4_render,
  PreselectLabelvue_type_template_id_457151b4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PreselectLabel = (PreselectLabel_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingForm.vue?vue&type=template&id=782a8651&scoped=true&
var MappingFormvue_type_template_id_782a8651_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "fhir-field"
    }
  }, [_vm._v(_vm._s(_vm.translations['mapping_table_header_external_source']))]), _c('FhirFieldsSelect', {
    model: {
      value: _vm.external_source_field_name,
      callback: function ($$v) {
        _vm.external_source_field_name = $$v;
      },
      expression: "external_source_field_name"
    }
  })], 1), _c('div', {
    staticClass: "form-group mt-2 d-flex redcap-event-field"
  }, [_c('div', [_c('label', {}, [_vm._v(_vm._s(_vm.translations['form_label_redcap_event']))]), _c('Events', {
    staticClass: "w-100",
    attrs: {
      "options": _vm.arms,
      "disabled": _vm.events_disabled
    },
    model: {
      value: _vm.event_id,
      callback: function ($$v) {
        _vm.event_id = $$v;
      },
      expression: "event_id"
    }
  })], 1), _c('div', {
    staticClass: "ms-2"
  }, [_c('label', {}, [_vm._v(_vm._s(_vm.translations['form_label_redcap_field']))]), _c('Fields', {
    attrs: {
      "options": _vm.getForms(_vm.event_id)
    },
    model: {
      value: _vm.redcap_field,
      callback: function ($$v) {
        _vm.redcap_field = $$v;
      },
      expression: "redcap_field"
    }
  })], 1)]), _c('div', {
    staticClass: "form-group mt-2 d-flex"
  }, [_c('div', {
    staticClass: "w-100"
  }, [_c('label', {
    attrs: {
      "for": "datetime-field"
    }
  }, [_vm._v(_vm._s(_vm.translations['form_label_date_time']))]), _c('Fields', {
    attrs: {
      "options": _vm.groupedTemporalFields,
      "disabled": _vm.disabledTemporal
    },
    model: {
      value: _vm.temporal_field,
      callback: function ($$v) {
        _vm.temporal_field = $$v;
      },
      expression: "temporal_field"
    }
  })], 1), _c('div', {
    staticClass: "w-100 ms-2"
  }, [_c('label', {
    attrs: {
      "for": "preselect-field"
    }
  }, [_vm._v(_vm._s(_vm.translations['form_label_preselect_strategy']))]), _c('SelectPreselectedValue', {
    attrs: {
      "disabled": _vm.disabledTemporal
    },
    model: {
      value: _vm.preselect_value,
      callback: function ($$v) {
        _vm.preselect_value = $$v;
      },
      expression: "preselect_value"
    }
  })], 1)]), _c('footer', [_vm._t("footer", null, {
    "config": _vm.config,
    "validation": _vm.$v
  })], 2)]);
};
var MappingFormvue_type_template_id_782a8651_scoped_true_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/vuelidate/lib/validators/index.js
var validators = __webpack_require__(379);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/SelectProjectField.vue?vue&type=template&id=40fd2dd8&
var SelectProjectFieldvue_type_template_id_40fd2dd8_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.selected,
      expression: "selected"
    }],
    staticClass: "form-control-sm",
    on: {
      "change": function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.selected = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("-- none --")]), _vm._l(_vm.options, function (category, category_name) {
    return _c('optgroup', {
      key: category_name,
      attrs: {
        "label": category_name
      }
    }, _vm._l(category || [], function (label, key) {
      return _c('option', {
        key: key,
        domProps: {
          "value": key
        }
      }, [_vm._v(_vm._s(label))]);
    }), 0);
  })], 2);
};
var SelectProjectFieldvue_type_template_id_40fd2dd8_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/SelectProjectField.vue?vue&type=script&lang=js&
/* harmony default export */ var SelectProjectFieldvue_type_script_lang_js_ = ({
  computed: {
    /**
     * calculate the label for the arm
     */
    // arm_label() {return (index, name) => `Arm ${index}: ${name}`},
    /**
     * get v-model to work with props
     */
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  props: {
    options: {
      type: [Array, Object],
      default: () => []
    },
    /**
     * manipulated by v-model
     */
    value: {
      type: [Number, String],
      default: ''
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappingTable/SelectProjectField.vue?vue&type=script&lang=js&
 /* harmony default export */ var MappingTable_SelectProjectFieldvue_type_script_lang_js_ = (SelectProjectFieldvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/MappingTable/SelectProjectField.vue





/* normalize component */
;
var SelectProjectField_component = (0,componentNormalizer/* default */.Z)(
  MappingTable_SelectProjectFieldvue_type_script_lang_js_,
  SelectProjectFieldvue_type_template_id_40fd2dd8_render,
  SelectProjectFieldvue_type_template_id_40fd2dd8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SelectProjectField = (SelectProjectField_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/SelectPreselectedValue.vue?vue&type=template&id=059eeb96&scoped=true&
var SelectPreselectedValuevue_type_template_id_059eeb96_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('b-dropdown', _vm._b({
    staticClass: "scrollable",
    attrs: {
      "size": "sm",
      "lazy": "",
      "block": "",
      "variant": "outline-secondary"
    },
    scopedSlots: _vm._u([{
      key: "button-content",
      fn: function () {
        return [!_vm.label ? _c('span', {
          staticClass: "label"
        }, [_vm._v("Select...")]) : _c('span', {
          staticClass: "label"
        }, [_vm._v(_vm._s(_vm.label))])];
      },
      proxy: true
    }])
  }, 'b-dropdown', _vm.$attrs, false), _vm._l(_vm.options || [], function (option, index) {
    return _c('b-dropdown-item-button', {
      key: index,
      attrs: {
        "active": option.value === _vm.selected
      },
      on: {
        "click": function ($event) {
          _vm.selected = option.value;
        }
      }
    }, [_c('span', [_vm._v(_vm._s(option.label))])]);
  }), 1);
};
var SelectPreselectedValuevue_type_template_id_059eeb96_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/SelectPreselectedValue.vue?vue&type=script&lang=js&
/* harmony default export */ var SelectPreselectedValuevue_type_script_lang_js_ = ({
  computed: {
    /**
     * get v-model to work with props
     */
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    label() {
      for (let {
        value,
        label
      } of this.options) {
        if (value == this.value) return label;
      }
      return false;
    },
    options() {
      const options = this.$store.getters['app_settings/getPreselectOptions'];
      return options;
    }
  },
  props: {
    /* options: {
        type: [Array,Object],
        default: ()=>[]
    }, */
    /**
     * manipulated by v-model
     */
    value: {
      type: [Number, String],
      default: null
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappingTable/SelectPreselectedValue.vue?vue&type=script&lang=js&
 /* harmony default export */ var MappingTable_SelectPreselectedValuevue_type_script_lang_js_ = (SelectPreselectedValuevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/SelectPreselectedValue.vue?vue&type=style&index=0&id=059eeb96&prod&scoped=true&lang=css&
var SelectPreselectedValuevue_type_style_index_0_id_059eeb96_prod_scoped_true_lang_css_ = __webpack_require__(4799);
;// CONCATENATED MODULE: ./src/components/MappingTable/SelectPreselectedValue.vue?vue&type=style&index=0&id=059eeb96&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/MappingTable/SelectPreselectedValue.vue



;


/* normalize component */

var SelectPreselectedValue_component = (0,componentNormalizer/* default */.Z)(
  MappingTable_SelectPreselectedValuevue_type_script_lang_js_,
  SelectPreselectedValuevue_type_template_id_059eeb96_scoped_true_render,
  SelectPreselectedValuevue_type_template_id_059eeb96_scoped_true_staticRenderFns,
  false,
  null,
  "059eeb96",
  null
  
)

/* harmony default export */ var SelectPreselectedValue = (SelectPreselectedValue_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/Select.vue?vue&type=template&id=702d5c25&scoped=true&
var Selectvue_type_template_id_702d5c25_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "main"
  }, [_c('b-dropdown', {
    ref: "dropdown",
    staticClass: "fhir-dropdown",
    attrs: {
      "text": _vm.dropDownText,
      "block": "",
      "lazy": "",
      "variant": "outline-secondary",
      "size": "sm",
      "menu-class": "w-100"
    },
    on: {
      "shown": _vm.onDropdownShown
    }
  }, [_c('b-dropdown-form', [_c('b-form-group', {
    staticClass: "my-0",
    attrs: {
      "label": "",
      "label-for": "filter-fields"
    },
    on: {
      "submit": function ($event) {
        $event.stopPropagation();
        $event.preventDefault();
      }
    }
  }, [_c('b-form-input', {
    ref: "filter",
    attrs: {
      "id": "filter-fields",
      "size": "sm",
      "placeholder": "filter fields...",
      "autocomplete": "off"
    },
    on: {
      "input": _vm.onFilterInput
    },
    model: {
      value: _vm.filter,
      callback: function ($$v) {
        _vm.filter = $$v;
      },
      expression: "filter"
    }
  })], 1)], 1), _c('b-dropdown-text', [_c('SelectNode', {
    attrs: {
      "data": _vm.groups,
      "id": "nodes"
    }
  })], 1)], 1)], 1);
};
var Selectvue_type_template_id_702d5c25_scoped_true_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(6486);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/SelectNode.vue?vue&type=template&id=12afc25a&scoped=true&
var SelectNodevue_type_template_id_12afc25a_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.hasVisibleChildren ? _c('div', {
    staticClass: "main",
    style: {
      'marginLeft': (_vm.depth - 1) * 20 + 'px'
    }
  }, [_vm.name ? _c('header', {
    staticClass: "group-head"
  }, [_c('div', {
    staticClass: "group-name",
    on: {
      "click": _vm.toggleCollapse
    }
  }, [_c('font-awesome-icon', {
    staticClass: "me-1",
    class: {
      'fa-rotate-90': !_vm.collapsed
    },
    attrs: {
      "icon": "angle-right"
    }
  }), _vm.name ? _c('strong', [_vm._v(_vm._s(_vm.name))]) : _vm._e(), _c('div', {
    staticClass: "small text-muted"
  }, [_vm.hidden_fields.length > 0 ? _c('span', [_vm._v(" (showing " + _vm._s(_vm.visible_fields.length) + " of " + _vm._s(_vm.fields.length) + " field" + _vm._s(_vm.fields.length == 1 ? '' : 's') + ")")]) : _vm._e()])], 1)]) : _vm._e(), !_vm.collapsed ? [_vm._l(_vm.data, function (child, child_key) {
    return ['field' in child && !child.hidden ? _c('Leaf', {
      key: `cat_${child_key}`,
      attrs: {
        "data": child
      },
      nativeOn: {
        "click": function ($event) {
          return _vm.onLeafClicked(child);
        }
      }
    }) : !('field' in child) ? _c('SelectNode', {
      key: `cat_${child_key}`,
      attrs: {
        "name": child_key,
        "data": child,
        "depth": _vm.depth + 1
      }
    }) : _vm._e()];
  })] : _vm._e()], 2) : _vm._e();
};
var SelectNodevue_type_template_id_12afc25a_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/Leaf.vue?vue&type=template&id=4ddf346b&scoped=true&
var Leafvue_type_template_id_4ddf346b_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "leaf"
  }, [_c('label', {
    attrs: {
      "for": `checkbox_${_vm.data.field}`
    }
  }, [_c('span', {
    class: {
      disabled: _vm.data.disabled
    },
    domProps: {
      "innerHTML": _vm._s(`• ${_vm.data.field} (${_vm.data.label})`)
    }
  }), _c('span', {
    directives: [{
      name: "b-tooltip",
      rawName: "v-b-tooltip.hover",
      modifiers: {
        "hover": true
      }
    }],
    attrs: {
      "title": `${_vm.data.description}`
    }
  }, [_c('font-awesome-icon', {
    staticClass: "ms-2",
    attrs: {
      "icon": "info-circle"
    }
  })], 1)]), _vm.data.disabled ? _c('span', {
    directives: [{
      name: "b-tooltip",
      rawName: "v-b-tooltip.hover",
      modifiers: {
        "hover": true
      }
    }],
    staticClass: "text-danger",
    attrs: {
      "title": `${_vm.data.disabled_reason}`
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": ['fas', 'exclamation-circle'],
      "fixed-width": ""
    }
  })], 1) : _vm._e()]);
};
var Leafvue_type_template_id_4ddf346b_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/Leaf.vue?vue&type=script&lang=js&
/* harmony default export */ var Leafvue_type_script_lang_js_ = ({
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
});
;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/Leaf.vue?vue&type=script&lang=js&
 /* harmony default export */ var FhirFieldsDropDown_Leafvue_type_script_lang_js_ = (Leafvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/Leaf.vue?vue&type=style&index=0&id=4ddf346b&prod&lang=css&
var Leafvue_type_style_index_0_id_4ddf346b_prod_lang_css_ = __webpack_require__(543);
;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/Leaf.vue?vue&type=style&index=0&id=4ddf346b&prod&lang=css&

// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/Leaf.vue?vue&type=style&index=1&id=4ddf346b&prod&scoped=true&lang=css&
var Leafvue_type_style_index_1_id_4ddf346b_prod_scoped_true_lang_css_ = __webpack_require__(4573);
;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/Leaf.vue?vue&type=style&index=1&id=4ddf346b&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/Leaf.vue



;



/* normalize component */

var Leaf_component = (0,componentNormalizer/* default */.Z)(
  FhirFieldsDropDown_Leafvue_type_script_lang_js_,
  Leafvue_type_template_id_4ddf346b_scoped_true_render,
  Leafvue_type_template_id_4ddf346b_scoped_true_staticRenderFns,
  false,
  null,
  "4ddf346b",
  null
  
)

/* harmony default export */ var Leaf = (Leaf_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/SelectNode.vue?vue&type=script&lang=js&


/* harmony default export */ var SelectNodevue_type_script_lang_js_ = ({
  name: 'SelectNode',
  components: {
    Node,
    Leaf: Leaf
  },
  data() {
    return {
      is_collapsed: true,
      metadata: {},
      selected: []
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    depth: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: null
    }
  },
  computed: {
    /**
     * compute fields from metadata
     */
    fields() {
      const {
        fields = []
      } = this.metadata;
      return fields;
    },
    /**
     * compute hidden fields form metadata
     */
    hidden_fields() {
      const {
        hidden_fields = []
      } = this.metadata;
      return hidden_fields;
    },
    /**
     * compute visible fields from metadata
     */
    visible_fields() {
      const {
        fields = [],
        hidden_fields = []
      } = this.metadata;
      const visible_fields = fields.filter(field => hidden_fields.indexOf(field) < 0);
      return visible_fields;
    },
    hasVisibleChildren() {
      return this.visible_fields.length > 0;
    },
    collapsed: {
      get() {
        if (this.name.trim() === '') return false;else return this.is_collapsed;
      },
      set(value) {
        this.is_collapsed = value;
      }
    }
  },
  methods: {
    onLeafClicked(child) {
      this.$root.$emit('fieldSelected', child);
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    /**
     * parse the data of the node and collect all leaves.
     * leaves have the 'field' property
     */
    parseChildren(data, accumulator = {
      fields: [],
      hidden_fields: []
    }) {
      for (let [key, child] of Object.entries(data)) {
        if (typeof child == 'object' && 'field' in child) {
          accumulator.fields.push(key);
          if ('hidden' in child && child.hidden == true) accumulator.hidden_fields.push(key);
        } else accumulator = this.parseChildren(child, accumulator);
      }
      return accumulator;
    }
  },
  watch: {
    /**
     * collect children when the data is updated (i.e. filtered)
     */
    data: {
      immediate: true,
      deep: true,
      handler(value) {
        this.metadata = this.parseChildren(value);
      }
    },
    /**
     * watch the visible fields and manage collapsing based on the filter state
     */
    visible_fields: {
      immediate: true,
      deep: true,
      handler(value, old_value) {
        const filter = this.$store.state.fhir_fields_select.filter;
        if (filter.trim() == '') this.is_collapsed = true;else if (value.length > 0) this.is_collapsed = false;
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/SelectNode.vue?vue&type=script&lang=js&
 /* harmony default export */ var FhirFieldsDropDown_SelectNodevue_type_script_lang_js_ = (SelectNodevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/SelectNode.vue?vue&type=style&index=0&id=12afc25a&prod&scoped=true&lang=css&
var SelectNodevue_type_style_index_0_id_12afc25a_prod_scoped_true_lang_css_ = __webpack_require__(3081);
;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/SelectNode.vue?vue&type=style&index=0&id=12afc25a&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/SelectNode.vue



;


/* normalize component */

var SelectNode_component = (0,componentNormalizer/* default */.Z)(
  FhirFieldsDropDown_SelectNodevue_type_script_lang_js_,
  SelectNodevue_type_template_id_12afc25a_scoped_true_render,
  SelectNodevue_type_template_id_12afc25a_scoped_true_staticRenderFns,
  false,
  null,
  "12afc25a",
  null
  
)

/* harmony default export */ var SelectNode = (SelectNode_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/Select.vue?vue&type=script&lang=js&



/* harmony default export */ var Selectvue_type_script_lang_js_ = ({
  components: {
    SelectNode: SelectNode
  },
  data() {
    return {
      filter: '',
      filtered_fields: [],
      groups: {}
    };
  },
  props: {
    value: {
      type: String,
      default: null
    }
  },
  /**
   * listen for filter updates
   */
  created() {
    this.$root.$on('fieldSelected', this.onFieldSelected);
    /**
     * run only once when created
     * this is the best way to use debounce in vue
     * @see https://stackoverflow.com/a/49780382
     */
    const initInputDebounce = () => {
      this.onFilterInput = (0,lodash.debounce)(e => {
        this.setGroups();
      }, 400);
    };
    initInputDebounce();
  },
  destroyed() {
    this.$root.$off('fieldSelected', this.onFieldSelected);
  },
  computed: {
    fields() {
      return this.$store.state.fhir_fields_select.fields;
    },
    mapping() {
      return this.$store.state.mapping.list;
    },
    dropDownText() {
      if (!this.fhir_field) return 'Select...';
      const {
        field,
        description
      } = this.fhir_field;
      return `${field} (${description})`;
    },
    fhir_field() {
      if (!this.selected) return;
      const fhir_field = this.$store.getters['app_settings/getFhirField'](this.selected);
      return fhir_field;
    },
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  },
  methods: {
    onDropdownShown() {
      const filter_input = this.$refs.filter;
      if (filter_input) filter_input.focus();
    },
    onFieldSelected(child) {
      this.selected = child.field;
      this.$refs.dropdown.hide();
    },
    getSkipFields() {
      const fhir_id_key = 'id';
      const mapping = [...this.mapping];
      const skip_fields = [];
      const fhir_id_is_set = mapping.some(item => item.fhir_field_name === fhir_id_key);
      if (fhir_id_is_set) skip_fields.push(fhir_id_key);
      return skip_fields;
    },
    setGroups() {
      const fields = [...this.fields];
      let groupedFields = {};
      for (let field of fields) {
        field = this.applyFilter(this.filter, field);
        if (!field) continue;
        let category = field.category || '';
        let subcategory = field.subcategory || '';
        let field_name = field.field || '';
        if (typeof groupedFields[category] === 'undefined') {
          groupedFields[category] = {};
        }
        if (subcategory.trim() != '') {
          if (typeof groupedFields[category][subcategory] === 'undefined') groupedFields[category][subcategory] = {};
          groupedFields[category][subcategory][field_name] = field;
        } else groupedFields[category][field_name] = field;
      }
      this.groups = {
        ...groupedFields
      };
    },
    applyFilter(filter, field) {
      let filter_regexp = new RegExp(`(${filter})`, 'ig');

      // list of properties to check
      let properties_to_check = [field.field, field.category, field.subcategory, field.label, field.description];
      let matches = properties_to_check.some(property => {
        if (typeof property !== 'string') return false;
        return property.match(filter_regexp);
      });
      if (!matches) {
        field.hidden = true;
      } else {
        field.hidden = false;
      }
      return field;
    }
    // async applyFilter() { await this.$store.dispatch('fhir_fields_select/applyFilter') },
  },

  watch: {
    fields: {
      immediate: true,
      handler() {
        this.setGroups();
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/Select.vue?vue&type=script&lang=js&
 /* harmony default export */ var FhirFieldsDropDown_Selectvue_type_script_lang_js_ = (Selectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/FhirFieldsDropDown/Select.vue?vue&type=style&index=0&id=702d5c25&prod&scoped=true&lang=css&
var Selectvue_type_style_index_0_id_702d5c25_prod_scoped_true_lang_css_ = __webpack_require__(8471);
;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/Select.vue?vue&type=style&index=0&id=702d5c25&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/FhirFieldsDropDown/Select.vue



;


/* normalize component */

var Select_component = (0,componentNormalizer/* default */.Z)(
  FhirFieldsDropDown_Selectvue_type_script_lang_js_,
  Selectvue_type_template_id_702d5c25_scoped_true_render,
  Selectvue_type_template_id_702d5c25_scoped_true_staticRenderFns,
  false,
  null,
  "702d5c25",
  null
  
)

/* harmony default export */ var Select = (Select_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/EventFieldsDropDown.vue?vue&type=template&id=0cf6bb73&scoped=true&
var EventFieldsDropDownvue_type_template_id_0cf6bb73_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('nav', {
    class: {
      'show': _vm.show
    },
    attrs: {
      "id": "dropdown",
      "role": "navigation"
    }
  }, [_c('button', {
    on: {
      "click": function ($event) {
        _vm.show = !_vm.show;
      },
      "blur": _vm.onBlur
    }
  }, [_vm._v("events")]), _c('ul', _vm._l(_vm.project.arms, function (arm, arm_key) {
    return _c('li', {
      key: arm_key
    }, [_c('span', [_vm._v(_vm._s(arm.name))]), _c('ul', _vm._l(arm.events, function (event, event_key) {
      return _c('li', {
        key: event_key
      }, [_c('span', [_vm._v(_vm._s(event.descrip))]), _vm.project.events_forms[event_key] ? _c('ul', _vm._l(_vm.project.events_forms[event_key], function (form, forms_index) {
        return _c('li', {
          key: forms_index
        }, [_c('span', [_vm._v(_vm._s(_vm.project.forms[form].menu))]), _c('ul', _vm._l(_vm.project.forms[form].fields, function (field, field_key) {
          return _c('li', {
            key: field_key
          }, [_c('span', [_vm._v(_vm._s(field) + " (" + _vm._s(field_key) + ")")])]);
        }), 0)]);
      }), 0) : _vm._e()]);
    }), 0)]);
  }), 0)]);
};
var EventFieldsDropDownvue_type_template_id_0cf6bb73_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/EventFieldsDropDown.vue?vue&type=script&lang=js&

/* harmony default export */ var EventFieldsDropDownvue_type_script_lang_js_ = ({
  data() {
    return {
      open: [],
      show: false
    };
  },
  computed: {
    project() {
      return this.$store.state.app_settings.project;
    }
  },
  mounted: function () {
    this.$el.$on('bv::dropdown::show', bvEvent => {
      this.open.push(bvEvent.vueTarget);
    });
    this.$el.$on('bv::dropdown::hide', bvEvent => {
      let index = this.open.indexOf(bvEvent.vueTarget);
      if (index < 0 || index == open.length - 1) {
        let open = [...this.open];
        open.splice(index, 1);
        this.open = open;
      } else {
        // check for any focused element and close all if no children has focus
        const focused_elements = this.$refs.wrapper.querySelectorAll('*:focus');
        if (focused_elements.length > 0) bvEvent.preventDefault();else this.open = [];
      }
    });
  },
  methods: {
    onBlur(event) {
      console.log(event);
      // this.show = false
    }
  }
});
;// CONCATENATED MODULE: ./src/components/EventFieldsDropDown.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_EventFieldsDropDownvue_type_script_lang_js_ = (EventFieldsDropDownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/EventFieldsDropDown.vue?vue&type=style&index=0&id=0cf6bb73&prod&scoped=true&lang=css&
var EventFieldsDropDownvue_type_style_index_0_id_0cf6bb73_prod_scoped_true_lang_css_ = __webpack_require__(6345);
;// CONCATENATED MODULE: ./src/components/EventFieldsDropDown.vue?vue&type=style&index=0&id=0cf6bb73&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/EventFieldsDropDown.vue



;


/* normalize component */

var EventFieldsDropDown_component = (0,componentNormalizer/* default */.Z)(
  components_EventFieldsDropDownvue_type_script_lang_js_,
  EventFieldsDropDownvue_type_template_id_0cf6bb73_scoped_true_render,
  EventFieldsDropDownvue_type_template_id_0cf6bb73_scoped_true_staticRenderFns,
  false,
  null,
  "0cf6bb73",
  null
  
)

/* harmony default export */ var EventFieldsDropDown = (EventFieldsDropDown_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RedcapField/RedcapFieldSelect.vue?vue&type=template&id=f6b38814&scoped=true&
var RedcapFieldSelectvue_type_template_id_f6b38814_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('section', {
    staticClass: "wrapper"
  }, [_vm._t("event-header", function () {
    return [_c('span', {
      staticClass: "small"
    }, [_vm._v("Event")])];
  }), _c('Events', {
    attrs: {
      "options": _vm.arms
    },
    model: {
      value: _vm.selected_event_id,
      callback: function ($$v) {
        _vm.selected_event_id = $$v;
      },
      expression: "selected_event_id"
    }
  })], 2), _c('section', {
    staticClass: "wrapper"
  }, [_vm._t("field-header", function () {
    return [_c('span', {
      staticClass: "small"
    }, [_vm._v("Field")])];
  }), _c('Fields', {
    attrs: {
      "options": _vm.forms
    },
    model: {
      value: _vm.selected_field_key,
      callback: function ($$v) {
        _vm.selected_field_key = $$v;
      },
      expression: "selected_field_key"
    }
  })], 2)]);
};
var RedcapFieldSelectvue_type_template_id_f6b38814_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RedcapField/Events.vue?vue&type=template&id=47cb2636&scoped=true&
var Eventsvue_type_template_id_47cb2636_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('b-dropdown', _vm._b({
    staticClass: "scrollable",
    attrs: {
      "size": "sm",
      "lazy": "",
      "block": "",
      "variant": "outline-secondary"
    },
    scopedSlots: _vm._u([{
      key: "button-content",
      fn: function () {
        return [!_vm.label ? _c('span', {
          staticClass: "label"
        }, [_vm._v("Select...")]) : _c('span', {
          staticClass: "label"
        }, [_vm._v(_vm._s(_vm.label))])];
      },
      proxy: true
    }])
  }, 'b-dropdown', _vm.$attrs, false), [_vm.options_length < 1 ? _c('b-dropdown-text', [_vm._v("No data")]) : _vm._l(_vm.options, function (arm, arm_index) {
    return _c('b-dropdown-group', {
      key: arm_index
    }, [_c('b-dropdown-header', [_c('span', [_vm._v(_vm._s(_vm.getArmLabel(arm_index, arm.name)))])]), _vm._l(arm.events || [], function (event, event_id) {
      return _c('b-dropdown-item-button', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.eventHasForms(event_id),
          expression: "eventHasForms(event_id)"
        }],
        key: event_id,
        attrs: {
          "active": event_id === _vm.selected
        },
        on: {
          "click": function ($event) {
            return _vm.onClick(event_id, arm, arm_index);
          }
        }
      }, [_c('span', [_vm._v(_vm._s(event.descrip) + " (" + _vm._s(_vm.getArmLabel(arm_index, arm.name)) + ")")])]);
    }), _c('b-dropdown-divider')], 2);
  })], 2);
};
var Eventsvue_type_template_id_47cb2636_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RedcapField/Events.vue?vue&type=script&lang=js&
/* harmony default export */ var Eventsvue_type_script_lang_js_ = ({
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    options_length() {
      const options = this.options;
      return Object.values(options).length;
    },
    events_forms() {
      const {
        project: {
          events_forms = {}
        } = {}
      } = this.$store.state.app_settings;
      return events_forms;
    },
    events() {
      return this.$store.state.app_settings.project.events;
    },
    label() {
      if (!this.events) return;
      const event = this.events[this.selected];
      if (!event) return;
      const {
        arm_num = '',
        arm_name = '',
        name = ''
      } = event;
      return `${name} (Arm ${arm_num}: ${arm_name})`;
    }
  },
  props: {
    options: {
      type: [Object],
      default: () => ({})
    },
    /**
     * manipulated by v-model
     */
    value: {
      type: [Number, String],
      default: ''
    }
  },
  methods: {
    onClick(event_id, arm, arm_index) {
      this.selected = event_id;
      this.arm_index = arm_index;
      this.arm_name = arm.name || '';
    },
    /**
     * option will not show if event has no forms
     */
    eventHasForms(event) {
      try {
        const forms = this.events_forms[event] || [];
        return forms.length > 0;
      } catch (error) {
        return false;
      }
    },
    /**
     * calculate the label for the arm
     */
    getArmLabel(index, name) {
      return `Arm ${index}: ${name}`;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RedcapField/Events.vue?vue&type=script&lang=js&
 /* harmony default export */ var RedcapField_Eventsvue_type_script_lang_js_ = (Eventsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RedcapField/Events.vue?vue&type=style&index=0&id=47cb2636&prod&scoped=true&lang=css&
var Eventsvue_type_style_index_0_id_47cb2636_prod_scoped_true_lang_css_ = __webpack_require__(4534);
;// CONCATENATED MODULE: ./src/components/RedcapField/Events.vue?vue&type=style&index=0&id=47cb2636&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/RedcapField/Events.vue



;


/* normalize component */

var Events_component = (0,componentNormalizer/* default */.Z)(
  RedcapField_Eventsvue_type_script_lang_js_,
  Eventsvue_type_template_id_47cb2636_scoped_true_render,
  Eventsvue_type_template_id_47cb2636_scoped_true_staticRenderFns,
  false,
  null,
  "47cb2636",
  null
  
)

/* harmony default export */ var Events = (Events_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RedcapField/Fields.vue?vue&type=template&id=791d3388&scoped=true&
var Fieldsvue_type_template_id_791d3388_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('b-dropdown', _vm._b({
    staticClass: "redcap-field-dropdown scrollable",
    attrs: {
      "size": "sm",
      "lazy": "",
      "block": "",
      "variant": "outline-secondary"
    },
    on: {
      "shown": _vm.onDropdownShown
    },
    scopedSlots: _vm._u([{
      key: "button-content",
      fn: function () {
        return [!_vm.selected ? _c('span', {
          staticClass: "label"
        }, [_vm._v("Select..." + _vm._s(_vm.selected))]) : _c('span', {
          staticClass: "label"
        }, [_vm._v(_vm._s(_vm.selected))])];
      },
      proxy: true
    }])
  }, 'b-dropdown', _vm.$attrs, false), [_vm.options_length < 1 ? _c('b-dropdown-text', [_vm._v("No data")]) : [_c('b-dropdown-form', [_c('b-form-group', {
    staticClass: "my-0",
    attrs: {
      "label": "",
      "label-for": "filter-fields"
    },
    on: {
      "submit": function ($event) {
        $event.stopPropagation();
        $event.preventDefault();
      }
    }
  }, [_c('b-form-input', {
    ref: "filter",
    attrs: {
      "id": "filter-fields",
      "size": "sm",
      "placeholder": "filter fields...",
      "autocomplete": "off"
    },
    on: {
      "input": _vm.onFilterInput
    },
    model: {
      value: _vm.filter,
      callback: function ($$v) {
        _vm.filter = $$v;
      },
      expression: "filter"
    }
  })], 1)], 1), _c('section', {
    staticClass: "content"
  }, [_c('b-dropdown-item-button', {
    attrs: {
      "active": _vm.selected == null
    },
    on: {
      "click": function ($event) {
        _vm.selected = null;
      }
    }
  }, [_vm._v("-- none --")]), _vm._l(_vm.filtered_options, function (fields, form_name) {
    return _c('b-dropdown-group', {
      key: form_name
    }, [_c('b-dropdown-header', {
      staticClass: "bg-light"
    }, [_c('span', {
      staticClass: "font-weight-bold"
    }, [_vm._v(_vm._s(_vm.getFormData(form_name).menu))])]), _vm._l(fields || [], function (field, key) {
      return _c('b-dropdown-item-button', {
        key: key,
        attrs: {
          "title": field.element_label,
          "active": _vm.selected === field.field_name
        },
        on: {
          "click": function ($event) {
            _vm.selected = field.field_name;
          }
        }
      }, [_c('span', [_vm._v(_vm._s(field.field_name))]), _c('span', {
        staticClass: "d-block muted small font-italic",
        domProps: {
          "innerHTML": _vm._s(field.element_label)
        }
      })]);
    }), _c('b-dropdown-divider')], 2);
  })], 2)]], 2)], 1);
};
var Fieldsvue_type_template_id_791d3388_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RedcapField/Fields.vue?vue&type=script&lang=js&


/* harmony default export */ var Fieldsvue_type_script_lang_js_ = ({
  data() {
    return {
      filter: '',
      filtered_options: {}
    };
  },
  computed: {
    getFormData() {
      return this.$store.getters['app_settings/getFormData'];
    },
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    options_length() {
      const options = this.options;
      return Object.values(options).length;
    }
  },
  created() {
    /**
     * run only once when created
     * this is the best way to use debounce in vue
     * @see https://stackoverflow.com/a/49780382
     */
    const initInputDebounce = () => {
      this.onFilterInput = (0,lodash.debounce)(e => {
        this.filterOptions();
      }, 400);
    };
    initInputDebounce();
  },
  props: {
    options: {
      type: [Object],
      default: () => []
    },
    /**
     * manipulated by v-model
     */
    value: {
      type: [Number, String],
      default: null
    }
  },
  methods: {
    /**
     * filter all options in all forms
     */
    filterOptions() {
      const text = this.filter;
      if (text.trim() === '') {
        this.filtered_options = {
          ...this.options
        };
        return;
      }
      const filtered = {};
      for (let [form_name, options] of Object.entries(this.options)) {
        const form_filtered = this.filterFormOptions(text, options);
        if (form_filtered.length > 0) filtered[form_name] = form_filtered;
      }
      this.filtered_options = {
        ...filtered
      };
    },
    /**
     * helper function to filter options at form level
     */
    filterFormOptions(text, options) {
      let filtered = [];
      const regexp = new RegExp(text, 'i');
      const searchable_properties = ['element_label', 'field_name'];
      options.forEach(option => {
        let match = searchable_properties.some(property => option[property].match(regexp));
        if (match !== false) {
          filtered.push(option);
        }
      });
      return filtered;
    },
    /**
     * check if the current value is in the options
     * if not, set value to empty string
     */
    isValueInOptions() {
      let all_fields = [];
      for (let [key, fields] of Object.entries(this.options)) {
        all_fields = [...all_fields, ...fields];
      }
      const exists = all_fields.some(field => field.field_name == this.value);
      if (!exists) this.selected = null;
      return exists;
    },
    onDropdownShown() {
      const filter_input = this.$refs.filter;
      if (filter_input) filter_input.focus();
    }
  },
  watch: {
    options: {
      immediate: true,
      handler() {
        this.filterOptions();
        this.isValueInOptions();
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RedcapField/Fields.vue?vue&type=script&lang=js&
 /* harmony default export */ var RedcapField_Fieldsvue_type_script_lang_js_ = (Fieldsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RedcapField/Fields.vue?vue&type=style&index=0&id=791d3388&prod&scoped=true&lang=css&
var Fieldsvue_type_style_index_0_id_791d3388_prod_scoped_true_lang_css_ = __webpack_require__(1203);
;// CONCATENATED MODULE: ./src/components/RedcapField/Fields.vue?vue&type=style&index=0&id=791d3388&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/RedcapField/Fields.vue



;


/* normalize component */

var Fields_component = (0,componentNormalizer/* default */.Z)(
  RedcapField_Fieldsvue_type_script_lang_js_,
  Fieldsvue_type_template_id_791d3388_scoped_true_render,
  Fieldsvue_type_template_id_791d3388_scoped_true_staticRenderFns,
  false,
  null,
  "791d3388",
  null
  
)

/* harmony default export */ var Fields = (Fields_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RedcapField/RedcapFieldSelect.vue?vue&type=script&lang=js&



/* harmony default export */ var RedcapFieldSelectvue_type_script_lang_js_ = ({
  components: {
    Events: Events,
    Fields: Fields
  },
  props: {
    event: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    }
  },
  computed: {
    project() {
      return this.$store.state.app_settings.project;
    },
    groupedFields() {
      return this.$store.getters['app_settings/groupedProjectFields'];
    },
    selected_event_id: {
      get() {
        return this.event;
      },
      set(value) {
        // notice that field is reset when the event is updated
        const data = {
          event: value,
          field: null
        };
        this.$emit('input', data);
      }
    },
    selected_field_key: {
      get() {
        return this.field;
      },
      set(value) {
        const data = {
          event: this.event,
          field: value
        };
        this.$emit('input', data);
      }
    },
    arms() {
      const {
        arms
      } = this.project;
      return arms;
    },
    /**
     * pivot
     */
    events_forms() {
      const {
        events_forms
      } = this.project;
      return events_forms;
    },
    forms() {
      const event_id = this.selected_event_id;
      return this.$store.getters['app_settings/getForms'](event_id);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/RedcapField/RedcapFieldSelect.vue?vue&type=script&lang=js&
 /* harmony default export */ var RedcapField_RedcapFieldSelectvue_type_script_lang_js_ = (RedcapFieldSelectvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/RedcapField/RedcapFieldSelect.vue?vue&type=style&index=0&id=f6b38814&prod&scoped=true&lang=css&
var RedcapFieldSelectvue_type_style_index_0_id_f6b38814_prod_scoped_true_lang_css_ = __webpack_require__(8576);
;// CONCATENATED MODULE: ./src/components/RedcapField/RedcapFieldSelect.vue?vue&type=style&index=0&id=f6b38814&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/RedcapField/RedcapFieldSelect.vue



;


/* normalize component */

var RedcapFieldSelect_component = (0,componentNormalizer/* default */.Z)(
  RedcapField_RedcapFieldSelectvue_type_script_lang_js_,
  RedcapFieldSelectvue_type_template_id_f6b38814_scoped_true_render,
  RedcapFieldSelectvue_type_template_id_f6b38814_scoped_true_staticRenderFns,
  false,
  null,
  "f6b38814",
  null
  
)

/* harmony default export */ var RedcapFieldSelect = (RedcapFieldSelect_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingForm.vue?vue&type=script&lang=js&








/* harmony default export */ var MappingFormvue_type_script_lang_js_ = ({
  components: {
    SelectProjectField: SelectProjectField,
    SelectPreselectedValue: SelectPreselectedValue,
    FhirFieldsSelect: Select,
    EventFieldsDropDown: EventFieldsDropDown,
    RedcapFieldSelect: RedcapFieldSelect,
    Fields: Fields,
    Events: Events
  },
  data() {
    return {
      temporal_field: null,
      preselect_value: null,
      event_id: '',
      redcap_field: '',
      external_source_field_name: ''
    };
  },
  props: {
    mapping: {
      type: Object,
      default: null
    }
  },
  computed: {
    translations() {
      return this.$store.state.app_settings.translations;
    },
    project() {
      return this.$store.state.app_settings.project;
    },
    project_id() {
      return this.$store.state.app_settings.project_id;
    },
    groupedTemporalFields() {
      return this.$store.getters['app_settings/groupedProjectTemporalFields'];
    },
    events_disabled() {
      const event_id = parseInt(this.event_id);
      if (isNaN(event_id)) return false;
      const event_ids = Object.keys(this.events);
      const unique_event = event_ids.length === 1;
      if (!unique_event) return false;
      const found = event_ids.some(id => event_id == id);
      if (found) return true;
      return false;
    },
    disabledTemporal() {
      if (!this.fhir_field) return true;else return this.fhir_field.temporal != 1;
    },
    fhir_field() {
      if (!this.external_source_field_name) return {};
      const fhir_field = this.$store.getters['app_settings/getFhirField'](this.external_source_field_name);
      return fhir_field;
    },
    arms() {
      return this.project.arms;
    },
    events() {
      return this.project.events;
    },
    /**
     * expose the configuration.
     * will be available in the slot scope
     */
    config() {
      if (!this.fhir_field) return;
      const {
        field: fhir_field_name,
        identifier
      } = this.fhir_field;
      const config = {
        // map_id: null,
        event_id: this.event_id,
        // project_id: this.project_id,
        external_source_field_name: fhir_field_name,
        field_name: this.redcap_field,
        identifier: identifier,
        preselect: this.preselect_value,
        temporal_field: this.temporal_field
      };
      return config;
    }
  },
  methods: {
    getForms(event_id) {
      return this.$store.getters['app_settings/getForms'](event_id);
    }
  },
  watch: {
    /* event_id: {
      immediate: false,
      handler() {
        this.redcap_field = ''
      }
    }, */
    mapping: {
      immediate: true,
      handler(mapping) {
        if (!mapping) return;
        this.event_id = mapping.event_id;
        this.temporal_field = mapping.temporal_field;
        this.preselect_value = mapping.preselect;
        this.redcap_field = mapping.field_name;
        this.external_source_field_name = mapping.external_source_field_name;
      }
    },
    disabledTemporal: {
      immediate: true,
      handler(disabled) {
        if (disabled) {
          this.temporal_field = null;
          this.preselect_value = null;
        }
      }
    }
  },
  validations() {
    return {
      fhir_field: {
        required: validators/* required */.C1
      },
      redcap_field: {
        required: validators/* required */.C1
      }
    };
  }
});
;// CONCATENATED MODULE: ./src/components/MappingForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_MappingFormvue_type_script_lang_js_ = (MappingFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingForm.vue?vue&type=style&index=0&id=782a8651&prod&scoped=true&lang=css&
var MappingFormvue_type_style_index_0_id_782a8651_prod_scoped_true_lang_css_ = __webpack_require__(4685);
;// CONCATENATED MODULE: ./src/components/MappingForm.vue?vue&type=style&index=0&id=782a8651&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/MappingForm.vue



;


/* normalize component */

var MappingForm_component = (0,componentNormalizer/* default */.Z)(
  components_MappingFormvue_type_script_lang_js_,
  MappingFormvue_type_template_id_782a8651_scoped_true_render,
  MappingFormvue_type_template_id_782a8651_scoped_true_staticRenderFns,
  false,
  null,
  "782a8651",
  null
  
)

/* harmony default export */ var MappingForm = (MappingForm_component.exports);
// EXTERNAL MODULE: ./src/models/index.js + 9 modules
var models = __webpack_require__(1973);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/MappingTable.vue?vue&type=script&lang=js&





/* harmony default export */ var MappingTablevue_type_script_lang_js_ = ({
  components: {
    FieldLabel: FieldLabel,
    FhirFieldLabel: FhirFieldLabel,
    PreselectLabel: PreselectLabel,
    MappingForm: MappingForm
  },
  data() {
    return {
      sort_by: null,
      modal_component: null,
      mapping_proxy: [],
      selected_mapping: null,
      show_edit: false,
      show_create: false,
      new_mapping: null
    };
  },
  computed: {
    translations() {
      return this.$store.state.app_settings.translations;
    },
    fhirSourceName() {
      return this.$store.state.app_settings.fhir_source_name;
    },
    project() {
      return this.$store.state.app_settings.project;
    },
    project_temporal_fields() {
      return this.$store.state.app_settings.project_temporal_fields;
    },
    fhir_fields() {
      return this.$store.state.app_settings.fhir_fields;
    },
    mapping() {
      return this.$store.state.mapping.list;
    },
    groupedTemporalFields() {
      return this.$store.getters['app_settings/groupedProjectTemporalFields'];
    },
    mapping_duplicates() {
      return this.$store.getters['mapping/duplicates'];
    },
    mapping_record_identifiers() {
      return this.$store.getters['mapping/recordIdentifiers'];
    },
    arms() {
      return this.project.arms;
    },
    events() {
      return this.project.events;
    }
  },
  methods: {
    getEventName(event_id) {
      const event_data = this.$store.getters['app_settings/getEventData'](event_id);
      if (typeof event_data === 'object' && 'name_ext' in event_data) return event_data.name_ext;
      return '';
    },
    onNewItemClicked() {
      const new_mapping = {};
      const event_ids = Object.keys(this.events);
      // set automatically the event id only one is available
      if (event_ids.length === 1) {
        new_mapping.event_id = event_ids[0];
      }
      this.new_mapping = {
        ...new_mapping
      };
      this.show_create = true;
    },
    /**
     * set a config property for a specific row
     */
    async updateMapping(item, params) {
      await this.$store.dispatch('mapping/update', {
        item,
        params
      });
      // let element = document.querySelector(`#row-${item.id}`)
      // wait for animation
      // setTimeout(() => this.scrollToElement(element), 1200 )
    },

    scrollToElement(element) {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      let scroll_position = window.scrollY;
      window.scrollTo({
        top: scroll_position + rect.top,
        behavior: 'smooth'
      });
    },
    /**
     * delete the row if new
     * mark as deleted if existing
     */
    onDeleteClicked(item) {
      this.$store.dispatch('mapping/deleteRow', item);
    },
    /**
     * duplicate the row
     */
    onCopyClicked(item) {
      this.$store.dispatch('mapping/duplicateRow', item);
    },
    onEditClicked(item, index) {
      this.selected_mapping = item;
      this.show_edit = true;
    },
    update(item, config) {
      this.show_edit = false;
      this.updateMapping(item, config);
    },
    async create(config) {
      const mapping = await this.$store.dispatch('mapping/addRow', config);
      this.show_create = false;
    },
    /**
     * get the status class for the row
     */
    getStatusClass(mapping) {
      const {
        status = ''
      } = mapping;
      let class_name = 'status-';
      switch (status) {
        case 'new':
          class_name += 'new';
          break;
        default:
          class_name += 'normal';
          break;
      }
      if (mapping.dirty) class_name += ' dirty';
      return class_name;
    },
    async sortBy(rule_name) {
      this.sort_by = await this.$store.dispatch('mapping/sortBy', rule_name);
    },
    getMappingConfig(mapping) {
      if (mapping instanceof models/* Mapping */.v) return mapping.config;
      return {};
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappingTable/MappingTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var MappingTable_MappingTablevue_type_script_lang_js_ = (MappingTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingTable/MappingTable.vue?vue&type=style&index=0&id=a55dea78&prod&scoped=true&lang=css&
var MappingTablevue_type_style_index_0_id_a55dea78_prod_scoped_true_lang_css_ = __webpack_require__(1293);
;// CONCATENATED MODULE: ./src/components/MappingTable/MappingTable.vue?vue&type=style&index=0&id=a55dea78&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/MappingTable/MappingTable.vue



;


/* normalize component */

var MappingTable_component = (0,componentNormalizer/* default */.Z)(
  MappingTable_MappingTablevue_type_script_lang_js_,
  MappingTablevue_type_template_id_a55dea78_scoped_true_render,
  MappingTablevue_type_template_id_a55dea78_scoped_true_staticRenderFns,
  false,
  null,
  "a55dea78",
  null
  
)

/* harmony default export */ var MappingTable = (MappingTable_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/SettingsTable.vue?vue&type=template&id=2fd68bd7&scoped=true&
var SettingsTablevue_type_template_id_2fd68bd7_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('table', {
    staticClass: "table table-bordered"
  }, [_c('thead', {
    staticClass: "thead-light"
  }, [_c('tr', [_c('th', {
    attrs: {
      "colspan": "2"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.translations['settings_table_title']))])])])]), _c('tbody', [_c('tr', [_c('td', [_c('h6', [_vm._v(_vm._s(_vm.translations['preview_fields_title']))]), _c('p', [_vm._v(_vm._s(_vm.translations['preview_fields_description']))])]), _c('td', [_c('label', {
    attrs: {
      "for": "select-preview-field"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.translations['preview_fields_select_label']))]), _vm._v(" "), _c('em', [_vm._v(_vm._s(_vm.fhirSourceName))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.translations['preview_fields_select_up_to']))])]), _c('PreviewFields')], 1)]), _c('tr', [_c('td', [_c('h6', [_vm._v(_vm._s(_vm.translations['default_day_offset_title']))]), _c('p', [_vm._v(_vm._s(_vm.translations['default_day_offset_description']))])]), _c('td', [_c('label', {
    attrs: {
      "for": "day-offset"
    }
  }, [_vm._v(_vm._s(_vm.translations['default_day_offset_label']))]), _c('DaysOffset')], 1)]), _c('tr', [_c('td', [_c('h6', [_vm._v(_vm._s(_vm.translations['instant_adjudication_title']))]), _c('p', [_vm._v(_vm._s(_vm.translations['instant_adjudication_description']))])]), _c('td', [_c('label', {
    staticClass: "me-2",
    attrs: {
      "for": "auto-adjudication"
    }
  }, [_vm._v(_vm._s(_vm.translations['instant_adjudication_label']))]), _c('AutoAdjudication')], 1)])])])]);
};
var SettingsTablevue_type_template_id_2fd68bd7_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/PreviewFields.vue?vue&type=template&id=45462dce&scoped=true&
var PreviewFieldsvue_type_template_id_45462dce_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm._l(_vm.preview_fields, function (preview_field, index) {
    return _c('section', {
      key: index,
      staticClass: "mb-2"
    }, [_c('b-button-group', {
      staticClass: "w-100"
    }, [_c('b-dropdown', _vm._b({
      staticClass: "scrollable",
      attrs: {
        "size": "sm",
        "left": "",
        "lazy": "",
        "block": "",
        "variant": "outline-secondary"
      },
      scopedSlots: _vm._u([{
        key: "button-content",
        fn: function () {
          return [!preview_field ? _c('span', {
            staticClass: "label"
          }, [_vm._v("Select...")]) : _c('span', {
            staticClass: "label"
          }, [_vm._v(_vm._s(preview_field))])];
        },
        proxy: true
      }], null, true)
    }, 'b-dropdown', _vm.$attrs, false), [_vm.options_length < 1 ? _c('b-dropdown-text', [_vm._v("No data")]) : _vm._l(_vm.awailable_preview_fields, function (items, category) {
      return _c('b-dropdown-group', {
        key: `cat-${category}`
      }, [_c('b-dropdown-header', [_c('span', [_vm._v(_vm._s(category))])]), _vm._l(items || [], function (item, key) {
        return _c('b-dropdown-item-button', {
          key: `${key}-${item.field}`,
          attrs: {
            "active": item.field === preview_field,
            "NOT_disabled": "preview_fields.indexOf(item.field)>=0"
          },
          on: {
            "click": function ($event) {
              return _vm.onSetFieldClicked(index, item.field);
            }
          }
        }, [_c('span', [_vm._v(_vm._s(item.label))])]);
      }), _c('b-dropdown-divider')], 2);
    })], 2), _c('b-button', {
      staticClass: "delete-button",
      attrs: {
        "size": "sm",
        "variant": "outline-secondary",
        "NOT_disabled": "total_preview_fields<=1"
      },
      on: {
        "click": function ($event) {
          return _vm.onDeletePreviewFieldClicked(index);
        }
      }
    }, [_c('font-awesome-icon', {
      staticClass: "text-danger",
      attrs: {
        "icon": "times"
      }
    })], 1)], 1)], 1);
  }), _c('b-button', {
    staticClass: "mt-0",
    attrs: {
      "variant": "success",
      "size": "sm",
      "disabled": _vm.total_preview_fields >= _vm.max_preview_fields
    },
    on: {
      "click": _vm.onAddPreviewFieldClicked
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "plus-circle"
    }
  }), _c('span', [_vm._v(" " + _vm._s(_vm.translations['preview_fields_add_another_field']))])], 1)], 2);
};
var PreviewFieldsvue_type_template_id_45462dce_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DropDown.vue?vue&type=template&id=6d35b686&scoped=true&
var DropDownvue_type_template_id_6d35b686_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('b-dropdown', _vm._b({
    staticClass: "scrollable",
    attrs: {
      "size": "sm",
      "lazy": "",
      "block": "",
      "variant": "outline-secondary"
    },
    scopedSlots: _vm._u([{
      key: "button-content",
      fn: function () {
        return [_vm._t("button-content", function () {
          return [!_vm.selected ? _c('span', {
            staticClass: "label"
          }, [_vm._v("Select a field...")]) : _c('span', {
            staticClass: "label"
          }, [_vm._v(_vm._s(_vm.selected))])];
        })];
      },
      proxy: true
    }], null, true)
  }, 'b-dropdown', _vm.$attrs, false), [_vm.options_length < 1 ? _c('b-dropdown-text', [_vm._v("No data")]) : [_vm._t("default", function () {
    return _vm._l(_vm.options || [], function (option, key) {
      return _c('b-dropdown-item-button', {
        key: key,
        attrs: {
          "active": key === _vm.selected
        },
        on: {
          "click": function ($event) {
            _vm.selected = key;
          }
        }
      }, [_c('span', [_vm._v(_vm._s(option))])]);
    });
  })]], 2);
};
var DropDownvue_type_template_id_6d35b686_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DropDown.vue?vue&type=script&lang=js&
/* harmony default export */ var DropDownvue_type_script_lang_js_ = ({
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    options_length() {
      const options = this.options;
      if (Array.isArray(options)) return options.length;else return Object.values(options).length;
    }
  },
  props: {
    options: {
      type: [Object, Array],
      default: () => []
    },
    /**
     * manipulated by v-model
     */
    value: {
      type: [Number, String],
      default: ''
    }
  }
});
;// CONCATENATED MODULE: ./src/components/DropDown.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_DropDownvue_type_script_lang_js_ = (DropDownvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/DropDown.vue?vue&type=style&index=0&id=6d35b686&prod&scoped=true&lang=css&
var DropDownvue_type_style_index_0_id_6d35b686_prod_scoped_true_lang_css_ = __webpack_require__(4148);
;// CONCATENATED MODULE: ./src/components/DropDown.vue?vue&type=style&index=0&id=6d35b686&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/DropDown.vue



;


/* normalize component */

var DropDown_component = (0,componentNormalizer/* default */.Z)(
  components_DropDownvue_type_script_lang_js_,
  DropDownvue_type_template_id_6d35b686_scoped_true_render,
  DropDownvue_type_template_id_6d35b686_scoped_true_staticRenderFns,
  false,
  null,
  "6d35b686",
  null
  
)

/* harmony default export */ var DropDown = (DropDown_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/PreviewFields.vue?vue&type=script&lang=js&

/* harmony default export */ var PreviewFieldsvue_type_script_lang_js_ = ({
  components: {
    DropDown: DropDown
  },
  data() {
    return {
      max_preview_fields: 5
    };
  },
  computed: {
    preview_fields() {
      return this.$store.state.settings.preview_fields;
    },
    translations() {
      return this.$store.state.app_settings.translations;
    },
    awailable_preview_fields() {
      return this.$store.getters['app_settings/previewFields'];
    },
    options_length() {
      const options = this.awailable_preview_fields;
      if (Array.isArray(options)) return options.length;else return Object.values(options).length;
    },
    total_preview_fields() {
      return [...this.preview_fields].length;
    }
  },
  methods: {
    onSetFieldClicked(index, field) {
      this.$store.dispatch('settings/setPreviewField', {
        index,
        field
      });
    },
    onAddPreviewFieldClicked() {
      this.$store.dispatch('settings/addPreviewField');
    },
    onDeletePreviewFieldClicked(index) {
      this.$store.dispatch('settings/deletePreviewField', index);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/Settings/PreviewFields.vue?vue&type=script&lang=js&
 /* harmony default export */ var Settings_PreviewFieldsvue_type_script_lang_js_ = (PreviewFieldsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/PreviewFields.vue?vue&type=style&index=0&id=45462dce&prod&scoped=true&lang=css&
var PreviewFieldsvue_type_style_index_0_id_45462dce_prod_scoped_true_lang_css_ = __webpack_require__(3034);
;// CONCATENATED MODULE: ./src/components/Settings/PreviewFields.vue?vue&type=style&index=0&id=45462dce&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/Settings/PreviewFields.vue



;


/* normalize component */

var PreviewFields_component = (0,componentNormalizer/* default */.Z)(
  Settings_PreviewFieldsvue_type_script_lang_js_,
  PreviewFieldsvue_type_template_id_45462dce_scoped_true_render,
  PreviewFieldsvue_type_template_id_45462dce_scoped_true_staticRenderFns,
  false,
  null,
  "45462dce",
  null
  
)

/* harmony default export */ var PreviewFields = (PreviewFields_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/DaysOffset.vue?vue&type=template&id=70361c6b&
var DaysOffsetvue_type_template_id_70361c6b_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('div', {
    staticClass: "form-inline"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.day_offset_plusminus,
      expression: "day_offset_plusminus"
    }],
    staticClass: "form-control ms-0",
    on: {
      "change": function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.day_offset_plusminus = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "+-"
    }
  }, [_vm._v("±")]), _c('option', {
    attrs: {
      "value": "+"
    }
  }, [_vm._v("+")]), _c('option', {
    attrs: {
      "value": "-"
    }
  }, [_vm._v("-")])]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.day_offset,
      expression: "day_offset"
    }],
    staticClass: "form-control ms-2",
    attrs: {
      "type": "number",
      "id": "day-offset",
      "min": _vm.day_offset_min,
      "max": _vm.day_offset_max,
      "step": _vm.day_offset_min,
      "required": ""
    },
    domProps: {
      "value": _vm.day_offset
    },
    on: {
      "input": function ($event) {
        if ($event.target.composing) return;
        _vm.day_offset = $event.target.value;
      }
    }
  }), _c('span', {
    staticClass: "ms-2"
  }, [_vm._v(_vm._s(_vm.translations['days']))]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.day_offset,
      expression: "day_offset"
    }],
    staticClass: "custom-range",
    attrs: {
      "type": "range",
      "min": _vm.day_offset_min,
      "max": _vm.day_offset_max,
      "step": _vm.day_offset_min
    },
    domProps: {
      "value": _vm.day_offset
    },
    on: {
      "__r": function ($event) {
        _vm.day_offset = $event.target.value;
      }
    }
  })]), _c('span', [_vm._v(_vm._s(_vm.day_offset_text))])]);
};
var DaysOffsetvue_type_template_id_70361c6b_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/DaysOffset.vue?vue&type=script&lang=js&
/* harmony default export */ var DaysOffsetvue_type_script_lang_js_ = ({
  data() {
    return {};
  },
  computed: {
    translations() {
      return this.$store.state.app_settings.translations;
    },
    day_offset_min() {
      return this.$store.state.app_settings.day_offset_min;
    },
    day_offset_max() {
      return this.$store.state.app_settings.day_offset_max;
    },
    day_offset: {
      get() {
        return this.$store.state.settings.realtime_webservice_offset_days;
      },
      set(value) {
        this.$store.dispatch('settings/setOffsetDays', value);
      }
    },
    day_offset_plusminus: {
      get() {
        return this.$store.state.settings.realtime_webservice_offset_plusminus;
      },
      set(value) {
        this.$store.dispatch('settings/setOffsetPlusminus', value);
      }
    },
    day_offset_text() {
      let text = this.translations.min_max_days;
      if (!text) return;
      const replacements = {
        min_days: this.day_offset_min,
        min_minutes: Math.ceil(60 * 24 / 100),
        max_days: this.day_offset_max
      };
      for (let [key, value] of Object.entries(replacements)) {
        text = text.replace(`{{${key}}}`, value);
      }
      return text;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/Settings/DaysOffset.vue?vue&type=script&lang=js&
 /* harmony default export */ var Settings_DaysOffsetvue_type_script_lang_js_ = (DaysOffsetvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/Settings/DaysOffset.vue





/* normalize component */
;
var DaysOffset_component = (0,componentNormalizer/* default */.Z)(
  Settings_DaysOffsetvue_type_script_lang_js_,
  DaysOffsetvue_type_template_id_70361c6b_render,
  DaysOffsetvue_type_template_id_70361c6b_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DaysOffset = (DaysOffset_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/AutoAdjudication.vue?vue&type=template&id=0506b3f4&
var AutoAdjudicationvue_type_template_id_0506b3f4_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [!_vm.is_allowed ? _c('div', {
    staticClass: "alert alert-warning"
  }, [_c('span', {
    staticClass: "font-weight-bold d-block"
  }, [_vm._v("Attention")]), _c('span', [_vm._v("Instant adjudication is disabled in REDCap. Please enable it in the CDIS setting page if you want to use this feature.")])]) : _vm._e(), _c('div', [_c('b-dropdown', {
    staticClass: "d-block",
    attrs: {
      "variant": _vm.auto_adjudication_enabled ? 'success' : 'danger',
      "disabled": !_vm.can_be_enabled,
      "size": "sm"
    },
    scopedSlots: _vm._u([{
      key: "button-content",
      fn: function () {
        return [_vm.auto_adjudication_enabled ? _c('span', {
          staticClass: "label"
        }, [_vm._v(_vm._s(_vm.translations['instant_adjudication_enabled']))]) : _c('span', {
          staticClass: "label"
        }, [_vm._v(_vm._s(_vm.translations['instant_adjudication_disabled']))])];
      },
      proxy: true
    }])
  }, [_c('b-dropdown-item-button', {
    attrs: {
      "active": _vm.auto_adjudication_enabled == false
    },
    on: {
      "click": function ($event) {
        return _vm.setAutoAdjudication(false);
      }
    }
  }, [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-danger",
    attrs: {
      "icon": "minus-circle"
    }
  }), _vm._v(" " + _vm._s(_vm.translations['instant_adjudication_disabled_text']))], 1)]), _c('b-dropdown-item-button', {
    attrs: {
      "active": _vm.auto_adjudication_enabled == true
    },
    on: {
      "click": function ($event) {
        return _vm.setAutoAdjudication(true);
      }
    }
  }, [_c('span', [_c('font-awesome-icon', {
    staticClass: "text-success",
    attrs: {
      "icon": "check-circle"
    }
  }), _vm._v(" " + _vm._s(_vm.translations['instant_adjudication_enabled_text']))], 1)])], 1), _c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.total_selected_fields_text)
    }
  })], 1), !_vm.can_be_enabled ? _c('span', {
    staticClass: "small text-muted"
  }, [_vm._v(_vm._s(_vm.translations['instant_adjudication_disabled_description']))]) : _vm._e(), _c('div', {
    staticClass: "mt-4"
  }, [_c('span', {
    staticClass: "font-weight-bold d-block"
  }, [_vm._v(_vm._s(_vm.translations['instant_adjudication_cronjob_settings_title']))]), _c('b-form-checkbox', {
    attrs: {
      "id": "cronjob",
      "switch": "",
      "disabled": !_vm.auto_adjudication_enabled
    },
    model: {
      value: _vm.cronjob,
      callback: function ($$v) {
        _vm.cronjob = $$v;
      },
      expression: "cronjob"
    }
  }, [_c('label', {
    attrs: {
      "for": "cronjob"
    }
  }, [_vm._v(_vm._s(_vm.translations['instant_adjudication_cronjob_settings_label']))])]), _c('span', [_vm._v(_vm._s(_vm.translations['instant_adjudication_cronjob_settings_description']))])], 1)]);
};
var AutoAdjudicationvue_type_template_id_0506b3f4_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/AutoAdjudication.vue?vue&type=script&lang=js&
/* harmony default export */ var AutoAdjudicationvue_type_script_lang_js_ = ({
  data() {
    return {};
  },
  computed: {
    cronjob: {
      get() {
        return Boolean(this.$store.state.settings.fhir_cdp_auto_adjudication_cronjob_enabled);
      },
      set(value) {
        this.$store.dispatch('settings/setAutoAdjudicationCronjob', value);
      }
    },
    translations() {
      return this.$store.state.app_settings.translations;
    },
    total_selected_fields_text() {
      if (this.temporal_mapping.length === 0) return ''; // black text if no temporal fields are mapped
      let text = this.translations.instant_adjudication_total_selected_fields;
      if (!text) return;
      const replacements = {
        fields: this.enabled_temporal_mapping.length,
        total_fields: this.temporal_mapping.length
      };
      for (let [key, value] of Object.entries(replacements)) {
        text = text.replace(`{{${key}}}`, `<strong>${value}</strong>`);
      }
      return text;
    },
    temporal_mapping() {
      const mapping = this.$store.getters['mapping/activeList'];
      return mapping.filter(item => item.is_temporal);
    },
    enabled_temporal_mapping() {
      const temporal_mapping = this.temporal_mapping;
      const enabled = temporal_mapping.filter(item => {
        const {
          temporal_field,
          preselect
        } = item;
        if (Boolean(temporal_field) == false) return false;
        if (Boolean(preselect) == false) return false;
        return true;
      });
      return enabled;
    },
    can_be_enabled() {
      if (this.temporal_mapping.length === 0) return true;
      if (this.enabled_temporal_mapping.length < 1) return false;
      const all_temporal_set = this.temporal_mapping.length === this.enabled_temporal_mapping.length;
      return Boolean(this.is_allowed && all_temporal_set);
    },
    is_allowed() {
      const project_settings = this.$store.state.app_settings.project;
      const {
        fhir_cdp_auto_adjudication_allowed,
        fhir_cdp_auto_adjudication_enabled
      } = project_settings;
      return fhir_cdp_auto_adjudication_allowed;
    },
    auto_adjudication_enabled: {
      get() {
        return this.$store.state.settings.fhir_cdp_auto_adjudication_enabled == true;
      },
      set(value) {
        this.setAutoAdjudication(value);
      }
    }
  },
  methods: {
    setAutoAdjudication(value) {
      this.$store.dispatch('settings/setAutoAdjudication', value);
    }
  },
  watch: {
    can_be_enabled: {
      immediate: true,
      handler(value) {
        if (value === false) {
          this.setAutoAdjudication(false);
        }
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/Settings/AutoAdjudication.vue?vue&type=script&lang=js&
 /* harmony default export */ var Settings_AutoAdjudicationvue_type_script_lang_js_ = (AutoAdjudicationvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/Settings/AutoAdjudication.vue





/* normalize component */
;
var AutoAdjudication_component = (0,componentNormalizer/* default */.Z)(
  Settings_AutoAdjudicationvue_type_script_lang_js_,
  AutoAdjudicationvue_type_template_id_0506b3f4_render,
  AutoAdjudicationvue_type_template_id_0506b3f4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AutoAdjudication = (AutoAdjudication_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/SettingsTable.vue?vue&type=script&lang=js&



/* harmony default export */ var SettingsTablevue_type_script_lang_js_ = ({
  components: {
    PreviewFields: PreviewFields,
    DaysOffset: DaysOffset,
    AutoAdjudication: AutoAdjudication
  },
  data() {
    return {
      auto_adjudication: false,
      preview_fields: []
    };
  },
  computed: {
    translations() {
      return this.$store.state.app_settings.translations;
    },
    fhirSourceName() {
      return this.$store.state.app_settings.fhir_source_name;
    },
    project() {
      return this.$store.state.app_settings.project;
    },
    fhir_cdp_auto_adjudication_enabled() {
      return this.$store.state.app_settings.project.fhir_cdp_auto_adjudication_enabled;
    },
    project_preview_fields() {
      return this.$store.getters['settings/previewFields'];
    }
  },
  watch: {
    fhir_cdp_auto_adjudication_enabled: {
      immediate: true,
      handler(value) {
        this.auto_adjudication = Boolean(value);
      }
    }
    // group fields by category and store them in local data
    /* project_preview_fields: {
        immediate: true,
        handler(fhir_fields) {
            // group fields by category
            const groupByCategory = R.groupBy(field => field.category)
            let fields = groupByCategory(fhir_fields)
            this.preview_fields = fields
        }
    }, */
  }
});
;// CONCATENATED MODULE: ./src/components/Settings/SettingsTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var Settings_SettingsTablevue_type_script_lang_js_ = (SettingsTablevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Settings/SettingsTable.vue?vue&type=style&index=0&id=2fd68bd7&prod&scoped=true&lang=css&
var SettingsTablevue_type_style_index_0_id_2fd68bd7_prod_scoped_true_lang_css_ = __webpack_require__(9834);
;// CONCATENATED MODULE: ./src/components/Settings/SettingsTable.vue?vue&type=style&index=0&id=2fd68bd7&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/Settings/SettingsTable.vue



;


/* normalize component */

var SettingsTable_component = (0,componentNormalizer/* default */.Z)(
  Settings_SettingsTablevue_type_script_lang_js_,
  SettingsTablevue_type_template_id_2fd68bd7_scoped_true_render,
  SettingsTablevue_type_template_id_2fd68bd7_scoped_true_staticRenderFns,
  false,
  null,
  "2fd68bd7",
  null
  
)

/* harmony default export */ var SettingsTable = (SettingsTable_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/ButtonGroups/ImportExport.vue?vue&type=template&id=29dabdcf&
var ImportExportvue_type_template_id_29dabdcf_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('b-button-group', [_c('b-button', {
    attrs: {
      "variant": "outline-primary",
      "size": "sm"
    },
    on: {
      "click": _vm.importClicked
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "file-import"
    }
  }), _vm._v(" Import")], 1), _c('b-button', {
    attrs: {
      "variant": "outline-primary",
      "size": "sm"
    },
    on: {
      "click": _vm.exportClicked
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "file-export"
    }
  }), _vm._v(" Export")], 1)], 1), _c('input', {
    ref: "file",
    staticClass: "d-none",
    attrs: {
      "type": "file"
    },
    on: {
      "change": _vm.onFileChanged
    }
  }), _c('b-modal', {
    attrs: {
      "id": "download-modal",
      "title": "Mapping export",
      "ok-title": "Download",
      "button-size": "sm"
    },
    on: {
      "ok": _vm.onDownloadOkClicked
    }
  }, [_c('div', {
    staticClass: "text-center"
  }, [_c('h6', {
    staticClass: "my-4"
  }, [_vm._v("Your data is ready to be downloaded!")]), _c('div', {
    staticClass: "d-flex flex-column align-content-center justify-content-center"
  }, [_c('a', {
    staticClass: "mx-auto text-center text-primary",
    attrs: {
      "href": _vm.download_url,
      "download": ""
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "file-csv",
      "size": "5x"
    }
  }), _c('span', {
    staticClass: "d-block"
  }, [_vm._v("click here to download")])], 1)])])])], 1);
};
var ImportExportvue_type_template_id_29dabdcf_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/ButtonGroups/ImportExport.vue?vue&type=script&lang=js&
/* harmony default export */ var ImportExportvue_type_script_lang_js_ = ({
  data() {
    return {
      download_url: null
    };
  },
  methods: {
    importClicked() {
      this.$refs.file.value = null;
      this.$refs.file.click();
    },
    async onFileChanged(event) {
      const files = this.$refs.file.files;
      if (files.length < 1) {
        return;
      }
      try {
        const file = files[0];
        const response = await this.$API.dispatch('settings/importMapping', file);
        const {
          data: {
            imported = []
          } = {}
        } = response;
        const total_imported = imported.length;
        const message = `Total imported mapping: ${total_imported}`;
        const title = 'Import process completed';
        await this.$bvModal.msgBoxOk(message, {
          title
        });
        this.$root.$emit('settings:updated');
      } catch (error) {
        let error_message = '';
        if (typeof error === 'string') {
          error_message = error;
        } else {
          const {
            response: {
              data = {}
            } = {}
          } = error;
          error_message = data.message || 'error importing data';
        }
        const error_title = 'Import error';
        this.$bvModal.msgBoxOk(error_message, {
          title: error_title
        });
      }
    },
    async exportClicked() {
      this.download_url = null;
      const response = await this.$API.dispatch('settings/exportMapping');
      const {
        data: {
          download_url = ''
        } = {}
      } = response;
      this.download_url = download_url;
      this.$bvModal.show('download-modal');
    },
    onDownloadOkClicked() {
      if (!this.download_url) return;
      location.replace(this.download_url);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/ButtonGroups/ImportExport.vue?vue&type=script&lang=js&
 /* harmony default export */ var ButtonGroups_ImportExportvue_type_script_lang_js_ = (ImportExportvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/ButtonGroups/ImportExport.vue





/* normalize component */
;
var ImportExport_component = (0,componentNormalizer/* default */.Z)(
  ButtonGroups_ImportExportvue_type_script_lang_js_,
  ImportExportvue_type_template_id_29dabdcf_render,
  ImportExportvue_type_template_id_29dabdcf_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ImportExport = (ImportExport_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/ButtonGroups/SaveCancel.vue?vue&type=template&id=cd1c4828&scoped=true&
var SaveCancelvue_type_template_id_cd1c4828_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_vm.mapping_has_errors ? _c('div', {
    staticClass: "alert alert-warning d-block"
  }, [_c('span', [_vm._v("Attention: the current configuration needs to be revisioned. Please check the table for more information.")])]) : _vm._e(), _vm.recordIdentifiersInMapping.length !== 1 ? _c('div', {
    staticClass: "alert alert-warning d-block"
  }, [_vm.recordIdentifiersInMapping.length < 1 ? _c('span', [_vm._v("Attention: one field must be mapped to the 'source identifier field'.")]) : _c('span', [_vm._v("Attention: only one field can be mapped to the 'source identifier field', but " + _vm._s(_vm.recordIdentifiersInMapping.length) + " have been set.")])]) : _vm._e(), _vm.duplicates_detected ? _c('div', {
    staticClass: "alert alert-warning d-block"
  }, [_vm._v(" Attention: duplicates detected. Please check the table for more information. ")]) : _vm._e(), _c('div', {
    staticClass: "d-flex flex-row justify-content-center align-items-center text-center"
  }, [_c('button', {
    staticClass: "btn btn-outline-success",
    attrs: {
      "type": "button",
      "disabled": _vm.save_disabled
    },
    on: {
      "click": _vm.onClickSave
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "save"
    }
  }), _vm._v(" Save")], 1), _c('button', {
    staticClass: "btn btn-outline-secondary m-2",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.onClickCancel
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": "times-circle"
    }
  }), _vm._v(" Cancel")], 1)]), _c('b-modal', {
    attrs: {
      "id": "save-modal",
      "title": "Success",
      "ok-only": ""
    },
    on: {
      "hidden": _vm.onSaveModalHidden
    }
  }, [_c('p', {
    staticClass: "my-4"
  }, [_vm._v("Settings saved!")])]), _c('b-modal', {
    attrs: {
      "id": "error-modal",
      "title": "Error",
      "ok-only": ""
    },
    on: {
      "hidden": _vm.onErrorModalHidden
    }
  }, [_c('p', {
    staticClass: "my-4"
  }, [_vm._v("There was an error saving the settings!")]), _c('ul', _vm._l(_vm.error, function (item, index) {
    return _c('li', {
      key: index
    }, [_vm._v(_vm._s(index) + ": " + _vm._s(item))]);
  }), 0)])], 1);
};
var SaveCancelvue_type_template_id_cd1c4828_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/ButtonGroups/SaveCancel.vue?vue&type=script&lang=js&
const initial_data = {
  error: null
};
/* harmony default export */ var SaveCancelvue_type_script_lang_js_ = ({
  data() {
    return {
      ...initial_data
    };
  },
  created() {
    window.addEventListener('beforeunload', this.saveBeforeLeaving);
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.saveBeforeLeaving);
  },
  computed: {
    project() {
      return this.$store.state.app_settings.project;
    },
    mapping() {
      return this.$store.state.mapping.list;
    },
    preview_fields() {
      return this.$store.state.settings.preview_fields;
    },
    fhir_cdp_auto_adjudication_enabled() {
      return this.$store.state.settings.fhir_cdp_auto_adjudication_enabled;
    },
    fhir_cdp_auto_adjudication_cronjob_enabled() {
      return this.$store.state.settings.fhir_cdp_auto_adjudication_cronjob_enabled;
    },
    realtime_webservice_offset_days() {
      return this.$store.state.settings.realtime_webservice_offset_days;
    },
    realtime_webservice_offset_plusminus() {
      return this.$store.state.settings.realtime_webservice_offset_plusminus;
    },
    recordIdentifiersInMapping() {
      return this.$store.getters['mapping/recordIdentifiers'];
    },
    mappingConfigurationErrors() {
      return this.$store.getters['mapping/getConfigurationErrors'];
    },
    mapping_duplicates() {
      return this.$store.getters['mapping/duplicates'];
    },
    mapping_is_dirty() {
      return this.$store.getters['mapping/is_dirty'];
    },
    duplicates_detected() {
      return this.mapping_duplicates.length > 0;
    },
    mapping_has_errors() {
      let errors = this.mappingConfigurationErrors;
      return errors.length > 0;
    },
    save_disabled() {
      const total_record_identifiers = this.recordIdentifiersInMapping.length;
      return Boolean(this.mapping_has_errors || total_record_identifiers !== 1 || this.duplicates_detected);
    }
  },
  methods: {
    async saveBeforeLeaving(event) {
      if (!this.mapping_is_dirty) return true;
      event.preventDefault();
      const message = 'You have unsaved mapping; please confirm that you want to leave this page without saving.';
      event.returnValue = message;
    },
    reset() {
      for (let [key, value] of Object.entries(initial_data)) {
        this[key] = value;
      }
    },
    showSuccessModal() {
      this.$bvModal.show('save-modal');
    },
    onSaveModalHidden() {
      this.$root.$emit('settings:saved');
    },
    onErrorModalHidden() {
      this.$root.$emit('settings:error');
    },
    async onClickSave() {
      try {
        this.reset();
        const settings = {
          preview_fields: this.preview_fields,
          fhir_cdp_auto_adjudication_enabled: this.fhir_cdp_auto_adjudication_enabled,
          fhir_cdp_auto_adjudication_cronjob_enabled: this.fhir_cdp_auto_adjudication_cronjob_enabled,
          realtime_webservice_offset_days: this.realtime_webservice_offset_days,
          realtime_webservice_offset_plusminus: this.realtime_webservice_offset_plusminus
        };
        const mapping = [...this.mapping];
        const response = await this.$API.dispatch('settings/set', {
          settings,
          mapping
        });
        this.$bvModal.show('save-modal');
      } catch (error) {
        const {
          response: {
            data = {}
          } = {}
        } = error;
        this.error = data;
        this.$bvModal.show('error-modal');
        console.error(error.toJSON());
        console.error(error);
      }
    },
    onClickCancel() {
      this.$root.$emit('settings:canceled');
    }
  }
});
;// CONCATENATED MODULE: ./src/components/ButtonGroups/SaveCancel.vue?vue&type=script&lang=js&
 /* harmony default export */ var ButtonGroups_SaveCancelvue_type_script_lang_js_ = (SaveCancelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/ButtonGroups/SaveCancel.vue?vue&type=style&index=0&id=cd1c4828&prod&scoped=true&lang=css&
var SaveCancelvue_type_style_index_0_id_cd1c4828_prod_scoped_true_lang_css_ = __webpack_require__(8777);
;// CONCATENATED MODULE: ./src/components/ButtonGroups/SaveCancel.vue?vue&type=style&index=0&id=cd1c4828&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/components/ButtonGroups/SaveCancel.vue



;


/* normalize component */

var SaveCancel_component = (0,componentNormalizer/* default */.Z)(
  ButtonGroups_SaveCancelvue_type_script_lang_js_,
  SaveCancelvue_type_template_id_cd1c4828_scoped_true_render,
  SaveCancelvue_type_template_id_cd1c4828_scoped_true_staticRenderFns,
  false,
  null,
  "cd1c4828",
  null
  
)

/* harmony default export */ var SaveCancel = (SaveCancel_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/CDPInfoModal.vue?vue&type=template&id=bd1eb964&
var CDPInfoModalvue_type_template_id_bd1eb964_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('b-modal', {
    attrs: {
      "title-html": _vm.title,
      "ok-only": "",
      "size": "lg"
    },
    model: {
      value: _vm.visible,
      callback: function ($$v) {
        _vm.visible = $$v;
      },
      expression: "visible"
    }
  }, [_c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.content)
    }
  })]);
};
var CDPInfoModalvue_type_template_id_bd1eb964_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/CDPInfoModal.vue?vue&type=script&lang=js&
/* harmony default export */ var CDPInfoModalvue_type_script_lang_js_ = ({
  data() {
    return {
      title: '',
      content: '',
      visible: false
    };
  },
  methods: {
    async open() {
      await this.getInfo();
      this.visible = true;
    },
    async getInfo() {
      let service_type = null;
      try {
        service_type = this.$store.state.app_settings.project.realtime_webservice_type;
      } catch (error) {
        service_type = 'fhir';
      }
      const response = await this.$API.dispatch('settings/getInfoPage', service_type);
      const {
        data: {
          title = '',
          content = ''
        } = {}
      } = response;
      this.title = title;
      this.content = content;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/CDPInfoModal.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CDPInfoModalvue_type_script_lang_js_ = (CDPInfoModalvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/CDPInfoModal.vue





/* normalize component */
;
var CDPInfoModal_component = (0,componentNormalizer/* default */.Z)(
  components_CDPInfoModalvue_type_script_lang_js_,
  CDPInfoModalvue_type_template_id_bd1eb964_render,
  CDPInfoModalvue_type_template_id_bd1eb964_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var CDPInfoModal = (CDPInfoModal_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingHelperPanel.vue?vue&type=template&id=5a03d224&
var MappingHelperPanelvue_type_template_id_5a03d224_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('span', {
    staticClass: "d-block",
    domProps: {
      "innerHTML": _vm._s(_vm.text_with_links)
    }
  }), _c('b-button', {
    staticClass: "text-white",
    attrs: {
      "href": _vm.mapping_helper_url,
      "variant": "info",
      "size": "sm"
    }
  }, [_c('font-awesome-icon', {
    attrs: {
      "icon": ['fas', 'code-branch']
    }
  }), _c('span', [_vm._v(" Mapping Helper")])], 1)], 1);
};
var MappingHelperPanelvue_type_template_id_5a03d224_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/MappingHelperPanel.vue?vue&type=script&lang=js&
/* harmony default export */ var MappingHelperPanelvue_type_script_lang_js_ = ({
  computed: {
    translations() {
      return this.$store.state.app_settings.translations;
    },
    mapping_helper_url() {
      return this.$store.state.app_settings.mapping_helper_url;
    },
    text() {
      const {
        cdp_settings_mapping_helper_text: text = ''
      } = this.translations;
      return text;
    },
    text_with_links() {
      let text = String(this.text);
      let mapping_helper_string = 'Mapping Helper';
      const regexp = new RegExp(mapping_helper_string, 'ig');
      const url = this.mapping_helper_url;
      const link = `<a href="${url}">${mapping_helper_string}</a>`;
      const html = text.replace(regexp, link);
      return html;
    }
  }
});
;// CONCATENATED MODULE: ./src/components/MappingHelperPanel.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_MappingHelperPanelvue_type_script_lang_js_ = (MappingHelperPanelvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/MappingHelperPanel.vue





/* normalize component */
;
var MappingHelperPanel_component = (0,componentNormalizer/* default */.Z)(
  components_MappingHelperPanelvue_type_script_lang_js_,
  MappingHelperPanelvue_type_template_id_5a03d224_render,
  MappingHelperPanelvue_type_template_id_5a03d224_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var MappingHelperPanel = (MappingHelperPanel_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/pages/Home.vue?vue&type=script&lang=js&






/* harmony default export */ var Homevue_type_script_lang_js_ = ({
  components: {
    MappingTable: MappingTable,
    SettingsTable: SettingsTable,
    ImportExport: ImportExport,
    SaveCancel: SaveCancel,
    MappingHelperPanel: MappingHelperPanel,
    CDPInfoModal: CDPInfoModal
  },
  computed: {
    translations() {
      return this.$store.state.app_settings.translations;
    },
    mapping_helper_url() {
      return this.$store.state.app_settings.mapping_helper_url;
    },
    projectType() {
      return this.$store.getters['app_settings/projectType'];
    }
  },
  methods: {
    onTellMeMoreClicked() {
      const infoModal = this.$refs['info-modal'];
      if (infoModal) infoModal.open();
    }
  }
});
;// CONCATENATED MODULE: ./src/pages/Home.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Homevue_type_script_lang_js_ = (Homevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/pages/Home.vue





/* normalize component */
;
var Home_component = (0,componentNormalizer/* default */.Z)(
  pages_Homevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Home = (Home_component.exports);

/***/ }),

/***/ 6832:
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
___CSS_LOADER_EXPORT___.push([module.id, "", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4628:
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
___CSS_LOADER_EXPORT___.push([module.id, ".label[data-v-6d35b686]{display:block;overflow:hidden;max-height:70%;text-overflow:ellipsis}.scrollable[data-v-6d35b686] ul[role=menu]{max-height:50vh;overflow:auto}.scrollable[data-v-6d35b686] button.dropdown-toggle{display:flex;flex-direction:row;justify-content:space-between;align-items:center}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1859:
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
___CSS_LOADER_EXPORT___.push([module.id, "#dropdown[data-v-0cf6bb73]{position:relative;display:inline-block;z-index:1;font-weight:400;font-size:16px}#dropdown.show>button[data-v-0cf6bb73]{background-color:rgba(0,0,0,.1)}#dropdown>button[data-v-0cf6bb73]{background-color:transparent;margin-bottom:4px;border-style:solid;border-width:1px;border-color:#6c757d;border-radius:3px;padding:.375rem .75rem;display:inline-flex;align-items:center}#dropdown>button[data-v-0cf6bb73]:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:\"\";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent}#dropdown.show>ul[data-v-0cf6bb73]{display:block}#dropdown ul[data-v-0cf6bb73]{margin-top:-2px;background-color:#fff;padding:.5rem 0;display:none;border-radius:3px;color:#6c757d;border-style:solid;border-width:1px;border-color:#6c757d;left:0;position:absolute;top:0;left:80%;z-index:1}#dropdown>ul[data-v-0cf6bb73]{top:100%;left:0}li[data-v-0cf6bb73]{padding:.25rem 1.5rem;position:relative;white-space:nowrap;min-width:200px;color:#000}#dropdown li:hover>ul[data-v-0cf6bb73],li[data-v-0cf6bb73]{display:block}#dropdown li[data-v-0cf6bb73]:hover{cursor:pointer;background-color:#f8f9fa}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3934:
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
___CSS_LOADER_EXPORT___.push([module.id, "mark{padding:0}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8156:
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
___CSS_LOADER_EXPORT___.push([module.id, ".leaf label .disabled[data-v-4ddf346b]{text-decoration:line-through}.leaf[data-v-4ddf346b]{display:flex;flex-direction:row;align-items:center;padding:3px 0}.leaf[data-v-4ddf346b]:hover{background-color:rgba(0,0,0,.1)}.leaf>*[data-v-4ddf346b]{cursor:pointer;display:block;margin:auto 0}.leaf label[data-v-4ddf346b]{margin-left:5px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 6857:
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
___CSS_LOADER_EXPORT___.push([module.id, ".fhir-dropdown[data-v-702d5c25] button.dropdown-toggle{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#nodes[data-v-702d5c25]{max-height:300px;font-size:14px;overflow-y:scroll;text-align:left}.dropdown-menu-ref[data-v-702d5c25]{max-height:300px;overflow-y:auto}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5430:
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
___CSS_LOADER_EXPORT___.push([module.id, ".group-head[data-v-12afc25a],.wrapper[data-v-12afc25a]{display:flex;flex-direction:row}.group-head[data-v-12afc25a]{justify-content:space-between;align-items:center}.main+.main[data-v-12afc25a]{padding-top:10px}.main[data-v-12afc25a]:not(:last-of-type){border-bottom:1px solid #cacaca}.group-name[data-v-12afc25a]{padding:10px 0;cursor:pointer}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7455:
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
___CSS_LOADER_EXPORT___.push([module.id, ".redcap-event-field>div[data-v-782a8651]{flex:1}.redcap-field[data-v-782a8651]{display:flex;flex-direction:row}label[data-v-782a8651]{font-weight:700;font-size:80%}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5020:
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
___CSS_LOADER_EXPORT___.push([module.id, ".fhir-field-label.disabled[data-v-03f6f364]{text-decoration:line-through}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4217:
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
___CSS_LOADER_EXPORT___.push([module.id, ".actions[data-v-a55dea78]{vertical-align:middle}.actions button+button[data-v-a55dea78]{margin-left:4px}.events-fields[data-v-a55dea78]{display:flex;justify-content:center;flex-direction:column}span[title][data-v-a55dea78]{cursor:help}.category[data-v-a55dea78]{background-color:rgba(0,0,0,.05);font-weight:700;color:darkred}.selected[data-v-a55dea78]{background-color:rgba(0,123,252,.2)}tr td[data-v-a55dea78]{position:relative}tr.status-new[data-v-a55dea78]{background-color:rgba(200,255,200,.5)}tr.status-deleted td[data-v-a55dea78]:not(.actions){pointer-events:none;opacity:.5;text-decoration:line-through}tr.dirty[data-v-a55dea78]{background-color:rgba(255,255,200,.5)}tr.dirty>td[data-v-a55dea78]:first-child:before{content:\"\";position:absolute;top:0;left:0;height:100%;width:2px;background-color:red}tr.status-new>td[data-v-a55dea78]:first-child:before{content:\"\";position:absolute;top:0;left:0;height:100%;width:2px;background-color:green}.list-enter-active[data-v-a55dea78],.list-leave-active[data-v-a55dea78]{transition:all .5s}.list-move[data-v-a55dea78]{transition:transform 1s}.list-enter-active[data-v-a55dea78]{background-color:rgba(200,255,200,.5)}.list-enter-to[data-v-a55dea78]{background-color:hsla(0,0%,100%,0)}.list-leave-active[data-v-a55dea78]{background-color:#ffc8c8}.list-enter[data-v-a55dea78],.list-leave-to[data-v-a55dea78]{opacity:0}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1701:
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
___CSS_LOADER_EXPORT___.push([module.id, ".label[data-v-059eeb96]{display:block;overflow:hidden;max-height:70%;text-overflow:ellipsis}.scrollable[data-v-059eeb96] ul[role=menu]{max-height:50vh;overflow:auto}.scrollable[data-v-059eeb96] button.dropdown-toggle{display:flex;flex-direction:row;justify-content:space-between;align-items:center}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4232:
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
___CSS_LOADER_EXPORT___.push([module.id, ".label[data-v-47cb2636]{display:block;overflow:hidden;max-height:70%;text-overflow:ellipsis}.scrollable[data-v-47cb2636] ul[role=menu]{max-height:50vh;overflow:auto}.scrollable[data-v-47cb2636] button.dropdown-toggle{display:flex;flex-direction:row;justify-content:space-between;align-items:center}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9634:
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
___CSS_LOADER_EXPORT___.push([module.id, "#redcap-field-dropdown[data-v-791d3388] button.dropdown-toggle{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.label[data-v-791d3388]{display:block;overflow:hidden;max-height:70%;text-overflow:ellipsis}.scrollable[data-v-791d3388] ul[role=menu] .content{max-height:50vh;overflow:auto;max-width:50vw}.scrollable[data-v-791d3388] ul[role=menu] button[role=menuitem] span{overflow:hidden;text-overflow:ellipsis;width:100%}.scrollable[data-v-791d3388] button.dropdown-toggle{display:flex;flex-direction:row;justify-content:space-between;align-items:center}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7926:
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
___CSS_LOADER_EXPORT___.push([module.id, "section[data-v-f6b38814]{display:contents}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5022:
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
___CSS_LOADER_EXPORT___.push([module.id, ".label[data-v-45462dce]{display:block;overflow:hidden;max-height:70%;text-overflow:ellipsis}.scrollable[data-v-45462dce]{flex:1}.delete-button[data-v-45462dce]{flex:0}.scrollable[data-v-45462dce] ul[role=menu]{max-height:50vh;overflow:auto}.scrollable[data-v-45462dce] button.dropdown-toggle{display:flex;flex-direction:row;justify-content:space-between;align-items:center;width:100%;flex:1;border-top-right-radius:0;border-bottom-right-radius:0}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8291:
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
___CSS_LOADER_EXPORT___.push([module.id, "label[data-v-2fd68bd7]{font-weight:700}table[data-v-2fd68bd7]{position:relative}tr td[data-v-2fd68bd7]:nth-child(2){width:50%}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8777:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6832);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("173173c0", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 4148:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4628);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("513aefe3", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 6345:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1859);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("99bad5e4", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 543:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3934);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("f2eaeb70", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 4573:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8156);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("12065554", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 8471:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6857);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("da510220", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 3081:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5430);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("6b6c9c15", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 4685:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7455);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("f3e8164e", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 3728:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5020);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("6c4179e7", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 1293:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4217);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("1ab3c1a9", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 4799:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1701);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("167df358", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 4534:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4232);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("f3d0ed56", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 1203:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9634);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("bf438f6e", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 8576:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7926);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("92c29760", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 3034:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5022);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("1b57a12d", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 9834:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8291);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(4402)/* ["default"] */ .Z)
var update = add("592284d6", content, true, {"sourceMap":false,"shadowMode":false});

/***/ })

}]);