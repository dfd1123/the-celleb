export default ({ event = 'input', model = 'model', prop = 'value', update } = {}) => ({
  model: { prop, event },
  watch: {
    [prop]: update || '__modelUpdate__'
  },
  methods: update
    ? null
    : {
        __modelUpdate__ () { this[model] = this[prop] }
      },
  mounted () {
    update ? this[update]() : this.__modelUpdate__()
  }
})
