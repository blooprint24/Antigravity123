import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('creditEditUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem('creditEditUser');
            }
        }
        setLoading(false);
    }, []);

    const register = async (email, password, name) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Check if user already exists
                const existingUsers = JSON.parse(localStorage.getItem('creditEditUsers') || '[]');
                const userExists = existingUsers.find(u => u.email === email);

                if (userExists) {
                    reject(new Error('User already exists'));
                    return;
                }

                const newUser = {
                    id: Date.now().toString(),
                    email,
                    name,
                    createdAt: new Date().toISOString(),
                    isPremium: false,
                    credits: 0
                };

                // Store user credentials (in production, this would be handled by backend)
                existingUsers.push({ ...newUser, password });
                localStorage.setItem('creditEditUsers', JSON.stringify(existingUsers));

                // Set current user
                const userWithoutPassword = { ...newUser };
                delete userWithoutPassword.password;
                setUser(userWithoutPassword);
                localStorage.setItem('creditEditUser', JSON.stringify(userWithoutPassword));

                resolve(userWithoutPassword);
            }, 500);
        });
    };

    const login = async (email, password) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingUsers = JSON.parse(localStorage.getItem('creditEditUsers') || '[]');
                const foundUser = existingUsers.find(u => u.email === email && u.password === password);

                if (!foundUser) {
                    reject(new Error('Invalid email or password'));
                    return;
                }

                const userWithoutPassword = { ...foundUser };
                delete userWithoutPassword.password;
                setUser(userWithoutPassword);
                localStorage.setItem('creditEditUser', JSON.stringify(userWithoutPassword));

                resolve(userWithoutPassword);
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('creditEditUser');
    };

    const upgradeToPremium = () => {
        if (user) {
            const updatedUser = { ...user, isPremium: true };
            setUser(updatedUser);
            localStorage.setItem('creditEditUser', JSON.stringify(updatedUser));

            // Update in users list
            const existingUsers = JSON.parse(localStorage.getItem('creditEditUsers') || '[]');
            const updatedUsers = existingUsers.map(u =>
                u.id === user.id ? { ...u, isPremium: true } : u
            );
            localStorage.setItem('creditEditUsers', JSON.stringify(updatedUsers));
        }
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        upgradeToPremium,
        isAuthenticated: !!user,
        isPremium: user?.isPremium || false
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
