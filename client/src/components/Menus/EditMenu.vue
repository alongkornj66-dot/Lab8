<template>
  <div style="padding:20px;max-width:600px;margin:0 auto;">
    <h1>แก้ไขเมนู</h1>
    
    <form v-on:submit.prevent="editMenu">
      <div style="margin-bottom:15px;">
        <label>ชื่อเมนู:</label>
        <input type="text" v-model="menu.name" required style="width:100%;padding:8px;margin-top:5px;box-sizing:border-box;" />
      </div>

      <div style="margin-bottom:15px;">
        <label>ราคา:</label>
        <input type="text" v-model="menu.price" required style="width:100%;padding:8px;margin-top:5px;box-sizing:border-box;" />
      </div>

      <div style="margin-bottom:15px;">
        <label>สถานะ:</label>
        <select v-model="menu.status" style="width:100%;padding:8px;margin-top:5px;box-sizing:border-box;">
          <option value="มีจำหน่าย">มีจำหน่าย</option>
          <option value="หมด">หมด</option>
        </select>
      </div>

      <div style="margin-bottom:15px;">
        <label>รายละเอียด:</label>
        <textarea v-model="menu.description" rows="4" style="width:100%;padding:8px;margin-top:5px;box-sizing:border-box;"></textarea>
      </div>

      <div style="margin-bottom:15px;border:1px solid #ccc;padding:15px;border-radius:5px;">
        <MenuUpload @uploaded="onUploaded" />
      </div>

      <div v-if="menu.image" style="margin-bottom:15px;text-align:center;">
        <img :src="menu.image" alt="preview" style="width:200px;height:200px;object-fit:cover;border-radius:10px;" />
      </div>

      <div v-if="error" style="margin-bottom:15px;padding:10px;background-color:#ffebee;color:#c62828;border-radius:5px;">
        {{ error }}
      </div>

      <div v-if="success" style="margin-bottom:15px;padding:10px;background-color:#e8f5e9;color:#2e7d32;border-radius:5px;">
        {{ success }}
      </div>

      <div style="margin-bottom:15px;">
        <button type="submit" :disabled="loading" style="padding:10px 20px;font-size:16px;margin-right:10px;background-color:#2196F3;color:white;border:none;border-radius:5px;cursor:pointer;">
          {{ loading ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข' }}
        </button>
        <button type="button" @click="goBack" style="padding:10px 20px;font-size:16px;background-color:#f44336;color:white;border:none;border-radius:5px;cursor:pointer;">
          ยกเลิก
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import MenuUpload from '@/components/MenuUpload.vue';
import MenuService from '@/services/MenuService';

export default {
  components: { MenuUpload },
  data () {
    return {
      menu: {
        id: null,
        name: '',
        price: '',
        status: 'มีจำหน่าย',
        description: '',
        image: ''
      },
      loading: false,
      error: '',
      success: ''
    }
  },
  async created () {
    const menuId = this.$route.params.menuId
    try {
      console.log('Loading menu:', menuId)
      const response = await MenuService.show(menuId)
      this.menu = response.data
      console.log('Menu loaded:', this.menu)
    } catch (err) {
      this.error = 'ไม่สามารถโหลดข้อมูล: ' + (err.response?.data?.error || err.message)
      console.error('Error loading menu:', err)
    }
  },
  methods: {
    onUploaded (imagePath) {
      console.log('Image uploaded:', imagePath)
      this.menu.image = imagePath
    },
    async editMenu () {
      this.error = ''
      this.success = ''
      
      if (!this.menu.name.trim()) {
        this.error = 'กรุณากรอกชื่อเมนู'
        return
      }
      
      if (!this.menu.price.trim()) {
        this.error = 'กรุณากรอกราคา'
        return
      }

      this.loading = true
      
      try {
        console.log('Updating menu:', this.menu)
        const response = await MenuService.put(this.menu)
        console.log('Menu updated successfully:', response.data)
        this.success = 'แก้ไขเมนูสำเร็จ!'
        
        setTimeout(() => {
          this.$router.push({ name: 'menus' })
        }, 1000)
      } catch (err) {
        console.error('Error updating menu:', err)
        const errorMsg = err.response?.data?.error || err.message || 'เกิดข้อผิดพลาดในการบันทึก'
        this.error = 'เกิดข้อผิดพลาด: ' + errorMsg
      } finally {
        this.loading = false
      }
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  transform: scale(1.05);
}
</style>
