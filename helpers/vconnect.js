const { default: axios } = require("axios");

class Vconncet {
  #AcceptLanguage = "Accept-Language";
  #Base = "https://classapi.vconnct.me/api/v1";
  #headers = {
    License: process.env.VCONNECT,
    [this.#AcceptLanguage]: "en",
  };
  #ModeratorPassword = "codearea13579";
  #AttendeePassword = "120";

  /**
   *
   * @param {*} meeting_id
   * @param {*} start_at
   * @param {*} title
   * @returns session_id
   */
  async CreateSession(meeting_id, start_at, title) {
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
      return response.data.data;
    } catch (error) {
      console.log(error.response.data);
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
      console.log(error.response.data);
      throw new Error(error.message);
    }
  }

  /**
   *
   * @returns Meeting Url
   */
  async JoinMeeting(meetingId, name, moderator, session_id) {
    try {
      const body = {
        meeting_id: meetingId,
        fullname: name,
        password: moderator ? this.#ModeratorPassword : this.#AttendeePassword,
        role: moderator ? "moderator" : "viewer",
      };
      const response = await axios.post(`${this.#Base}/join_meeting/`, body, {
        headers: { ...this.#headers },
      });
      return response.data.data.url;
    } catch (error) {
      await this.StartTheMeeting(session_id);
      return await this.JoinMeeting(meetingId, name, moderator, session_id);
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
