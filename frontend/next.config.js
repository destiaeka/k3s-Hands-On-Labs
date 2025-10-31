module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend-service:8080/api/:path*'
      }
    ];
  },
};
