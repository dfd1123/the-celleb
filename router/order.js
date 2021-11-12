export default [
  {
    path: '/order/:productId',
    name: 'order-productId',
    meta: {
      auth: true
    }
  },
  {
    path: '/order/:orderId/detail',
    name: 'order-orderId-detail',
    meta: {
      auth: true
    }
  },
  {
    path: '/order/:productId/complete',
    name: 'order-productId-complete',
    meta: {
      auth: true
    }
  }
]
