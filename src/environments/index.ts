const NODE_ENV: string = process.env.NODE_ENV || 'development';

// application
const DOMAIN: string = process.env.DOMAIN || 'localhost';
const PORT: number = +process.env.PORT || 5100;
const END_POINT: string = process.env.END_POINT || 'graphql';
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000;
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 3;

export {
  NODE_ENV,
  DOMAIN,
  PORT,
  END_POINT,
  RATE_LIMIT_MAX,
  GRAPHQL_DEPTH_LIMIT,
};
