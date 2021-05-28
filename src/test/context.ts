import { randomBytes } from "crypto";
import migrate from "node-pg-migrate";
import format from "pg-format";
import { pool } from "../pool";

const DEFAULT_OPTS = {
  host: "localhost",
  port: 5432,
  database: "xstarter-test",
  user: "michal",
  password: "",
};

export class Context {
  static async build() {
    // Randomly generate a role name to connect to PG as
    const roleName = "b" + randomBytes(4).toString("hex");

    // Connect to PG as usual
    const pool1 = await pool.connect(DEFAULT_OPTS);

    // Create a new role
    const newRole = await pool.query(
      format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName)
    );

    // Create a schema wuth the same name
    const newSchema = await pool.query(
      format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName)
    );

    // Disconnect entirely from PG
    await pool.close();

    const ROLE_OPTS = {
      ...DEFAULT_OPTS,
      user: roleName,
      password: roleName,
    };

    // Run our migrations in the new schema
    // @ts-ignore

    const migs = await migrate({
      schema: roleName,
      direction: "up",
      log: () => {},
      noLock: true,
      dir: "migrations",
      databaseUrl: ROLE_OPTS,
    });

    // Connect to PG as the newly created role
    const pool2 = await pool.connect(ROLE_OPTS);
    return new Context(roleName);
  }

  constructor(public roleName: string) {
    this.roleName = roleName;
  }

  async reset() {
    const rrr = await pool.query(`DELETE FROM users RETURNING *;`);
    return rrr;
  }

  async close() {
    // Disconnect from PG
    await pool.close();

    // Reconnect as out root user
    await pool.connect(DEFAULT_OPTS);

    // Delete role and schema we created
    await pool.query(format("DROP SCHEMA %I CASCADE;", this.roleName));
    await pool.query(format("DROP ROLE %I;", this.roleName));

    // Disconnect
    await pool.close();
  }
}
