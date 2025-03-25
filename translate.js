// Language translation module
const translations = {
    currentLang: 'en',  // Default language
    supportedLanguages: [
        { code: 'en', name: 'English' },
        { code: 'ta', name: 'Tamil' },
        { code: 'hi', name: 'Hindi' },
        { code: 'ml', name: 'Malayalam' },
        { code: 'fr', name: 'French' }
    ]
};

// Function to translate text using Google Translate API
async function translateText(text, targetLang) {
    try {
        const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
        );
        const data = await response.json();
        return data[0][0][0];
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Return original text if translation fails
    }
}

// Function to translate all text content in the website
async function translateWebsite(targetLang) {
    if (translations.currentLang === targetLang) return;
    
    const elements = document.querySelectorAll('[data-translate]');
    const translationPromises = [];

    elements.forEach(element => {
        if (!element.getAttribute('data-original')) {
            element.setAttribute('data-original', element.textContent.trim());
        }

        const originalText = element.getAttribute('data-original');
        translationPromises.push(
            translateText(originalText, targetLang).then(translatedText => {
                element.textContent = translatedText;
            })
        );
    });

    await Promise.all(translationPromises);
    translations.currentLang = targetLang;
    localStorage.setItem('preferredLanguage', targetLang);
}

// Create language selector UI
function createLanguageSelector() {
    const navLinks = document.querySelector('.nav-links');
    const languageSelector = document.createElement('li');
    languageSelector.className = 'language-selector';

    const select = document.createElement('select');
    select.id = 'languageSelect';
    
    translations.supportedLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        translateWebsite(e.target.value);
    });

    languageSelector.appendChild(select);
    navLinks.insertBefore(languageSelector, navLinks.querySelector('.theme'));
}

// Initialize translation system
function initTranslation() {
    createLanguageSelector();
    
    // Add data-translate attribute to translatable elements
    const translatableElements = [
        '.nav-links a',
        '.section-title',
        '.project-content h3',
        '.project-content p',
        '.achievement-content h4',
        '.achievement-content p',
        '.cert-content h4',
        '.cert-content p',
        '.about-text p',
        '.skills-list li',
        '.contact-title',
        '.social-link span',
        '.cv-button span'
    ];

    translatableElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.setAttribute('data-translate', '');
        });
    });

    // Load preferred language from localStorage
    const preferredLanguage = localStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
        document.getElementById('languageSelect').value = preferredLanguage;
        translateWebsite(preferredLanguage);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTranslation);