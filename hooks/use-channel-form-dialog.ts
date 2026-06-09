"use client"

import { useChannelFormStore } from "@/components/shared/channel-form-dialog/channel-form-store"
import { ChannelDto } from "@/dtos/ChannelDto"

export default function useChannelFormDialog() {
    const { setIsOpen, setMode, setChannel, setOnUpdateSuccess } =
        useChannelFormStore()

    const open = {
        create: () => {
            setChannel(null)
            setMode("create")
            setIsOpen(true)
        },
        edit: (channel: ChannelDto, onUpdateSuccess?: () => void) => {
            setChannel(channel)
            setMode("edit")
            if (onUpdateSuccess) setOnUpdateSuccess(onUpdateSuccess)
            setIsOpen(true)
        },
    }

    const close = () => {
        setIsOpen(false)
        setChannel(null)
    }

    return { open, close }
}
