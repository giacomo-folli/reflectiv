import type { User } from "$lib/types/user.types";
import { hashPassword } from "../auth";
import { userDb } from "../db";

export async function updateUserName(
  userId: string,
  name: string
): Promise<User | null> {
  if (!userId) {
    console.error("updateUserName: userId is required.");
    return null;
  }
  if (!name || name.trim() === "") {
    console.error("updateUserName: Name cannot be empty.");
    return null;
  }

  try {
    const user = userDb.findById(userId) as User | undefined;
    if (!user) {
      console.error(`updateUserName: User with ID "${userId}" not found.`);
      return null;
    }

    const updatedUser = userDb.updateUser(userId, { name: name.trim() });
    return updatedUser === undefined ? null : updatedUser;
  } catch (error) {
    console.error("updateUserName: Error updating name.", error);
    return null;
  }
}

export async function updateUserEmail(
  userId: string,
  email: string
): Promise<User | null> {
  if (!userId) {
    console.error("updateUserEmail: userId is required.");
    return null;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("updateUserEmail: Invalid email format.");
    return null;
  }

  try {
    const user = userDb.findById(userId) as User | undefined;
    if (!user) {
      console.error(`updateUserEmail: User with ID "${userId}" not found.`);
      return null;
    }

    const existingUserWithNewEmail = userDb.findByEmail(email) as
      | User
      | undefined;
    if (existingUserWithNewEmail && existingUserWithNewEmail.id !== userId) {
      console.error(
        `updateUserEmail: Email "${email}" is already in use by another account.`
      );
      return null;
    }

    const updatedUser = userDb.updateUser(userId, { email });
    return updatedUser === undefined ? null : updatedUser;
  } catch (error) {
    console.error("updateUserEmail: Error updating email.", error);
    return null;
  }
}

export async function updateUserPassword(
  userId: string,
  password: string
): Promise<User | null> {
  if (!userId) {
    console.error(" userId is required.");
    return null;
  }
  // Example: Minimum 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    console.error(
      "Password does not meet security requirements (minimum 8 characters, including one letter and one number)."
    );
    return null;
  }

  try {
    const user = userDb.findById(userId) as User | undefined;
    if (!user) {
      console.error(`User not found.`);
      return null;
    }

    const passwordHash = await hashPassword(password);
    const updatedUser = userDb.updateUser(userId, { passwordHash });
    return updatedUser === undefined ? null : updatedUser;
  } catch (error) {
    console.error("Error updating password.", error);
    return null;
  }
}
