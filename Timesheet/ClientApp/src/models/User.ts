import { Stringified } from "../utilities/Strings";

export type User = {
    id: number;
    name: string;
    location?: string;
};

export function stringify(user: User): Stringified<User> {
    return {
        ...user,
        id: user.id.toString()
    }
}