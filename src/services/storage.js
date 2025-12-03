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

// suporte a carrinhos por usuário
const CARTS_KEY = "carts";

// retorna objeto { [userId]: itemsArray, guest: itemsArray }
export function getCarts() {
  return JSON.parse(localStorage.getItem(CARTS_KEY)) || {};
}

export function saveCarts(obj) {
  localStorage.setItem(CARTS_KEY, JSON.stringify(obj));
}

// retorna array de items para userId (string|number) ou [] se não existir
export function getCartFor(userId) {
  const carts = getCarts();
  return carts[userId] || [];
}

export function saveCartFor(userId, items) {
  const carts = getCarts();
  carts[userId] = items;
  saveCarts(carts);
}

// helpers para guest
export function getGuestCart() {
  return getCartFor("guest");
}

export function saveGuestCart(items) {
  saveCartFor("guest", items);
}

export function clearCartFor(userId) {
  const carts = getCarts();
  delete carts[userId];
  saveCarts(carts);
}
