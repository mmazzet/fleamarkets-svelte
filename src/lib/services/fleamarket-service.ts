import axios from "axios";
import type { Session, User } from "$lib/types/fleamarket-types";
import type { Country, Fleamarket } from "$lib/types/fleamarket-types";

export const fleamarketService = {
  baseUrl: "https://fleamarkets-hapi.onrender.com",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data.id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async addmarket (fleamarket: Fleamarket, session: Session) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.post(this.baseUrl + "/api/countries/" + fleamarket.country + "/fleamarkets", fleamarket);
      return response.status == 200;
    } catch (error) {
      return false;
    }
  },

  async getCountries(session: Session): Promise<Country[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/countries");
      return response.data;
    } catch (error) {
      return [];
    }
  },

  async getFleamarkets(session: Session): Promise<Fleamarket[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
      const response = await axios.get(this.baseUrl + "/api/fleamarkets");
      return response.data;
    } catch (error) {
      return [];
    }
  }
};
