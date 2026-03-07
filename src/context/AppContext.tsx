import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageType = 'en' | 'hi' | 'te' | 'ta' | 'mr' | 'bn' | 'gu' | 'kn' | 'ml' | 'pa' | 'ur' | 'or' | 'as';

interface AppContextType {
    language: LanguageType;
    setLanguage: (lang: LanguageType) => void;
    userId: string | null;
    setUserId: (id: string | null) => void;
    userName: string | null;
    setUserName: (name: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    // Initialize from localStorage or default to 'en'
    const [language, setLanguageState] = useState<LanguageType>(() => {
        const savedLang = localStorage.getItem('civicbridge_language');
        return (savedLang as LanguageType) || 'en';
    });

    const [userId, setUserIdState] = useState<string | null>(() => {
        return localStorage.getItem('civicbridge_userId');
    });

    const [userName, setUserNameState] = useState<string | null>(() => {
        return localStorage.getItem('civicbridge_userName');
    });

    // Update localStorage when state changes
    const setLanguage = (lang: LanguageType) => {
        setLanguageState(lang);
        localStorage.setItem('civicbridge_language', lang);
    };

    const setUserId = (id: string | null) => {
        setUserIdState(id);
        if (id) {
            localStorage.setItem('civicbridge_userId', id);
        } else {
            localStorage.removeItem('civicbridge_userId');
        }
    };

    const setUserName = (name: string | null) => {
        setUserNameState(name);
        if (name) {
            localStorage.setItem('civicbridge_userName', name);
        } else {
            localStorage.removeItem('civicbridge_userName');
        }
    };

    return (
        <AppContext.Provider value={{ language, setLanguage, userId, setUserId, userName, setUserName }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
