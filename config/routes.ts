export default [
  {
    name: 'index',
    icon: 'home',
    hideInMenu: true,
    path: '/',
    routes: [
      {
        path: '.',
        component: '@/pages/index',
        exact: true,
        // menuHeaderRender: false,
      },
      // {
      //   name: 'detail',
      //   path: './:sensorType',
      //   hideInMenu: true,
      //   component: '@/pages/index',
      // },
    ],
  },
  // {
  //   component: './Fallback',
  // },
];
