const USERS_KEY = "users";

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

export function addUser(user) {
  const list = getUsers();
  list.push(user);
  saveUsers(list);
}
