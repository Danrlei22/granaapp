import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_lqc1ykFumj2B@ep-small-leaf-ae62kzha-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
