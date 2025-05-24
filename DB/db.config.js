import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:["query"], //later comment
})

export default prisma;
