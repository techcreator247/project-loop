import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const organization = await prisma.organization.create({
    data: {
      name: "LOOP Demo Company",
    },
  });

  await prisma.feedback.create({
    data: {
      message: "The product is great, but delivery was slow.",
      source: "website",
      sentiment: "NEGATIVE",
      category: "Delivery",
      customerName: "Demo Customer",
      organizationId: organization.id,
    },
  });

  console.log("Test data created successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });