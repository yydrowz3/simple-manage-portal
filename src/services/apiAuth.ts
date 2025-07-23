import { faker } from "@faker-js/faker";
import { supabase } from "../utils/supabase.ts";

export async function loginApi(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function signoutApi() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}

export async function updateUserApi(newUserMetadata = {}) {
    const { data, error } = await supabase.auth.updateUser({
        data: newUserMetadata,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getUserApi() {
    const { data } = await supabase.auth.getUser();

    return data.user;
}

export async function signupApi(
    email: string,
    password: string,
    metadata = {}
) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: `${email}-${Date.now()}`,
                avatar: faker.image.avatar(),
                ...metadata,
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
