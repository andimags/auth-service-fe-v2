"use client"

import useConfirmDialog from "@/hooks/use-confirm-dialog"
import { ChannelDto } from "@/dtos"
import { getBaseUrl } from "@/lib/api"
import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { toast } from "sonner"
import { channelsQueryKeys } from "./use-channels-query"

interface UseDeleteChannelOptions {
    /** Called after a successful deletion */
    onSuccess?: () => void
}

export function useDeleteChannel({ onSuccess }: UseDeleteChannelOptions = {}) {
    const confirm = useConfirmDialog()
    const queryClient = useQueryClient()
    const baseUrl = getBaseUrl()

    const deleteChannel = useCallback(
        async (channel: ChannelDto) => {
            await confirm({
                title: "Delete Channel?",
                description: "This action cannot be undone",
                onConfirm: async () => {
                    try {
                        const response = await fetch(
                            `${baseUrl}/api/channels/${channel.id}`,
                            {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                            }
                        )

                        if (response.ok) {
                            const data = await response.json()

                            toast.success(
                                data.message || "Channel deleted successfully"
                            )

                            queryClient.invalidateQueries({
                                queryKey: channelsQueryKeys.all,
                            })

                            onSuccess?.()
                        } else {
                            const error = await response.json()
                            toast.error(
                                error.message || "Failed to delete channel"
                            )
                        }
                    } catch (error) {
                        console.error(error)
                        toast.error("Network error. Please try again.")
                    }
                },
            })
        },
        [confirm, queryClient, baseUrl, onSuccess]
    )

    return { deleteChannel }
}