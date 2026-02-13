<template>
  <div>
    <h1>รายละเอียดเมนูกาแฟ</h1>
    <p>id: {{ coffee.id }}</p>
    <p>ชื่อเมนู: {{ coffee.name }}</p>
    <p>ราคา: {{ coffee.price }}</p>
    <p>ประเภท: {{ coffee.type }}</p>
    <p>สถานะ: {{ coffee.status }}</p>
    <p>
      <button @click="navigateTo('/coffees')">กลับ</button>
    </p>
  </div>
</template>

<script>
import CoffeeService from '@/services/CoffeeService';

export default {
  data () {
    return {
      coffee: {}
    }
  },
  async created () {
    try {
      var coffeeId = this.$route.params.coffeeId
      this.coffee = (await CoffeeService.show(coffeeId)).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>
