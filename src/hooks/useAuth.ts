import { getUserApi } from "../services/apiAuth.ts";

export async function isAuthenticated() {
    const user = await getUserApi();
    if (!user) return false;

    return true;
}
