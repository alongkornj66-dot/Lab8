<template>
  <div>
    <h2>รายการเมนูกาแฟ</h2>
    <p><button v-on:click="navigateTo('/coffee/create')">สร้างเมนูใหม่</button></p>

    <h2>จำนวนเมนู {{ coffees.length }}</h2>

    <div v-for="coffee in coffees" v-bind:key="coffee.id">
      <p>id: {{ coffee.id }}</p>
      <p>ชื่อเมนู: {{ coffee.name }}</p>
      <p>ราคา: {{ coffee.price }}</p>
      <p>ประเภท: {{ coffee.type }}</p>
      <p>
        <button v-on:click="navigateTo('/coffee/edit/'+ coffee.id)">แก้ไขข้อมูล</button>
        <button v-on:click="deleteCoffee(coffee)">ลบข้อมูล</button>
      </p>
      <hr>
    </div>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'

export default {
  data () {
    return {
      coffees: []
    }
  },
  // ดึงข้อมูลทันทีเมื่อเข้าหน้านี้
  async created () {
    this.coffees = (await CoffeesService.index()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteCoffee (coffee) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?")
      if (result) {
        try {
          await CoffeesService.delete(coffee)
          this.refreshData()
        } catch (err) {
          console.log(err)
        }
      }
    },
    async refreshData() {
      this.coffees = (await CoffeesService.index()).data
    }
  }
}
</script>
<style scoped>
</style>