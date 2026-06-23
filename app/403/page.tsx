"use client"

import { IconLock } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { useRouter, useSearchParams } from "next/navigation"

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const callbackUrl = searchParams.get("callbackUrl") || "/"

    return (
        <Empty className="flex min-h-screen justify-center">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconLock />
                </EmptyMedia>
                <EmptyTitle>Access Denied</EmptyTitle>
                <EmptyDescription>
                    You do not have the required permission to access this page.
                    <br />
                    Please contact your administrator to request permission.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
                <Button>Go Back</Button>
                {/* <Button variant="outline">Users</Button> */}
            </EmptyContent>
            <Button
                variant="link"
                asChild
                className="text-muted-foreground"
                size="sm"
                onClick={() => router.push(callbackUrl)}
            >
                <a href="#">
                    Learn More <ArrowUpRightIcon />
                </a>
            </Button>
        </Empty>
    )
}
