import axios from 'axios';
import userStore from '../store/UserStore';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

const authService = {
  clearToken: () => localStorage.clear(),
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      return false;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    if (!userStore.user && !userStore.failedFetchUser) {
      userStore.getUserInfo();
    }
    return true;
  },
  setAccessToken: (token: string) => localStorage.setItem(ACCESS_TOKEN, token),
  getAccessToken: (): string | null => localStorage.getItem(ACCESS_TOKEN),
  signOut: () => {
    userStore.setUser(null);
    localStorage.clear();
  },
};

export default authService;
