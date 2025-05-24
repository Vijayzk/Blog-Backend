import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['error', 'warn'],
    //log:["query"], //later comment
})

export default prisma;
