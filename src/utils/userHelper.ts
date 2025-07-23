import getConfig from "./configHelper.ts";

export default function getUserId(): string {
    const token = getConfig("SUPABASE_TOKEN");

    if (!token) {
        return "TOKEN_NOT_FOUND";
    }

    const userToken = JSON.parse(localStorage.getItem(token) || "{}");

    return userToken.user.id || "Not_FOUND";
}
