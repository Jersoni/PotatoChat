'use server'
import { signIn } from "next-auth/react";

export async function doCredentialLogin(formData) {
    console.log('submitted')
    console.log("formData", formData);

    try {
        const response = await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirect: false,
        });
        return response;
    } catch (err) {
        throw err;
    }
}