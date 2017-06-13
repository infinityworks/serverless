const config = {
  development: {
    apiDomain: 'https://localhost:8888/api/'
  },
  production: {
    apiDomain: '/api/'
  }
};

const getConfig = () => {
  return config[process.env.NODE_ENV || 'development'];
};

export default getConfig;
