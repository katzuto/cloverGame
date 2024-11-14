// export default class Helper {
//     // Метод для получения конечного URL после редиректов
//     static async getThisOne(originalURL) {
//       try {
//         const response = await fetch(originalURL, { method: 'GET', redirect: 'follow' });
//         if (response.ok) {
//           return response.url; // Возвращает конечный URL после редиректов
//         } else {
//           return null; // Возвращает null, если редирект не удался
//         }
//       } catch (error) {
//         console.error('Ошибка при получении URL:', error);
//         return null;
//       }
//     }
  
//     // Метод для валидации URL (например, проверка на google)
//     static async validate(coordURL) {
//       try {
//         const encodedString = encodeURIComponent(coordURL);
//         const url = new URL(encodedString);
  
//         const finalURL = await Helper.getThisOne(url.toString());
//         if (finalURL) {
//           return finalURL.includes('google'); // Проверка, содержит ли URL 'google'
//         } else {
//           return false; // Если URL не валиден
//         }
//       } catch (error) {
//         console.error('Неверный URL:', error);
//         return false;
//       }
//     }
//   }


// helper.js

class UrlChecker {
  async checkUrl(urlToFetch) {
    try {
      const response = await fetch(urlToFetch, {
        method: 'GET',
        redirect: 'follow', // Это позволит автоматически следовать за редиректами
      });

      // Получаем конечный URL
      const finalURL = response.url;
      console.log("finalURL", finalURL)


      if (!finalURL.includes('google')) {
        return {
          isGoogle: finalURL.includes('google'),
          finalURL: finalURL
        } 
        } else {
        return {
          isGoogle: null,
          finalURL: null
        }
      }
      

      // Сравниваем с заданным URL
      console.log("finalURL", finalURL.includes('google'))
      return {
        isGoogle: finalURL.includes('google'),
        finalURL: finalURL
      }
    } catch (error) {
      console.error("Error fetching URL:", error);
      return false; // Если произошла ошибка, возвращаем false
    }
  }
}

export default UrlChecker;
