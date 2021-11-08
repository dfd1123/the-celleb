<template>
  <div filter-box>
    <ul>
      <li v-for="filter in filterList" :key="`filter-${filter.id}`">
        <label>
          <input v-model="model" type="radio" :value="filter.id" @change="change">
          <span>{{ filter.name }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilterBox',
  props: {
    value: { type: String, default: () => null }
  },
  data () {
    return {
      model: null,
      filterList: [
        { name: '공동구매', id: 'groupBuy' },
        { name: '체험단', id: 'experienceGroup' },
        { name: '콘텐츠', id: 'contents' },
        { name: '홍보', id: 'marketing' }
      ]
    }
  },
  watch: {
    value: 'update'
  },
  mounted () {
    this.update()
  },
  methods: {
    change () {
      this.$emit('input', this.model)
    },
    update () {
      this.model = this.value
    }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[filter-box] { .no-drag; .p(26,13); .bgc(rgba(247, 246, 255, 0.7)); .-a(#d7d1ff); .br(5);
  >ul{
    >li{ .no-drag; .ib; .m(0, 20); .fs(18,22); .c(@light-gray); .vam;
      label{  .pointer; }
      span{ .no-drag; }
      input { .hide;
        &:checked{
          ~ span { .c(@gray); .bold; }
        }
      }
    }
  }
}
</style>
