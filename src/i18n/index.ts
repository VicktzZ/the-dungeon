import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { LanguageOptions } from '../enums';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

interface Translation {
    [key: string]: string | Translation;
}

interface Translations {
    [language: string]: Record<string, any>;
}

export class I18n {
    private currentLanguage: LanguageOptions;
    private translations: Translations = {};

    constructor() {
        this.currentLanguage = LanguageOptions.En;
        this.loadTranslations();
    }

    private loadTranslations(): void {
        const languages = [LanguageOptions.En, LanguageOptions.Pt];
        languages.forEach(lang => {
            try {
                const translationFile = join(__dirname, 'translations', `${lang}.json`);
                this.translations[lang] = JSON.parse(readFileSync(translationFile, 'utf-8'));
            } catch (error) {
                console.warn(`Translation file for ${lang} not found`);
            }
        });
    }

    public setLanguage(language: LanguageOptions): void {
        if (this.translations[language]) {
            this.currentLanguage = language;
        } else {
            console.warn(`Language ${language} not found, using default: ${this.currentLanguage}`);
        }
    }

    public t(key: string, ...args: any[]): string {
        const translation = this.getTranslationByKey(key);
        if (!translation) {
            console.warn(`Translation key "${key}" not found in ${this.currentLanguage}`);
            return key;
        }
        return args.length > 0 ? translation.replace(/{(\d+)}/g, (match, index) => args[index]) : translation;
    }

    private getTranslationByKey(key: string): string | undefined {
        const parts = key.split('.');
        let current = this.translations[this.currentLanguage];

        for (let part of parts) {
            if (!current || typeof current !== 'object' || !(part in current)) {
                return undefined;
            }
            current = current[part];
        }

        if (typeof current === 'string') {
            return current;
        }
        return undefined;
    }

    public get language(): LanguageOptions {
        return this.currentLanguage;
    }

    public get availableLanguages(): LanguageOptions[] {
        return Object.keys(this.translations) as LanguageOptions[];
    }
}

// Create singleton instance
export const i18n = new I18n();
