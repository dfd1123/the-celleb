<template>
  <div check-box :class="{disabled}">
    <input
      :id="`check-box${uid}`"
      v-model="model"
      type="checkbox"
      :value="val"
      :disabled="disabled"
      @change="changeValue"
    >
    <label :for="`check-box${uid}`" class="checkbox" :style="`transform: scale(${sizeRatio})`" />
    <label :for="`check-box${uid}`">
      <span v-html="label" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    label: { type: String, default: '' },
    val: { type: [String, Number, Boolean], default: true },
    value: { type: [String, Number, Boolean, Array], default: false },
    sizeRatio: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false }
  },
  data () {
    return {
      model: false
    }
  },
  computed: {
    uid () {
      return this._uid
    }
  },
  watch: {
    value: 'updateModel'
  },
  mounted () {
    this.updateModel()
  },
  methods: {
    updateModel () {
      this.model = this.value
    },
    changeValue (event) {
      let value
      if (event.target.checked) {
        if (Array.isArray(this.value)) {
          value = [...this.value, this.val]
        } else {
          value = this.val
        }
      } else if (Array.isArray(this.value)) {
        value = this.value.filter(val => val !== this.val)
      } else if (typeof this.val === 'boolean') {
        value = !this.val
      } else {
        value = undefined
      }

      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[check-box] { .rel; .ib; .vam; .tl;
  &.md-checkbox-inline { .ib; }

  label.checkbox { .ib; .wh(1.25em); .vat; .mr(5); .pl(1); clear: both; .pointer;
    &:not(:empty) { .pl(0.75em); }

    &:before, &:after { box-sizing: border-box; content: ""; .abs; .lt(0,0); .z(1); .wh(1.25em); }

    &:before { .wh(1.25em); .bgc(#fff);
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 0.125em;
      cursor: pointer;
      transition: background .3s;
    }

    &:after {
      // checkmark
    }
  }

  label{ .pointer;
    >span{ .vam; }
  }

  input[type="checkbox"] { .block; .fl; outline: 0; visibility: hidden; .hide; .w(1.25em); .m(0);
    &:checked {
      + label:before{ .bgc(#5d12fa); .-a; }
      + label:after {
        transform: translate(0.25em, 0.3365384615em) rotate(-45deg);
        width: 0.75em;
        height: 0.375em;

        border: 0.125em solid #fff;
        border-top-style: none;
        border-right-style: none;
      }
    }

    &:disabled {
      + label:before{
        border-color: rgba(0, 0, 0, 0.26);
      }
      &:checked {
        + label:before{
          background: rgba(0, 0, 0, 0.26);
        }
      }
    }
  }

}
</style>
