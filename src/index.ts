const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  // await prisma.user.create({
  //   data: {
  //     uid: "abc123",
  //     name: "Alice",
  //     messages: {},
  //     rooms: {
  //       create: [
  //         {
  //           room: {
  //             create: { name: "global" },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });

  const allUsers = await prisma.user.findMany({
    include: {
      rooms: true,
      messages: true,
    },
  });
  console.dir(allUsers, {depth: null});
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
