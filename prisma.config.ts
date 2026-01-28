// This is not neccessory for the project
import "dotenv/config";
import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

dotenv.config();
export default defineConfig({
  schema: "prisma/schema.prisma",
    datasource: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    path: "prisma/migrations",
  },
  
});
