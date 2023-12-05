const redis = require("redis");

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

const client = redis.createClient({
  host: redisHost || "localhost",
  port: redisPort || 63791,
});

module.exports = {
  setRedis: async (key, value) => {
    try {
      client.connect();

      return await client.set(key, value, "EX", 60 * 60 * 24);
    } catch (error) {
      throw new Error(error);
    } finally {
      client.quit();
    }
  },
  getRedis: async (key) => {
    try {
      client.connect();

      return await client.get(key);
    } catch (error) {
      throw new Error(error);
    } finally {
      client.quit();
    }
  },
};
