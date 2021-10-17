export default [
  {
    path: '/mypage',
    name: 'mypage',
    redirect: '/mypage/account',
    children: [
      {
        path: '/mypage/purchase',
        name: 'mypage-purchase'
      },
      {
        path: '/mypage/payment',
        name: 'mypage-payment'
      },
      {
        path: '/mypage/account',
        name: 'mypage-account'
      },
      {
        path: '/mypage/cash',
        name: 'mypage-cash',
        redirect: '/mypage/cash/history',
        children: [
          {
            path: '/mypage/cash/history',
            name: 'mypage-cash-history'
          }
        ]
      }
    ]
  }
]
