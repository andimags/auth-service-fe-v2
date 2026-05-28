export interface UserDto {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    status: string;
    level: string;
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
    status?: string;
    level?: string;
}

export interface UpdateUserDto {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    status?: string;
    level?: string;
}
