interface IAuthContext {
    user: IUser | null
    login: (user: IUser, route?: string) => void
    logout: () => void
    update: (user: IUser) => void
}
interface IUser {
    username: string
}
