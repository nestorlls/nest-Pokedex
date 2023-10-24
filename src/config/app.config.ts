export const envConfig = () => ({
  environment: process.env.NODE_ENV || 'development',
  mongoDB: process.env.MODNGODB,
  port: parseInt(process.env.PORT) || 3000,
  defaultLimit: parseInt(process.env.DEFAULT_LIMIT) || 7,
});
