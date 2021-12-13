const Redis = require("ioredis");

class cache {
  constructor() {

    this.redis = new Redis(process.env.REDIS_TLS_URL, {
      tls: {
          rejectUnauthorized: false
      },
      keyPrefix: "cache:"
    });
  }

  async get(key) {

    const value = await this.redis.get(key);

    return value ? JSON.parse(value) : null;
  }

  set(key, value, timeExp) {
    return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
  }

  del(key) {
    return this.redis.del(key);
  }

  async delPrefix(prefix) {
    const keys = (await this.redis.keys(`cache:${prefix}:*`)).map((key) =>
      key.replace("cache:", "")
    );

    return this.redis.del(keys);
  }
}
module.exports = new cache();
