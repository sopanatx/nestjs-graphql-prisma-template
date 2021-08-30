const NODE_ENV: string = process.env.NODE_ENV || 'development';

// application
const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#87e8de';
const DOMAIN: string = process.env.DOMAIN || 'localhost';
const PORT: number = +process.env.PORT || 5100;
const END_POINT: string = process.env.END_POINT || 'graphql';
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000;
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 3;
const FE_URL: string = process.env.FE_URL || 'http://localhost:5100';
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'shibaInuW0rld';
const JWT_EXPIRATION_TIME: number = +process.env.JWT_EXPIRATION_TIME || 3600;
const JWT_ISSUER: string = process.env.JWT_ISSUER || 'shibaInuW0rld';
const JWT_AUDIENCE: string = process.env.JWT_AUDIENCE || 'shibaInuW0rld';
const JWT_ALGORITHM: string = process.env.JWT_ALGORITHM || 'HS256';
const JWT_PRIVATE_KEY: string = process.env.JWT_PRIVATE_KEY || 'shibaInuW0rld';
const JWT_PUBLIC_KEY: string = process.env.JWT_PUBLIC_KEY || 'shibaInuW0rld';
export {
  NODE_ENV,
  PRIMARY_COLOR,
  DOMAIN,
  PORT,
  END_POINT,
  RATE_LIMIT_MAX,
  GRAPHQL_DEPTH_LIMIT,
  FE_URL,
  JWT_SECRET_KEY,
  JWT_EXPIRATION_TIME,
  JWT_ISSUER,
  JWT_AUDIENCE,
  JWT_ALGORITHM,
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,
};
