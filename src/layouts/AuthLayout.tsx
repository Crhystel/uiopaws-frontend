import React, { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4 relative overflow-hidden font-poppins text-brand-dark">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(rgba(116, 198, 157, 0.4) 1.5px, transparent 1.5px)',
                backgroundSize: '30px 30px'
            }}></div>

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold mb-3 text-brand-dark">{title}</h1>
                    {subtitle && <p className="text-gray-600">{subtitle}</p>}
                </div>

                {children}
            </div>
        </div>
    );
};
