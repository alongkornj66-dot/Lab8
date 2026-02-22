<template>
  <div>
    <h1>แก้ไขเมนูกาแฟ</h1>
    <form v-on:submit.prevent="editCoffee">
      <p>ชื่อเมนู: <input type="text" v-model="coffee.name"></p>
      <p>ราคา: <input type="text" v-model="coffee.price"></p>
      <p>ประเภท: <input type="text" v-model="coffee.type"></p>
      <p>สถานะ: <input type="text" v-model="coffee.status"></p>
      <p>รูปภาพเดิม:</p>
      <p>
        <img v-if="coffee.image" :src="coffee.image" alt="preview" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-bottom:8px;" />
      </p>
      <p>อัปโหลดรูปใหม่ (ถ้าต้องการ):</p>
      <Upload @uploaded="onUploaded" />
      <p><button type="submit">แก้ไขเมนู</button></p>
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
        type: '',
        status: '',
        image: ''
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
    onUploaded (imagePath) {
      this.coffee.image = imagePath
    },
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
