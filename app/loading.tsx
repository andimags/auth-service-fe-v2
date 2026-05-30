import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Empty className="w-full">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Spinner />
                    </EmptyMedia>
                    <EmptyTitle>Processing your request</EmptyTitle>
                    <EmptyDescription>
                        Please wait while we process your request. Do not
                        refresh the page.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button variant="outline" size="sm">
                        Cancel
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    )
}
