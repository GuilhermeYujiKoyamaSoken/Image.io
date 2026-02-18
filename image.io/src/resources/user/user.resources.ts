export interface User {
    name: string;
    email: string;
    password: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface AccessToken {
    accessToken: string;
}

export interface UserSessionToken {
    name: string;
    email: string;
    accessToken: string;
    expiration: number;
}
