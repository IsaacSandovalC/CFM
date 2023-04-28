

/**
* Formatea un número de teléfono local
* @param {string} phoneNumber - El número de teléfono a formatear
* @returns {string} - El número de teléfono formateado
*/
export const formatLocalPhone = (phoneNumber) => {
   return phoneNumber.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
};

/**
* Genera un enlace para compartir en una red social específica
* @param {string} socialNetwork - La red social en la que se desea compartir (FB, IT, TW, YT, TT, LK)
* @param {string} url - La url a compartir
* @param {string} text - (Opcional) El texto a compartir en twitter
* @returns {string} - El enlace para compartir
*/
export const generateShareLink = (socialNetwork, url, text = "") => {
   switch (socialNetwork) {
      case "FB":
         return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case "IT":
         return `https://www.instagram.com/share?url=${url}`;
      case "TW":
         return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      case "YT":
         return `https://www.youtube.com/share?url=${url}`;
      case "TT":
         return `https://www.tiktok.com/share?url=${url}`;
      case "LK":
         return `https://www.linkedin.com/shareArticle?url=${url}`;
      default:
         throw new Error("Red social no válida");
   }
};

/**
 *@function
 *@name validateEmail
 *@param {string} email - La dirección de correo electrónico.
 *@description Valida una dirección de correo electrónico.
 * @returns {string}
 */
export const validateEmail = (email) => {
   const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   if (!emailRegex.test(email)) {
      return false
   } else {
      return true
   }
};
