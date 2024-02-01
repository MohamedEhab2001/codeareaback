const { default: axios } = require("axios");

class Vconncet {
  #AcceptLanguage = "Accept-Language";
  #Base = "https://classapi.vconnct.me/api/v1";
  #Options = [
    {
      setting: "disable_public_chat",
      value: false,
    },
    {
      setting: "lock_layout",
      value: false,
    },
    {
      setting: "disable_private_chat",
      value: true,
    },
    {
      setting: "disable_cam",
      value: false,
    },
    {
      setting: "pause_recording",
      value: false,
    },
    {
      setting: "webcam_for_moderators",
      value: false,
    },
    {
      setting: "disable_mic",
      value: false,
    },
    {
      setting: "auto_start_recording",
      value: true,
    },
    {
      setting: "record",
      value: true,
    },
    {
      setting: "disable_note",
      value: false,
    },
    {
      setting: "dashboard_url_expiration",
      value: false,
    },
  ];
  #headers = {
    License: process.env.VCONNECT,
    [this.#AcceptLanguage]: "en",
  };
  #ModeratorPassword = "codearea13579";
  #AttendeePassword = "120";

  /**
   * 
   * @param {*} title 
   * @returns meeting_id 
   */
  async CreateMeeting(title) {
    try {
      const body = {
        title: title,
        moderator_password: this.#ModeratorPassword,
        welcome_text: "welcome to the class",
        meeting_setting: [...this.#Options],
      };
      const response = await axios.post(`${this.#Base}/create_meeting/`, body, {
        headers: { ...this.#headers },
      });
      return response.data.data.meeting_id;
    } catch (error) {
      console.log(error.message);
      return new Error(error.message);
    }
  }

  /**
   * 
   * @param {*} meeting_id 
   * @param {*} start_at 
   * @param {*} title 
   * @returns session_id
   */
  async MakeItScheduled(meeting_id, start_at, title) {
    try {
      const body = {
        meeting_id,
        start_at,
        title,
        moderator_password: this.#ModeratorPassword,
        attendee_password: this.#AttendeePassword,
      };
      const response = await axios.post(
        `${this.#Base}/create_scheduled_meeting/`,
        body,
        {
          headers: { ...this.#headers },
        }
      );
      return response.data.data.session_id;
    } catch (error) {
      console.log(error.message);
      return new Error(error.message);
    }
  }

  /**
   * 
   * @param {*} session_id 
   * @returns Meeting Url
   */
  async StartTheMeeting(session_id) {
    try {
      const body = {
        moderator_name: "codearea",
        moderator_password: this.#ModeratorPassword,
        session_id,
        logout_url: "codearea.uk",
      };
      const response = await axios.post(
        `${this.#Base}/start_scheduled_meeting/`,
        body,
        {
          headers: { ...this.#headers },
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.log(error.message);
      return new Error(error.message);
    }
  }
}

module.exports = Vconncet;
