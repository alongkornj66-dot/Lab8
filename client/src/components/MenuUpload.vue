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
    <div v-if="error" style="margin-top:8px;color:#d32f2f">{{ error }}</div>
  </div>
</template>

<script>
import MenuService from '@/services/MenuService';

export default {
  data () {
    return {
      uploading: false,
      filename: '',
      uploadedPath: '',
      error: ''
    }
  },
  methods: {
    async onFileChange (e) {
      const file = e.target.files[0]
      if (!file) return
      this.filename = file.name
      this.error = ''
      const formData = new FormData()
      formData.append('image', file)
      this.uploading = true
      try {
        const res = await MenuService.upload(formData)
        // store local preview + emit the returned image path
        this.uploadedPath = res.data.image
        this.$emit('uploaded', res.data.image)
      } catch (err) {
        this.error = 'Upload failed: ' + (err.response?.data?.error || err.message)
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
