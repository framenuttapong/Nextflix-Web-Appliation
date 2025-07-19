import { useEffect, useState } from "react";
import { apiClient } from "@/services/api";

export const useUser = () => {
    const [user, setUser] = useState<any>(null);
    
    useEffect(() => {
        const fetchUser = async () => {
        try {
            const response = await apiClient.get('/auth/profile');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
        };
    
        fetchUser();
    }, []);
    
    return user;
    }