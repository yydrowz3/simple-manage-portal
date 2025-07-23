import { supabase } from "../utils/supabase.ts";

export async function uploadAvatarApi(
    avatarFile: File,
    avatarFilename: string
) {
    const { error } = await supabase.storage
        .from("user-avatars")
        .upload(`public/${avatarFilename}`, avatarFile, {
            cacheControl: "3600",
            upsert: false,
        });
    if (error) {
        throw new Error(error.message);
    }
}
