import { supabase } from '@/utils/supabase';
import { UserInfo } from '@/utils/interfaces';

export async function createUser(userInfo: UserInfo) {
    let { data, error } = await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password
    })

    if (error) {
        console.error('Error signing up:', error.message);
    } else {
        console.log('Sign up successful:');
        return data;
    }
}

export async function loginUser(email: string, password: string) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error('Error logging in:', error.message);
    } else {
        console.log('Login successful:', data);
        return data;
    }
}