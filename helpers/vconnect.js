const { default: axios } = require("axios");
const { response } = require("express");

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
    const body = {
      title: title,
      moderator_password: this.#ModeratorPassword,
      welcome_text: "welcome to the class",
      meeting_setting: [...this.#Options],
    };
    try {
      const response = await axios.post(`${this.#Base}/create_meeting/`, body, {
        headers: { ...this.#headers },
      });
      return response.data.data.meeting_id;
    } catch (error) {
      const meetings = await this.ListMeetings();
      await this.deleteMeetings(meetings[1].meeting_id);
      return await this.CreateMeeting(title);
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
      throw new Error(error.message);
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
      throw new Error(error.message);
    }
  }

  /**
   *
   * @param {*} session_id
   * @returns Meeting Url
   */
  async JoinMeeting(meetingId, name) {
    try {
      const body = {
        meeting_id: meetingId,
        fullname: name,
        password: "120",
        role: "viewer",
      };
      const response = await axios.post(`${this.#Base}/join_meeting/`, body, {
        headers: { ...this.#headers },
      });
      return response.data.data.url;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  /**
   * @returns list of meetings
   */
  async ListMeetings() {
    try {
      const response = await axios.get(`${this.#Base}/list_meetings/`, {
        headers: { ...this.#headers },
      });
      return response.data.data;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  /**
   * @param {integer} meeting_id
   */
  async deleteMeetings(meeting_id) {
    try {
      const resposne = await axios.delete(
        `${this.#Base}/delete_scheduled_meeting/?meeting_id=${meeting_id}`,
        {
          headers: { ...this.#headers },
        }
      );
      if (resposne.data.status_code == 400) {
        await this.endMeetings(meeting_id);
        await this.deleteMeetings(meeting_id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @param {integer} meeting_id
   */
  async endMeetings(meeting_id) {
    try {
      const res = await axios.get(
        `${this.#Base}/end_meeting/?meeting_id=${meeting_id}`,
        {
          headers: { ...this.#headers },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Vconncet;
