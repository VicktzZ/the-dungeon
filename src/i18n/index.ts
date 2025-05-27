import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { LanguageOptionsEnum } from '../enums';
import { gameSettings } from '@data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

interface Translation {
    [key: string]: string | Translation;
}

interface Translations {
    [language: string]: Record<string, any>;
}

export class I18n {
    private currentLanguage: LanguageOptionsEnum;
    private translations: Translations = {};

    constructor() {
        this.currentLanguage = gameSettings.language;
        this.loadTranslations();
    }

    private loadTranslations(): void {
        const languages = [LanguageOptionsEnum.En, LanguageOptionsEnum.Pt];
        languages.forEach(lang => {
            try {
                const translationFile = join(__dirname, 'translations', `${lang}.json`);
                this.translations[lang] = JSON.parse(readFileSync(translationFile, 'utf-8'));
            } catch (error) {
                console.warn(`Translation file for ${lang} not found`);
            }
        });
    }

    public setLanguage(language: LanguageOptionsEnum): void {
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

    public get language(): LanguageOptionsEnum {
        return this.currentLanguage;
    }

    public get availableLanguages(): LanguageOptionsEnum[] {
        return Object.keys(this.translations) as LanguageOptionsEnum[];
    }
}

export const i18n = new I18n();
