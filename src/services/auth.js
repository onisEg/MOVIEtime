// Client-side auth for the demo.
// The original WordPress login API is no longer online, so users are stored
// in localStorage with SHA-256 hashed passwords. This keeps the app usable
// as a portfolio demo; a real app would use a backend (Firebase, Supabase…).

const USERS_KEY = "movietime_users";
const TOKEN_KEY = "userToken";

export const DEMO_USER = { username: "demo", password: "demo123" };

async function hash(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

async function ensureDemoUser() {
  const users = readUsers();
  if (!users.some((u) => u.username === DEMO_USER.username)) {
    users.push({
      username: DEMO_USER.username,
      email: "demo@movietime.app",
      age: 25,
      passwordHash: await hash(DEMO_USER.password),
    });
    writeUsers(users);
  }
}

export async function register({ username, email, age, password }) {
  await ensureDemoUser();
  const users = readUsers();
  const name = username.toLowerCase();
  if (users.some((u) => u.username.toLowerCase() === name)) {
    return { status: "error", message: "This username is already taken." };
  }
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { status: "error", message: "This email is already registered." };
  }
  users.push({ username, email, age, passwordHash: await hash(password) });
  writeUsers(users);
  return { status: "success" };
}

export async function login({ username, password }) {
  await ensureDemoUser();
  const passwordHash = await hash(password);
  const user = readUsers().find(
    (u) =>
      u.username.toLowerCase() === username.toLowerCase() &&
      u.passwordHash === passwordHash
  );
  if (!user) {
    return { status: "error", message: "Wrong username or password." };
  }
  localStorage.setItem(TOKEN_KEY, crypto.randomUUID());
  localStorage.setItem("movietime_current_user", user.username);
  return { status: "success", username: user.username };
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("movietime_current_user");
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
