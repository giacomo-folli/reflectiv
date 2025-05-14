import { dev } from "$app/environment";

/**
 * In-memory database implementation
 * This is for development and testing purposes only
 * In a production environment, this should be replaced with a proper database
 */

// Helper to generate UUIDs
// function generateId() {
//   return crypto.randomUUID();
// }

// Store data in memory
// const store = {
//   users: [
//     // Sample user for testing in development
//     {
//       id: "1",
//       email: "test@example.com",
//       name: "Test User",
//       passwordHash:
//         "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", // 'password123' with SHA-256
//       createdAt: new Date("2025-05-01").toISOString(),
//     },
//   ],
//   sessions: [],
//   links: [
//     // Sample link for testing in development
//     {
//       id: "1",
//       userId: "1",
//       title: "Sample ChatGPT Conversation",
//       url: "https://chat.openai.com/share/abc123",
//       createdAt: new Date("2025-05-10").toISOString(),
//     },
//   ],
// };

// User data access
// export const userDb = {
//   findByEmail(email: string) {
//     return store.users.find((user) => user.email === email) || null;
//   },

//   findById(id: string | number) {
//     return store.users.find((user) => user.id === id) || null;
//   },

//   createUser(userData: any) {
//     const newUser = {
//       id: generateId(),
//       ...userData,
//       createdAt: new Date().toISOString(),
//     };

//     store.users.push(newUser);
//     return newUser;
//   },

//   updateUser(id: string | number, userData: any) {
//     const index = store.users.findIndex((user) => user.id === id);
//     if (index === -1) return null;

//     const updatedUser = { ...store.users[index], ...userData };
//     store.users[index] = updatedUser;
//     return updatedUser;
//   },

//   deleteUser(id: string | number) {
//     const index = store.users.findIndex((user) => user.id === id);
//     if (index !== -1) {
//       store.users.splice(index, 1);
//       return true;
//     }
//     return false;
//   },

//   // For debugging in development mode only
//   debug() {
//     if (dev) {
//       return [...store.users];
//     }
//     return null;
//   },
// };

// Session data access
// export const sessionDb = {
//   createSession(userId: string | number) {
//     const sessionId = generateId();
//     const session = {
//       id: sessionId,
//       userId,
//       createdAt: new Date().toISOString(),
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
//     };

//     store.sessions.push(session);
//     return session;
//   },

//   findById(sessionId: string | number) {
//     return (
//       store.sessions.find((session) => (session as any).id === sessionId) ||
//       null
//     );
//   },

//   deleteSession(sessionId: string | number) {
//     const index = store.sessions.findIndex(
//       (session) => (session as any).id === sessionId
//     );
//     if (index !== -1) {
//       store.sessions.splice(index, 1);
//       return true;
//     }
//     return false;
//   },

//   deleteAllUserSessions(userId: string | number) {
//     store.sessions = store.sessions.filter(
//       (session) => (session as any).userId !== userId
//     );
//     return true;
//   },

//   // For debugging in development mode only
//   debug() {
//     if (dev) {
//       return [...store.sessions];
//     }
//     return null;
//   },
// };

// Link data access
// export const linkDb = {
//   createLink(linkData: any) {
//     const newLink = {
//       id: generateId(),
//       ...linkData,
//       createdAt: new Date().toISOString(),
//     };

//     store.links.push(newLink);
//     return newLink;
//   },

//   findByUserId(userId: string | number) {
//     return store.links.filter((link) => link.userId === userId);
//   },

//   findById(id: string | number) {
//     return store.links.find((link) => link.id === id) || null;
//   },

//   updateLink(id: string | number, linkData: any) {
//     const index = store.links.findIndex((link) => link.id === id);
//     if (index === -1) return null;

//     const updatedLink = { ...store.links[index], ...linkData };
//     store.links[index] = updatedLink;
//     return updatedLink;
//   },

//   deleteLink(id: string | number) {
//     const index = store.links.findIndex((link) => link.id === id);
//     if (index !== -1) {
//       store.links.splice(index, 1);
//       return true;
//     }
//     return false;
//   },

//   // For debugging in development mode only
//   debug() {
//     if (dev) {
//       return [...store.links];
//     }
//     return null;
//   },
// };
