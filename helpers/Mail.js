const { default: axios } = require("axios");
const { models } = require("../database/connect");

class zoho {
  _token = "";

  async setToken() {
    const tokens = await models.zoho.findAll();
    this._token = tokens[0].access_token;
    this._scope = tokens[0].scope;
    return this._token;
  }
  async TestToken() {
    const token = await this.setToken();
    try {
      const res = await axios.get(`http://mail.zoho.com/api/accounts`, {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      });
      if (res.status == 200) {
        return token;
      }
    } catch (error) {
      return this.refrehToken();
    }
  }
  async refrehToken() {
    try {
      const response = await axios.post(
        `https://accounts.zoho.com/oauth/v2/token?grant_type=refresh_token&client_id=${process.env.ZOHO_CLIENT_ID}&client_secret=${process.env.ZOHO_CLIENT_SECRET}&redirect_uri=${process.env.ZOHO_REDIRECT_URI}&refresh_token=${process.env.ZOHO_REFRESH_TOKEN}`
      );
      const { access_token, scope } = response.data;
      await models.zoho.update(
        {
          access_token: access_token,
          scope: scope,
        },
        {
          where: {
            id: 1,
          },
        }
      );
      return access_token;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = zoho;
