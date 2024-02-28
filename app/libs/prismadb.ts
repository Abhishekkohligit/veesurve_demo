import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;

// {
// 		datasources: {
// 			db: {
// 				url: "mongodb+srv://veesurvetms:veesurvetms@cluster0.537qb12.mongodb.net/mydb",
// 			},
// 		},
// 	}
