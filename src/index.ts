import { app } from "./app";
import { pool } from "./pool";

const start = async () => {
  try {
    await pool.connect({
      host: "localhost",
      port: parseInt("5432"),
      database: "starter",
      user: "michal",
      password: "",
    });
    const res = await pool.query("SELECT $1::text as name", ["PostgreSQL"]);
    console.info(`Connected to ${res?.rows[0].name} 🎉`);
  } catch (error) {
    console.error(error);
  }

  const PORT = process.env.PORT || 3090;
  app.listen(PORT, () => {
    console.info(`Listening on port ${PORT}!`);
  });
};

start();
