const USER_KEY = 'ecommerce_user';

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));
export const setUser = (u) => localStorage.setItem(USER_KEY, JSON.stringify(u));
export const clearUser = () => localStorage.removeItem(USER_KEY);