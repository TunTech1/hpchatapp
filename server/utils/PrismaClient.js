import { PrismaClient } from '@prisma/client';


let prismaInstance = null;

function getPrismaInstance() {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient();
    }
    return prismaInstance;
}

// let prisma;

// if (process.env.NODE_ENV === "production") {
  
//   prisma = new PrismaClient();
// } else {
  
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default function getPrismaInstance() {
//   return prisma;
// }


export default getPrismaInstance;