export default {
  dev: {
    '/v1/': {
      target: 'http://localhost:20222/',
      changeOrigin: true,
      // pathRewrite: { '^/v1': '' },
      pathRewrite: { '^': '' },
    },
  },
};
