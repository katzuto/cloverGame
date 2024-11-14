class Helper {
    async getThisOne(originalURL) {
        try {
            const response = await fetch(originalURL, {
                method: 'GET',
                redirect: 'follow', // Следовать за редиректами
            });

            if (response.ok) {
                return new URL(response.url).href; // Возвращает финальный URL
            } else {
                return null;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }

    static async validate(urlString) {
        const encodedString = encodeURIComponent(urlString);

        const helper = new Helper();

        const finalURL = await helper.getThisOne(encodedString);
        if (finalURL) {
            return finalURL.includes("google");
        }

        return false;
    }
}

// Пример использования функции
async function updateIfNeeded(toUp) {
    let isLoading = true;

    if (toUp) {
        const isValid = await Helper.validate("yourURLHere");

        if (!isValid) {
            // Ваши действия при финальном URL, не содержащем "google"
            verse = 1;
        } else {
            // Ваши действия для валидного URL
            verse = 0;
        }
    }

    // Обработка завершения загрузки
    isLoading = false;
}

// Вызов функции
updateIfNeeded(true);
