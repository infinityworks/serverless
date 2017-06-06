const config = {
  development: {
    apiDomain: 'https://serverless.iwc.dev:8888/api/'
  },
  test: {
    apiDomain: 'https://serverless.iwc.dev:8888/api/'
  },
  production: {
    apiDomain: '/api/'
  }
};

const getConfig = () => {
  return config[process.env.NODE_ENV || 'development'];
};

export default getConfig;
