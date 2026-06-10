import { authOptions } from "@/lib/next-auth"
import NextAuth from "next-auth/next"

const internalHandler = NextAuth(authOptions)

const handler = async (req: any, context: any) => {
    const params = await context.params
    return await internalHandler(req, { params })
}

export { handler as GET, handler as POST }
