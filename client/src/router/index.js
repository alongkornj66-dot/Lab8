import { createRouter, createWebHistory } from 'vue-router'

// Import ไฟล์ที่เราเพิ่งสร้าง
// ลองเปลี่ยนเป็นแบบนี้ (Relative path)
import CoffeeIndex from '../components/Coffees/Index.vue'
import CoffeeCreate from '../components/Coffees/CreateCoffee.vue'
import CoffeeEdit from '../components/Coffees/EditCoffee.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/coffees',
      name: 'coffees',
      component: CoffeeIndex
    },
    {
      path: '/coffee/create',
      name: 'coffee-create',
      component: CoffeeCreate
    },
    {
      path: '/coffee/edit/:coffeeId',
      name: 'coffee-edit',
      component: CoffeeEdit
    }
  ]
})

export default router