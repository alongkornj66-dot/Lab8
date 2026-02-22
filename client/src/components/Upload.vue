<template>
  <div style="text-align:center">
    <label style="display:block;margin-bottom:8px">Upload Thumbnail:</label>
    <input type="file" @change="onFileChange" />
    <div v-if="filename" style="margin-top:8px">{{ filename }}</div>
    <div v-if="uploading" style="margin-top:8px">Uploading...</div>
    <div v-if="uploadedPath" style="margin-top:12px">
      <img :src="uploadedPath" alt="uploaded" style="width:180px;height:180px;object-fit:cover;border-radius:8px;" />
      <div style="margin-top:8px;color:#4b5563">Uploaded Successfully!</div>
    </div>
  </div>
</template>

<script>
import CoffeeService from '@/services/CoffeeService';

export default {
  data () {
    return {
      uploading: false,
      filename: '',
      uploadedPath: ''
    }
  },
  methods: {
    async onFileChange (e) {
      const file = e.target.files[0]
      if (!file) return
      this.filename = file.name
      const formData = new FormData()
      formData.append('image', file)
      this.uploading = true
      try {
        const res = await CoffeeService.upload(formData)
        // store local preview + emit the returned image path
        this.uploadedPath = res.data.image
        this.$emit('uploaded', res.data.image)
      } catch (err) {
        console.error(err)
      } finally {
        this.uploading = false
      }
    }
  }
}
</script>

<style scoped>
input[type="file"] {
  display: inline-block;
}
</style>
