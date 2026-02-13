<template>
  <div>
    <h1>สร้างเมนูกาแฟ</h1>
    <form v-on:submit.prevent="createCoffee">
      <p>ชื่อเมนู: <input type="text" v-model="coffee.name"></p>
      <p>ราคา: <input type="text" v-model="coffee.price"></p>
      <p>ประเภท: <input type="text" v-model="coffee.type"></p>
      <p>สถานะ: <input type="text" v-model="coffee.status"></p>
      <p><button type="submit">สร้างเมนู</button></p>
    </form>
  </div>
</template>

<script>
import CoffeeService from '@/services/CoffeeService';

export default {
  data () {
    return {
      coffee: {
        name: '',
        price: '',
        type: '',
        status: ''
      }
    }
  },
  methods: {
    async createCoffee () {
      try {
        await CoffeeService.post(this.coffee)
        this.$router.push({
          name: 'coffees'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
