// Function to convert country code to emoji flag
export function countryCodeToEmoji(countryCode) {
  return countryCode
    .toUpperCase()
    .split("")
    .map(char => String.fromCodePoint(127397 + char.charCodeAt()))
    .join("");
}
