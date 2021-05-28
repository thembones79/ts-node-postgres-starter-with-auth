import { BadRequestError } from "../errors";
import { pool } from "../pool";

class UserRepo {
  static async find() {
    try {
      const result = await pool.query(`SELECT id, username, email FROM users;`);
      return result?.rows;
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async findById(id: string) {
    try {
      const result = await pool.query(
        `SELECT id, username, email FROM users WHERE id = $1;`,
        [id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async findByEmail(email: string) {
    try {
      const result = await pool.query(
        `SELECT id, username, email, password FROM users WHERE email = $1;`,
        [email]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async insert({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) {
    try {
      const result = await pool.query(
        `INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email;`,
        [username, password, email]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async updateData({
    id,
    username,
    email,
  }: {
    id: string;
    username: string;
    email: string;
  }) {
    try {
      const result = await pool.query(
        `UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email;`,
        [username, email, id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async updatePassword({
    id,
    password,
  }: {
    id: string;
    password: string;
  }) {
    try {
      const result = await pool.query(
        `UPDATE users SET password = $1 WHERE id = $2 RETURNING id, username, email;`,
        [password, id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async delete(id: string) {
    try {
      const result = await pool.query(
        `DELETE FROM users WHERE id = $1 RETURNING id, username, email;`,
        [id]
      );
      return result?.rows[0];
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }

  static async count() {
    try {
      const result = await pool.query(`SELECT COUNT(*) FROM users;`);
      return parseInt(result?.rows[0].count);
    } catch (error) {
      throw new BadRequestError(error.message);
    }
  }
}

export { UserRepo };
