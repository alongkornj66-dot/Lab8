<template>
  <div>
    <h2>รายการเมนูกาแฟ</h2>
    <p><button @click="navigateTo('/coffee/create')">สร้างเมนูใหม่</button></p>
    <div v-for="coffee in coffees" :key="coffee.id">
      <p>id: {{ coffee.id }}</p>
      <p>ชื่อเมนู: {{ coffee.name }}</p>
      <p>ราคา: {{ coffee.price }}</p>
      <p>ประเภท: {{ coffee.type }}</p>
      <p>สถานะ: {{ coffee.status }}</p>
      <p>
        <button @click="navigateTo('/coffee/'+coffee.id)">ดูข้อมูล</button>
        <button @click="navigateTo('/coffee/edit/'+coffee.id)">แก้ไข</button>
        <button @click="deleteCoffee(coffee)">ลบข้อมูล</button>
      </p>
      <hr>
    </div>
  </div>
</template>

<script>
import CoffeeService from '@/services/CoffeeService';

export default {
  data () {
    return {
      coffees: []
    }
  },
  async created () {
    this.coffees = (await CoffeeService.index()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteCoffee (coffee) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?")
      if (result) {
        try {
          await CoffeeService.delete(coffee)
          this.refreshData()
        } catch (err) {
          console.log(err)
        }
      }
    },
    async refreshData () {
      this.coffees = (await CoffeeService.index()).data
    }
  }
}
</script>
