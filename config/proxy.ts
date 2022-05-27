export default {
  dev: {
    '/api/': {
      target: 'http://localhost:20226/',
      changeOrigin: true,
      // pathRewrite: { '^/v1': '' },
      pathRewrite: { '^': '' },
    },
  },
};
