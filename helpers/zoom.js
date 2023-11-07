const { default: axios } = require("axios");
const { models } = require("../database/connect");
const buffer = require("buffer").Buffer;

class Zoom {
  _token = "";
  _refresh_token = "";
  async setToken() {
    const tokens = await models.zoom.findAll();
    this._token = tokens[0].token;
    this._refresh_token = tokens[0].refresh_token;
  }

  async getValidToken() {
    try {
      const response = await axios.get(`${process.env.ZOOM_BASE}users`, {
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      });
      if (response.status == 200) {
        return this._token;
      }
    } catch (error) {
      if (error.response.status == 401) {
        return this.refreshToken();
      }
    }
  }
  async refreshToken() {
    let base = "https://zoom.us/oauth/token";
    const autCode = buffer
      .from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_SECRET}`)
      .toString("base64");

    try {
      const response = await axios.post(base, undefined, {
        params: {
          grant_type: `refresh_token`,
          refresh_token: this._refresh_token,
        },
        headers: {
          Authorization: `Basic ${autCode}`,
        },
      });
      await models.zoom.update(
        {
          token: response.data.access_token,
          refreshToken: response.data.refresh_token,
        },
        {
          where: {
            id: 1,
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      if (error?.response?.status == 400 || error?.response?.status == 401) {
        console.log("error.response.data");
        console.log(error.response.data);

      }
    }
  }
}
module.exports = Zoom;
