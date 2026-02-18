import { AccessToken, Credentials, User, UserSessionToken } from './user.resources'
import { jwtDecode } from 'jwt-decode'

class AuthService {
    baseURL: string = process.env.NEXT_PUBLIC_API_URL + '/v1/users';
    static AUTH_PARAM: string = "_auth";

    private isBrowser(): boolean {
        return typeof window !== "undefined";
    }

    async authenticate(credentials: Credentials): Promise<AccessToken> {
        const response = await fetch(this.baseURL + "/auth", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401) {
            throw new Error("Usuário ou senha incorretos!");
        }

        return await response.json();
    }

    async save(user: User): Promise<void> {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 409) {
            const responseError = await response.json();
            throw new Error(responseError.error);
        }
    }

    startAutoLogout(expiration: number) {
        const expirationTime = expiration * 1000;
        const now = Date.now();

        const timeout = expirationTime - now;

        if (timeout <= 0) {
            this.invalidateSession();
            window.location.href = "/login";
            return;
        }

        setTimeout(() => {
            this.invalidateSession();
            alert("Sessão expirada!");
            window.location.href = "/login";
        }, timeout);
    }

    initSession(token: AccessToken) {
        if (token.accessToken) {
            const decodedToken: any = jwtDecode(token.accessToken);

            const userSession: UserSessionToken = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
                name: decodedToken.name,
                expiration: decodedToken.exp
            }

            this.setUserSession(userSession);

            this.startAutoLogout(decodedToken.exp);
        }
    }


    private setUserSession(userSession: UserSessionToken) {
        if (!this.isBrowser()) return;

        localStorage.setItem(
            AuthService.AUTH_PARAM,
            JSON.stringify(userSession)
        );
    }

    getUserSession(): UserSessionToken | null {
        if (!this.isBrowser()) return null;

        const authString = localStorage.getItem(AuthService.AUTH_PARAM);
        if (!authString) return null;

        return JSON.parse(authString);
    }

    isSessionValid(): boolean {
        const userSession = this.getUserSession();
        if (!userSession) return false;

        const expirationDateMillis = userSession.expiration * 1000;
        return new Date() < new Date(expirationDateMillis);
    }

    invalidateSession(): void {
        if (!this.isBrowser()) return;
        localStorage.removeItem(AuthService.AUTH_PARAM);
    }
}

const authInstance = new AuthService();
export const useAuth = () => authInstance;