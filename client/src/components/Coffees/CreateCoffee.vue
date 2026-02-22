<template>
  <div>
    <h1>สร้างเมนูกาแฟ</h1>
    <form v-on:submit.prevent="createCoffee" style="max-width:420px;margin:0 auto;text-align:center">
      <p>ชื่อเมนู: <input type="text" v-model="coffee.name"></p>
      <p>ราคา: <input type="text" v-model="coffee.price"></p>
      <p>ประเภท: <select v-model="coffee.type"><option>hot</option><option>iced</option></select></p>
      <p>สถานะ: <select v-model="coffee.status"><option>มีจำหน่าย</option><option>หมด</option></select></p>
      <p>รายละเอียด</p>
      <p><textarea v-model="coffee.description" rows="3" style="width:100%"></textarea></p>

      <div style="margin-top:12px">
        <Upload @uploaded="onUploaded" />
      </div>

      <div v-if="coffee.image" style="margin-top:18px;text-align:center">
        <img :src="coffee.image" alt="preview" style="width:200px;height:200px;object-fit:cover;border-radius:50%;" />
      </div>

      <p style="margin-top:18px"><button type="submit">บันทึกเมนู</button> <button type="button" @click="$router.back()">ยกเลิก</button></p>
    </form>
  </div>
</template>

<script>
import Upload from '@/components/Upload.vue';
import CoffeeService from '@/services/CoffeeService';

export default {
  components: { Upload },
  data () {
    return {
      coffee: {
        name: '',
        price: '',
        type: 'hot',
        status: 'มีจำหน่าย',
        description: '',
        image: ''
      }
    }
  },
  methods: {
    onUploaded (imagePath) {
      this.coffee.image = imagePath
    },
    async createCoffee () {
      try {
        await CoffeeService.post(this.coffee)
        this.$router.push({ name: 'coffees' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
