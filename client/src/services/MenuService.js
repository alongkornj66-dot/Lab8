import Api from '@/services/Api'

export default {
  index () {
    return Api().get('menus')
  },
  show (menuId) {
    return Api().get('menu/' + menuId)
  },
  post (menu) {
    return Api().post('menu', menu)
  },
  upload (formData) {
    return Api().post('menu-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  put (menu) {
    return Api().put('menu/' + menu.id, menu)
  },
  delete (menu) {
    return Api().delete('menu/' + menu.id)
  }
}
