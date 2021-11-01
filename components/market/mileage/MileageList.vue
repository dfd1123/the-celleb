<template>
  <div mileage-list>
    <MileageListItem v-for="(item, index) in list" :key="`mileage-${index}`" :item="item" />
  </div>
</template>

<script>
import MileageListItem from '@/components/market/mileage/MileageListItem'

export default {
  name: 'MileageList',
  components: { MileageListItem },
  props: {
    list: { type: Array, default: () => [] }
  }
}
</script>

<style lang="less">
@import '~@/assets/less/proj';

[mileage-list] { .p(0, 40); }
</style>
