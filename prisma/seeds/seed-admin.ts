import "dotenv/config";
import { fileURLToPath } from "node:url";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@kanlyte.com";
  const password = process.env.ADMIN_PASSWORD ?? "Admin@1234";
  const name = "Admin";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`  ⏭  Admin already exists: ${email}`);
    return;
  }

  await auth.api.signUpEmail({
    body: { email, password, name },
  });

  console.log(`✅ Admin user created: ${email}`);
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
  seedAdmin()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
