// In-memory database for users, sessions, and links
export const userDb = {
  users: [
    // Sample user for testing
    {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      passwordHash: '$2a$10$xWsyVpGgdWMtYXzg5KgNWOaYEaQpv6nKOO/qPihLFjz1tgjRawUVe', // 'password123'
      createdAt: new Date('2025-05-01').toISOString()
    }
  ],
  
  findByEmail(email) {
    return this.users.find(user => user.email === email) || null;
  },
  
  findById(id) {
    return this.users.find(user => user.id === id) || null;
  },
  
  createUser(userData) {
    const newUser = {
      id: (this.users.length + 1).toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    this.users.push(newUser);
    return newUser;
  },
  
  updateUser(id, userData) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    
    const updatedUser = { ...this.users[index], ...userData };
    this.users[index] = updatedUser;
    return updatedUser;
  }
};

export const sessionDb = {
  sessions: [],
  
  createSession(userId) {
    const sessionId = crypto.randomUUID();
    const session = {
      id: sessionId,
      userId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
    };
    
    this.sessions.push(session);
    return session;
  },
  
  findById(sessionId) {
    return this.sessions.find(session => session.id === sessionId) || null;
  },
  
  deleteSession(sessionId) {
    const index = this.sessions.findIndex(session => session.id === sessionId);
    if (index !== -1) {
      this.sessions.splice(index, 1);
      return true;
    }
    return false;
  },
  
  deleteAllUserSessions(userId) {
    this.sessions = this.sessions.filter(session => session.userId !== userId);
  }
};

export const linkDb = {
  links: [
    // Sample link for testing
    {
      id: '1',
      userId: '1',
      title: 'Sample ChatGPT Conversation',
      url: 'https://chat.openai.com/share/abc123',
      createdAt: new Date('2025-05-10').toISOString()
    }
  ],
  
  createLink(linkData) {
    const newLink = {
      id: (this.links.length + 1).toString(),
      ...linkData,
      createdAt: new Date().toISOString()
    };
    
    this.links.push(newLink);
    return newLink;
  },
  
  findByUserId(userId) {
    return this.links.filter(link => link.userId === userId);
  },
  
  findById(id) {
    return this.links.find(link => link.id === id) || null;
  },
  
  updateLink(id, linkData) {
    const index = this.links.findIndex(link => link.id === id);
    if (index === -1) return null;
    
    const updatedLink = { ...this.links[index], ...linkData };
    this.links[index] = updatedLink;
    return updatedLink;
  },
  
  deleteLink(id) {
    const index = this.links.findIndex(link => link.id === id);
    if (index !== -1) {
      this.links.splice(index, 1);
      return true;
    }
    return false;
  }
};