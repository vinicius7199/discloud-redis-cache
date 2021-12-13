const api = require("./api");
const cache = require("./cache");

class Discloud {
  async getUser() {
    const cached = await cache.get('user');

    if (cached) {
      return cached;
    }

    const { data } = await api.get(`/user`);

    const response = {
      userID: data.userID,
      plan: data.plan,
      lastDataLeft: data.lastDataLeft,
      planDataEnd: data.planDataEnd,
      updatedData: new Date().toISOString()
    }

    cache.set('user', response, 60);

    return response;
  }

  async getBot(params) {
    const cached = await cache.get('bot-' + params.id);

    if (cached) {
      return cached;
    }

    const { data } = await api.get(`/bot/${params.id}`);

    const response = {
      bot_id: data.bot_id,
      info: data.info,
      container: data.container,
      cpu: data.planDataEnd,
      memory: data.memory,
      last_restart: data.last_restart,
      updatedData: new Date().toISOString()
    }

    cache.set('bot-' + params.id, response, 60);

    return response;
  }
}

module.exports = new Discloud();
