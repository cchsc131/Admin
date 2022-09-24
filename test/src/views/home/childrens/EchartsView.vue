<template>
  <div class="container">
    <div class="vleft">
      <IP>
        <template #main>
          <One></One>
        </template>
      </IP>
      <IP></IP>

    </div>
    <div class="vright">
      <IP>
        <template #main>
          <Two></Two>
        </template>
      </IP>
      <IP></IP>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IP from '../../../components/ItemPage.vue'
import One from "../../../components/One.vue"
import Two from "../../../components/Two.vue"
import Three from "../../../components/Three.vue"
import Four from "../../../components/Four.vue"

</script>

<style lang="scss">
.container{
  width: 100%;
  margin: 0 auto;
  background-color: gray;
  display: flex;
  .vleft,.vright{
    flex: 1;
  }
}
</style>