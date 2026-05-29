import { UserLevelType, UserStatusType } from "@/constants/enums";

export interface UserDto {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    status: UserStatusType;
    level: UserLevelType;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null;
}

export interface CreateUserDto {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    status?: UserStatusType;
    level?: UserLevelType;
}

export interface UpdateUserDto {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    status?: UserStatusType;
    level?: UserLevelType;
}

export interface UserFormState {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    status?: UserStatusType;
    level?: UserLevelType;
}
