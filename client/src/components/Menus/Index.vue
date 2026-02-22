<template>
  <div>
    <h2>รายการเมนูอาหาร</h2>
    <p><button @click="navigateTo('/menu/create')">สร้างเมนูใหม่</button></p>
    <div v-for="menu in menus" :key="menu.id" style="display:flex;align-items:center;gap:12px">
      <div style="display:flex;align-items:center;gap:8px;flex:1">
        <img v-if="menu.image" :src="menu.image" alt="menu" class="menu-thumb" />
        <div>
          <p>id: {{ menu.id }}</p>
          <p>ชื่อเมนู: {{ menu.name }}</p>
        </div>
      </div>
      <div style="flex-basis:200px">
        <p>ราคา: {{ menu.price }}</p>
        <p>สถานะ: {{ menu.status }}</p>
      </div>
      <p>
        <button @click="navigateTo('/menu/'+menu.id)">ดูข้อมูล</button>
        <button @click="navigateTo('/menu/edit/'+menu.id)">แก้ไข</button>
        <button @click="deleteMenu(menu)">ลบข้อมูล</button>
      </p>
      <hr>
    </div>
  </div>
</template>

<script>
import MenuService from '@/services/MenuService';

export default {
  data () {
    return {
      menus: []
    }
  },
  async created () {
    this.menus = (await MenuService.index()).data
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteMenu (menu) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?")
      if (result) {
        try {
          await MenuService.delete(menu)
          this.refreshData()
        } catch (err) {
          console.log(err)
        }
      }
    },
    async refreshData () {
      this.menus = (await MenuService.index()).data
    }
  }
}
</script>

<style scoped>
.menu-thumb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>