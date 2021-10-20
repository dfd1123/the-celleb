import home from './home'
import auth from './auth'
import product from './product'
import order from './order'
import faq from './faq'
import mypage from './mypage'
import cash from './cash'

const routeLists = [
  ...home,
  ...auth,
  ...product,
  ...order,
  ...faq,
  ...mypage,
  ...cash
]

const iterator = (list) => {
  for (const item in list) {
    for (const m in routeLists) {
      if (
        list[item].name === routeLists[m].name &&
        list[item].path === routeLists[m].path
      ) {
        list[item].meta = routeLists[m].meta
        list[item].alias = routeLists[m].alias
        list[item].redirect = routeLists[m].redirect
      }
    }
    if (list[item].children && list[item].children.length > 0) {
      iterator(list[item].children)
    } else {
      // return list
    }
  }
}

export default (routes, resolve) => {
  console.log('nuxt route lists : ', routes)
  routes = iterator(routes)
}
