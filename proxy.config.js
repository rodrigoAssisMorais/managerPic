const proxy = [
    {
      context: '/api',
      target: 'http://localhost/WebApplication2',
      pathRewrite: {'^/api' : ''}
    }
  ];

  module.exports = proxy;