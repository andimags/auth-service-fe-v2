import { RolesDataTable } from "./RolesDataTable"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/next-auth"
import { checkPermission } from "@/lib/rbac"
import { redirect } from "next/navigation"

export default async function Page() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    if (!checkPermission(session, ["view:role", "admin:role"])) {
        redirect("/403")
    }

    return <RolesDataTable />
}
