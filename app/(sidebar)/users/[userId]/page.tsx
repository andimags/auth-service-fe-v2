import { Badge } from "@/components/ui/badge"

export default function Page() {
    return (
        <div className="mx-auto w-full max-w-6xl text-neutral-900 transition-colors duration-200 dark:text-neutral-100">
            <div className="flex items-start justify-between pb-6">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                        User Information
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        Personal details and general information
                    </p>
                </div>
                <button className="rounded-md border border-neutral-300 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800">
                    Edit
                </button>
            </div>

            <div className="text-sm">
                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Full name
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        Alex Thompson
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Username
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        alex_thompson99
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Email address
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        alex@example.com
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Status
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        Active
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Level
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        Administrator
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Created
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        May 29, 2026
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Last Updated
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
                        May 29, 2026
                    </div>
                </div>

                <div className="grid grid-cols-3 border-t border-neutral-200 py-5 dark:border-neutral-800">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-200">
                        Roles
                    </div>
                    <div className="col-span-2 text-neutral-600 dark:text-neutral-400 gap-2 flex">
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}
