export type User = {
  id: string;
  passwordHash: string;
  createdAt: string;
  email: string;
  name: string;
};

export type Toast = {
  id: string | number;
  message: string;
  type: "info" | "success" | "warning" | "error";
  duration: number;
};

export type Link = {
  id: string | number;
  userId: string;
  url: string;
  title: string;
  createdAt: string;
};

export type Session = {
  id: string | number;
  userId: string;
  createdAt: string;
  expiresAt: string;
};
