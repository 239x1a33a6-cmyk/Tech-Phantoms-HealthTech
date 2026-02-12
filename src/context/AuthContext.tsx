/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'COMMUNITY_MEMBER' | 'ASHA_WORKER' | 'CLINIC' | 'DHO' | 'DISTRICT_ADMIN' | 'PHC_ADMIN' | 'STATE_AUTHORITY' | 'SUPER_ADMIN' | null;

export interface UserProfile {
    fullName: string;
    ageGroup: string;
    gender?: string;
    village: string;
    district: string;
    state: string;
    waterSource: string;
    language: string;
    ashaId?: string;
    subCenter?: string;
    phc?: string;
    block?: string;
    yearsOfExperience?: string;
    isProfileComplete: boolean;
}

interface User {
    id: string;
    mobile?: string;
    email?: string;
    role: UserRole;
    profile?: UserProfile;
}

interface AuthContextType {
    user: User | null;
    login: (type: 'OTP' | 'PASSWORD', identifier: string, secret: string) => Promise<void>;
    logout: () => void;
    updateProfile: (profile: UserProfile) => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for persistent session
        const savedUser = localStorage.getItem('dharma_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (type: 'OTP' | 'PASSWORD', identifier: string, secret: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Demo credentials
        if (type === 'OTP' && identifier === '9876543210' && secret === '123456') {
            const demoUser: User = {
                id: 'user_123',
                mobile: '9876543210',
                role: 'COMMUNITY_MEMBER',
                profile: {
                    fullName: 'Rajesh Kumar',
                    ageGroup: '25-45',
                    gender: 'Male',
                    village: 'Majuli',
                    district: 'Jorhat',
                    state: 'Assam',
                    waterSource: 'Well',
                    language: 'Assamese',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else if (type === 'OTP' && identifier === '9000000001' && secret === '123456') {
            const demoUser: User = {
                id: 'asha_1',
                mobile: '9000000001',
                role: 'ASHA_WORKER',
                profile: {
                    fullName: 'Sunita Das',
                    ageGroup: '35-50',
                    village: 'Majuli',
                    district: 'Jorhat',
                    state: 'Assam',
                    waterSource: 'Well',
                    language: 'Assamese',
                    ashaId: 'ASHA-MJL-001',
                    subCenter: 'Majuli North',
                    phc: 'Garmur PHC',
                    block: 'Majuli Central',
                    yearsOfExperience: '8',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else if (type === 'PASSWORD' && identifier === 'ASHA-MJL-001' && secret === 'password123') {
            const demoUser: User = {
                id: 'asha_1',
                mobile: '9000000001',
                role: 'ASHA_WORKER',
                profile: {
                    fullName: 'Sunita Das',
                    ageGroup: '35-50',
                    village: 'Majuli',
                    district: 'Jorhat',
                    state: 'Assam',
                    waterSource: 'Well',
                    language: 'Assamese',
                    ashaId: 'ASHA-MJL-001',
                    subCenter: 'Majuli North',
                    phc: 'Garmur PHC',
                    block: 'Majuli Central',
                    yearsOfExperience: '8',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else if (type === 'PASSWORD' && identifier === 'dho_demo' && secret === 'District@123') {
            const demoUser: User = {
                id: 'dho_jorhat_demo',
                email: 'dho.jorhat@gov.in',
                role: 'DHO',
                profile: {
                    fullName: 'Dr. Siddharth Verma',
                    ageGroup: '45-60',
                    village: 'Jorhat HO',
                    district: 'Jorhat',
                    state: 'Assam',
                    waterSource: 'Municipal',
                    language: 'English',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else if (type === 'PASSWORD' && identifier === 'superadmin@dharma.gov.in' && secret === 'admin123') {
            const demoUser: User = {
                id: 'super_admin_root',
                email: 'superadmin@dharma.gov.in',
                role: 'SUPER_ADMIN',
                profile: {
                    fullName: 'Root Administrator',
                    ageGroup: '30-50',
                    village: 'N/A',
                    district: 'Global',
                    state: 'India',
                    waterSource: 'N/A',
                    language: 'English',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else if (type === 'PASSWORD' && identifier === 'admin' && secret === 'admin123') {
            const demoUser: User = {
                id: 'super_admin_secondary',
                email: 'admin@dharma.gov.in',
                role: 'SUPER_ADMIN',
                profile: {
                    fullName: 'System Administrator',
                    ageGroup: '30-50',
                    village: 'N/A',
                    district: 'Global',
                    state: 'India',
                    waterSource: 'N/A',
                    language: 'English',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else if (type === 'PASSWORD' && identifier === 'doctor.demo@dharma.gov' && secret === 'Doctor@123') {
            const demoUser: User = {
                id: 'doctor_demo_1',
                email: 'doctor.demo@dharma.gov',
                role: 'CLINIC',
                profile: {
                    fullName: 'Dr. Anita Sharma',
                    ageGroup: '35-50',
                    village: 'Hyderabad HQ',
                    district: 'Hyderabad',
                    state: 'Telangana',
                    waterSource: 'Municipal',
                    language: 'English',
                    phc: 'Hyderabad Central PHC',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else if (type === 'PASSWORD' && identifier === 'state.demo@dharma.gov' && secret === 'State@123') {
            const demoUser: User = {
                id: 'state_demo_1',
                email: 'state.demo@dharma.gov',
                role: 'STATE_AUTHORITY',
                profile: {
                    fullName: 'Dr. Priya Sharma, IAS',
                    ageGroup: '45-60',
                    village: 'Hyderabad HQ',
                    district: 'All Districts',
                    state: 'Telangana',
                    waterSource: 'Municipal',
                    language: 'English',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else if (type === 'PASSWORD' && identifier === 'collector.demo@dharma.gov' && secret === 'Collector@123') {
            const demoUser: User = {
                id: 'collector_demo_1',
                email: 'collector.demo@dharma.gov',
                role: 'DISTRICT_ADMIN',
                profile: {
                    fullName: 'Shri Rajiv Mehta, IAS',
                    ageGroup: '45-60',
                    village: 'Hyderabad HQ',
                    district: 'Hyderabad',
                    state: 'Telangana',
                    waterSource: 'Municipal',
                    language: 'English',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else if (type === 'PASSWORD' && identifier.includes('@') && secret === 'password123') {
            const demoUser: User = {
                id: 'user_email',
                email: identifier,
                role: 'COMMUNITY_MEMBER',
                profile: {
                    fullName: 'Sita Devi',
                    ageGroup: '18-25',
                    gender: 'Female',
                    village: 'Bishnupur',
                    district: 'Bankura',
                    state: 'West Bengal',
                    waterSource: 'Piped Water',
                    language: 'Bengali',
                    isProfileComplete: true,
                },
            };
            setUser(demoUser);
            localStorage.setItem('dharma_user', JSON.stringify(demoUser));
        } else {
            setIsLoading(false);
            throw new Error('Invalid credentials');
        }
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('dharma_user');
    };

    const updateProfile = async (profile: UserProfile) => {
        if (!user) return;
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const updatedUser = { ...user, profile: { ...profile, isProfileComplete: true } };
        setUser(updatedUser);
        localStorage.setItem('dharma_user', JSON.stringify(updatedUser));
        setIsLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateProfile, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
