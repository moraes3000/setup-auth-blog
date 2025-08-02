const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "Admin",
      password: hashedPassword,
    },
  });

  console.log("✅ Usuário admin criado com sucesso!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Erro ao criar admin:", e);
    prisma.$disconnect();
  });
