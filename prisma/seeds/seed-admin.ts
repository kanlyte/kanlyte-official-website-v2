import "dotenv/config";
import { auth } from "../../lib/auth";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@kanlyte.com";
  const password = process.env.ADMIN_PASSWORD ?? "Admin@1234";
  const name = "Admin";

  await auth.api.signUpEmail({
    body: { email, password, name },
  });

  console.log(`✅ Admin user created: ${email}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
