"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface WizardContextType {
    isGameMode: boolean;
    setGameMode: (mode: boolean) => void;
    setOnFlap: (callback: (() => void) | null) => void;
    triggerFlap: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
    const [isGameMode, setIsGameMode] = useState(false);
    const [onFlapCallback, setOnFlapCallback] = useState<(() => void) | null>(null);

    const setOnFlap = useCallback((callback: (() => void) | null) => {
        setOnFlapCallback(() => callback);
    }, []);

    const triggerFlap = useCallback(() => {
        if (onFlapCallback) {
            onFlapCallback();
        }
    }, [onFlapCallback]);

    return (
        <WizardContext.Provider value={{ isGameMode, setGameMode: setIsGameMode, setOnFlap, triggerFlap }}>
            {children}
        </WizardContext.Provider>
    );
}

export function useWizard() {
    const context = useContext(WizardContext);
    if (context === undefined) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
}
