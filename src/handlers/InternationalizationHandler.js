import i18n from '../i18n';

export const Locale = {
    EN: 'en',
    FR: 'fr'
};

export default {
    getCurrentIdiomText() {
        const idiom = this.getCurrentIdiom();
        return idiom.text;
    },

    getCurrentIdiom() {
        const idioms = this.getIdioms();
        for (let idiom of idioms) {
            if (idiom.locale === this.getCurrentLocale()) {
                return idiom;
            }
        }
        return null;
    },

    getCurrentLocale() {
        return i18n.locale;
    },

    setLocale(locale) {
        i18n.locale = locale;
    },

    getIdioms() {
        return [
            { locale: Locale.EN, text: 'English' },
            { locale: Locale.FR, text: 'Français' }
        ];
    }
};
