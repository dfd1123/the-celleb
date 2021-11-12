export default function ({ route, store, redirect }) {
  if (route.meta[0].auth) {
    if (!store.state.auth.myInfo) {
      redirect('/auth/login')
    }
  }
}
