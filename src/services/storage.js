const USERS_KEY = "users";

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

// garante que exista um admin inicial
(function seedAdmin() {
  const users = getUsers(); // <-- aqui você tinha esquecido
  const hasAdmin = users.some(u => u.role === "admin");

  if (!hasAdmin) {
    users.push({
      id: Date.now(),
      username: "admin",
      email: "admin@admin.com",
      password: "1234",
      role: "admin"
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
})();

export function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

// user = { username, email, password, role? }
export function addUser(user) {
  const list = getUsers();

  const newUser = {
    id: Date.now(),
    role: user.role || "user",
    ...user
  };

  list.push(newUser);
  saveUsers(list);

  return newUser;
}

export function removeUser(id) {
  const list = getUsers();
  const filtered = list.filter((u) => u.id !== id);
  saveUsers(filtered);
}

export function getUserById(id) {
  const list = getUsers();
  return list.find((u) => u.id == id) || null;
}
