import bcrypt from "bcrypt";

export default class PasswordHasher {
  static async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
  static async checkPassword(password: string, hashedPassword: string) {
    const isIdentical = await bcrypt.compare(password, hashedPassword);
    return isIdentical;
  }
}
