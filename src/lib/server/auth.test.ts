import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  hashPassword,
  validatePassword,
  updateUserName,
  updateUserEmail,
  updateUserPassword,
  registerUser, // Assuming registerUser might be useful for setup or also needs testing
  loginUser,
  validateSession,
  logoutUser
} from './auth';
import { userDb, sessionDb } from './db'; // We will mock these

// Mock the entire db module
vi.mock('./db', () => {
  // Mock user structure
  const mockUser = {
    id: 'user1',
    name: 'Original Name',
    email: 'original@example.com',
    passwordHash: 'hashedPasswordOriginal',
  };

  const mockAdminUser = {
    id: 'adminUser',
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash: 'hashedPasswordAdmin',
  }

  // In-memory store for users for more realistic testing
  let usersStore: Record<string, any> = {
    [mockUser.id]: { ...mockUser },
    [mockAdminUser.id]: { ...mockAdminUser }
  };

  let sessionsStore: Record<string, any> = {};


  return {
    userDb: {
      findById: vi.fn((id: string) => usersStore[id] ? { ...usersStore[id] } : undefined),
      findByEmail: vi.fn((email: string) => Object.values(usersStore).find(u => u.email === email)),
      createUser: vi.fn((userData: any) => {
        const newUser = { id: `user${Object.keys(usersStore).length + 1}`, ...userData };
        usersStore[newUser.id] = newUser;
        return newUser;
      }),
      updateUser: vi.fn((userId: string, dataToUpdate: any) => {
        if (!usersStore[userId]) return undefined;
        usersStore[userId] = { ...usersStore[userId], ...dataToUpdate };
        return { ...usersStore[userId] };
      }),
      // Utility to reset store for tests
      _resetStore: () => {
        usersStore = {
            [mockUser.id]: { ...mockUser },
            [mockAdminUser.id]: { ...mockAdminUser }
        };
      },
      _users: usersStore // Expose for direct manipulation in tests if necessary (use with caution)
    },
    sessionDb: {
      createSession: vi.fn((userId: string) => {
        const sessionId = `session${Object.keys(sessionsStore).length + 1}`;
        const session = { id: sessionId, userId, expiresAt: new Date(Date.now() + 3600 * 1000).toISOString() };
        sessionsStore[sessionId] = session;
        return session;
      }),
      findById: vi.fn((id: string) => sessionsStore[id] ? { ...sessionsStore[id] } : undefined),
      deleteSession: vi.fn((id: string) => {
        if (sessionsStore[id]) {
          delete sessionsStore[id];
          return true;
        }
        return false;
      }),
      deleteAllUserSessions: vi.fn((userId: string) => {
        let deleted = false;
        for (const id in sessionsStore) {
          if (sessionsStore[id].userId === userId) {
            delete sessionsStore[id];
            deleted = true;
          }
        }
        return deleted;
      }),
      _resetStore: () => {
        sessionsStore = {};
      }
    }
  };
});

describe('Auth Functions', () => {
  beforeEach(() => {
    // Reset mocks and stores before each test
    vi.clearAllMocks();
    (userDb as any)._resetStore();
    (sessionDb as any)._resetStore();
  });

  describe('hashPassword and validatePassword', () => {
    it('should hash a password and then validate it successfully', async () => {
      const password = 'mySecurePassword123';
      const hashedPassword = await hashPassword(password);
      expect(hashedPassword).not.toBe(password);
      expect(await validatePassword(password, hashedPassword)).toBe(true);
    });

    it('should fail to validate an incorrect password', async () => {
      const password = 'mySecurePassword123';
      const wrongPassword = 'wrongPassword';
      const hashedPassword = await hashPassword(password);
      expect(await validatePassword(wrongPassword, hashedPassword)).toBe(false);
    });
  });

  describe('updateUserName', () => {
    const userId = 'user1';
    it('should update user name successfully', async () => {
      const newName = 'New Name';
      const result = await updateUserName(userId, newName);
      expect(result).toBe(true);
      expect(userDb.findById).toHaveBeenCalledWith(userId);
      expect(userDb.updateUser).toHaveBeenCalledWith(userId, { name: newName });
      // Check if the name was actually updated in our mock DB
      const updatedUser = (userDb.findById as any)(userId);
      expect(updatedUser.name).toBe(newName);
    });

    it('should return false if name is empty', async () => {
      const result = await updateUserName(userId, '');
      expect(result).toBe(false);
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });

    it('should return false if user is not found', async () => {
      const result = await updateUserName('nonExistentUser', 'New Name');
      expect(result).toBe(false);
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });
     it('should return false if userId is empty', async () => {
      const result = await updateUserName('', 'New Name');
      expect(result).toBe(false);
      expect(userDb.findById).not.toHaveBeenCalled();
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });
  });

  describe('updateUserEmail', () => {
    const userId = 'user1'; // Belongs to original@example.com
    const otherUserId = 'adminUser'; // Belongs to admin@example.com

    it('should update user email successfully', async () => {
      const newEmail = 'updated@example.com';
      const result = await updateUserEmail(userId, newEmail);
      expect(result).toBe(true);
      expect(userDb.findById).toHaveBeenCalledWith(userId);
      expect(userDb.findByEmail).toHaveBeenCalledWith(newEmail);
      expect(userDb.updateUser).toHaveBeenCalledWith(userId, { email: newEmail });
      const updatedUser = (userDb.findById as any)(userId);
      expect(updatedUser.email).toBe(newEmail);
    });

    it('should return false if email format is invalid', async () => {
      const result = await updateUserEmail(userId, 'invalid-email');
      expect(result).toBe(false);
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });

    it('should return false if user is not found', async () => {
      const result = await updateUserEmail('nonExistentUser', 'new@example.com');
      expect(result).toBe(false);
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });

    it('should return false if new email already exists for another user', async () => {
      const result = await updateUserEmail(userId, 'admin@example.com'); // adminUser's email
      expect(result).toBe(false);
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });

    it('should allow updating to the same email for the current user', async () => {
      const result = await updateUserEmail(userId, 'original@example.com');
      expect(result).toBe(true); // Should this be true or false? Current logic allows it.
                                 // Assuming it means "no change needed" thus success.
      expect(userDb.updateUser).toHaveBeenCalledWith(userId, { email: 'original@example.com' });
    });
     it('should return false if userId is empty', async () => {
      const result = await updateUserEmail('', 'new@example.com');
      expect(result).toBe(false);
      expect(userDb.findById).not.toHaveBeenCalled();
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });
  });

  describe('updateUserPassword', () => {
    const userId = 'user1';
    it('should update user password successfully', async () => {
      const newPassword = 'newPassword123';
      const result = await updateUserPassword(userId, newPassword);
      expect(result).toBe(true);
      expect(userDb.findById).toHaveBeenCalledWith(userId);
      expect(userDb.updateUser).toHaveBeenCalledWith(userId, { passwordHash: expect.any(String) });

      const updatedUser = (userDb.findById as any)(userId);
      expect(await validatePassword(newPassword, updatedUser.passwordHash)).toBe(true);
      expect(updatedUser.passwordHash).not.toBe('hashedPasswordOriginal');
    });

    it('should return false if password is too weak', async () => {
      const result = await updateUserPassword(userId, 'weak');
      expect(result).toBe(false);
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });

    it('should return false if password does not meet regex (no number)', async () => {
      const result = await updateUserPassword(userId, 'passwordonlyletters');
      expect(result).toBe(false);
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });

    it('should return false if password does not meet regex (no letter)', async () => {
      const result = await updateUserPassword(userId, '1234567890');
      expect(result).toBe(false);
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });

    it('should return false if user is not found', async () => {
      const result = await updateUserPassword('nonExistentUser', 'newPassword123');
      expect(result).toBe(false);
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });
    it('should return false if userId is empty', async () => {
      const result = await updateUserPassword('', 'newPassword123');
      expect(result).toBe(false);
      expect(userDb.findById).not.toHaveBeenCalled();
      expect(userDb.updateUser).not.toHaveBeenCalled();
    });
  });

  // Basic tests for other auth functions if time permits or if they are critical for update logic
  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      const newUser = await registerUser('test@example.com', 'Password123', 'Test User');
      expect(newUser).toBeDefined();
      expect(newUser?.email).toBe('test@example.com');
      expect(userDb.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(userDb.createUser).toHaveBeenCalled();
    });

    it('should throw error if email already exists during registration', async () => {
      // First user registration is fine
      await registerUser('existing@example.com', 'Password123', 'Existing User');
      // Attempt to register again with the same email
      await expect(registerUser('existing@example.com', 'Password123', 'Another User'))
        .rejects.toThrow('User with this email already exists');
    });
  });

  describe('loginUser', () => {
    it('should login an existing user successfully', async () => {
      // Ensure 'original@example.com' with 'hashedPasswordOriginal' (from mockUser) exists.
      // The mock for validatePassword needs to be realistic for login.
      // For this test, we assume 'hashedPasswordOriginal' is the hash of 'ValidPass123'
      // We need to ensure our mock validatePassword works or pre-hash a password.
      // The actual hashPassword and validatePassword are used, so this should be fine.

      const loginPassword = "passwordForUser1";
      const originalUser = (userDb.findById as any)('user1');
      originalUser.passwordHash = await hashPassword(loginPassword); // Set a known password hash
      (userDb.updateUser as any)('user1', { passwordHash: originalUser.passwordHash});


      const { sessionId, user } = await loginUser('original@example.com', loginPassword);
      expect(sessionId).toEqual(expect.any(String));
      expect(user.email).toBe('original@example.com');
      expect(sessionDb.createSession).toHaveBeenCalledWith('user1');
    });

    it('should throw error for non-existent user during login', async () => {
      await expect(loginUser('nosuchuser@example.com', 'Password123'))
        .rejects.toThrow("This user doesn't exists");
    });

    it('should throw error for invalid password during login', async () => {
       const loginPassword = "passwordForUser1";
       const originalUser = (userDb.findById as any)('user1');
       originalUser.passwordHash = await hashPassword(loginPassword);
      (userDb.updateUser as any)('user1', { passwordHash: originalUser.passwordHash});

      await expect(loginUser('original@example.com', 'WrongPassword123'))
        .rejects.toThrow('Invalid password or email');
    });
  });

  describe('validateSession', () => {
    it('should validate a correct session and return user details', async () => {
      const loginPassword = "passwordForUser1";
      const originalUserRaw = (userDb.findById as any)('user1');
      originalUserRaw.passwordHash = await hashPassword(loginPassword);
      (userDb.updateUser as any)('user1', { passwordHash: originalUserRaw.passwordHash});

      const { sessionId } = await loginUser('original@example.com', loginPassword);
      const user = validateSession(sessionId);
      expect(user).toBeDefined();
      expect(user?.email).toBe('original@example.com');
      expect(user).not.toHaveProperty('passwordHash');
    });

    it('should return null for an invalid session ID', () => {
      expect(validateSession('invalidSessionId')).toBeNull();
    });

    it('should return null if session is expired', () => {
      const session = (sessionDb.createSession as any)('user1');
      // Manually expire the session
      (sessionDb.findById as any).mockImplementationOnce((id: string) => {
        if (id === session.id) {
            return { ...session, expiresAt: new Date(Date.now() - 1000).toISOString() };
        }
        return undefined;
      });
      expect(validateSession(session.id)).toBeNull();
      expect(sessionDb.deleteSession).toHaveBeenCalledWith(session.id);
    });
  });

  describe('logoutUser', () => {
    it('should logout a user by deleting their session', async () => {
      const loginPassword = "passwordForUser1";
      const originalUserRaw = (userDb.findById as any)('user1');
      originalUserRaw.passwordHash = await hashPassword(loginPassword);
      (userDb.updateUser as any)('user1', { passwordHash: originalUserRaw.passwordHash});

      const { sessionId } = await loginUser('original@example.com', loginPassword);
      expect(logoutUser(sessionId)).toBe(true);
      expect(sessionDb.deleteSession).toHaveBeenCalledWith(sessionId);
      expect((sessionDb.findById as any)(sessionId)).toBeUndefined();
    });

    it('should return false if session ID to logout is not found', () => {
      expect(logoutUser('nonExistentSessionId')).toBe(false);
    });
  });
});
