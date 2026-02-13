<template>
  <div>
    <h1>แก้ไขเมนูกาแฟ</h1>
    <form v-on:submit.prevent="editCoffee">
      <p>ชื่อเมนู: <input type="text" v-model="coffee.name"></p>
      <p>ราคา: <input type="text" v-model="coffee.price"></p>
      <p>ประเภท: <input type="text" v-model="coffee.type"></p>
      <p>สถานะ: <input type="text" v-model="coffee.status"></p>
      <p><button type="submit">แก้ไขเมนู</button></p>
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
  async created () {
    try {
      var coffeeId = this.$route.params.coffeeId
      this.coffee = (await CoffeeService.show(coffeeId)).data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async editCoffee () {
      try {
        await CoffeeService.put(this.coffee)
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
