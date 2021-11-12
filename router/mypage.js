export default [
  {
    path: '/mypage',
    name: 'mypage',
    redirect: '/mypage/account',
    meta: {
      auth: true
    },
    children: [
      {
        path: '/mypage/purchase',
        name: 'mypage-purchase',
        meta: {
          auth: true
        }
      },
      {
        path: '/mypage/payment',
        name: 'mypage-payment',
        meta: {
          auth: true
        }
      },
      {
        path: '/mypage/account',
        name: 'mypage-account',
        meta: {
          auth: true
        }
      },
      {
        path: '/mypage/cash',
        name: 'mypage-cash',
        redirect: '/mypage/cash/history',
        meta: {
          auth: true
        },
        children: [
          {
            path: '/mypage/cash/history',
            name: 'mypage-cash-history',
            meta: {
              auth: true
            }
          }
        ]
      }
    ]
  }
]
