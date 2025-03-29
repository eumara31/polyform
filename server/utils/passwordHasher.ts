import bcrypt from 'bcrypt';

export const hashPassword = (password: string) => bcrypt.hash(password, 3);
export const checkPassword = (password: string, hashedPassword: string) => bcrypt.compare(password, hashedPassword);