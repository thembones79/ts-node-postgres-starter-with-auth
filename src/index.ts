import { app } from "./app";
import { pool } from "./pool";
import { keys } from "./config/keys";

const { PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD } = keys;
console.log("hello");

const start = async () => {
  //  try {
  //    await pool.connect({
  //      host: PGHOST,
  //      port: parseInt(PGPORT),
  //      database: PGDATABASE,
  //      user: PGUSER,
  //      password: PGPASSWORD,
  //    });
  //    const res = await pool.query("SELECT $1::text as name", ["PostgreSQL"]);
  //    console.info(`Connected to ${res?.rows[0].name} 🎉`);
  //  } catch (error) {
  //    console.error(error);
  //  }

  const PORT = process.env.PORT || 3090;
  app.listen(PORT, () => {
    console.info(`Listening on port ${PORT}...`);
  });

  //  if (process.env.PORT) {
  //    app.listen(parseInt(process.env.PORT), "0.0.0.0", 511);
  //  } else {
  //    console.warn("No PORT defined");
  //  }
};

start();
