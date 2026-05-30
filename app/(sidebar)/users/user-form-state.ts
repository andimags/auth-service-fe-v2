import { UserStatusType, UserLevelType } from "@/constants/enums"

export default interface UserFormState {
    username: string
    email: string
    first_name: string
    last_name: string
    password?: string
    status?: UserStatusType
    level?: UserLevelType
}
