<template>
  <div>
    <h1>ข้อมูลเมนู</h1>
    <div v-if="menu.id" style="max-width:600px;margin:0 auto;">
      <div style="display:flex;gap:20px;margin-bottom:30px;">
        <div v-if="menu.image">
          <img :src="menu.image" alt="menu" style="width:300px;height:300px;object-fit:cover;border-radius:10px;" />
        </div>
        <div style="flex:1;">
          <h2>{{ menu.name }}</h2>
          <p><strong>ราคา:</strong> {{ menu.price }} บาท</p>
          <p><strong>สถานะ:</strong> {{ menu.status }}</p>
          <p><strong>รายละเอียด:</strong></p>
          <p>{{ menu.description }}</p>
          <p style="margin-top:20px;">
            <button @click="navigateTo('/menu/edit/'+menu.id)">แก้ไข</button>
            <button @click="deleteMenu(menu)">ลบข้อมูล</button>
            <button @click="$router.back()">กลับ</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuService from '@/services/MenuService';

export default {
  data () {
    return {
      menu: {
        id: null,
        name: '',
        price: '',
        status: '',
        description: '',
        image: ''
      }
    }
  },
  async created () {
    const menuId = this.$route.params.menuId
    try {
      const response = await MenuService.show(menuId)
      this.menu = response.data
    } catch (err) {
      console.log(err)
    }
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
          this.$router.push({ name: 'menus' })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>