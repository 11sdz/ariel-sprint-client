export function getInitials(name) {
  console.log(name)
  if (!name) return "";
  const words = name.trim().split(" ");
  const initials = words
    .filter(Boolean)                // remove empty parts
    .map(word => word[0].toUpperCase()) // take first letter
    .slice(0, 2)                    // max 2 letters
    .join("");
  return initials;
}