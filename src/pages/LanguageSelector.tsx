import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { AuroraBackground } from '@/components/AuroraBackground';
import { Card } from '@/components/ui/card';

const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
] as const;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    },
};

export default function LanguageSelector() {
    const { language, setLanguage } = useAppContext();
    const navigate = useNavigate();

    const handleLanguageSelect = (code: any) => {
        setLanguage(code);
        navigate(-1);
    };

    return (
        <AuroraBackground className="bg-gradient-to-br from-background to-background/50">
            <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 py-12 relative z-10 w-full">
                <motion.div
                    className="w-full max-w-4xl mx-auto space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <motion.div className="text-center space-y-4" variants={itemVariants}>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                            Choose your language
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            अपनी भाषा चुनें • మీ భాషను ఎంచుకోండి • உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்
                        </p>
                    </motion.div>

                    {/* Language Grid */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12"
                        variants={containerVariants}
                    >
                        {languages.map((lang) => (
                            <motion.div key={lang.code} variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Card
                                    onClick={() => handleLanguageSelect(lang.code)}
                                    className={`
                    cursor-pointer overflow-hidden p-6 flex flex-col items-center justify-center gap-3 text-center
                    backdrop-blur-xl bg-card/60 border-white/10 hover:border-primary/50 transition-all duration-300
                    ${language === lang.code ? 'ring-2 ring-orange-500 border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : ''}
                  `}
                                >
                                    <span className="text-2xl font-semibold text-foreground">
                                        {lang.nativeName}
                                    </span>
                                    <span className="text-sm text-muted-foreground font-medium">
                                        {lang.name}
                                    </span>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>
        </AuroraBackground>
    );
}
