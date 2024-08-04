
export function formatPrice(amount : number) {
    if (amount >= 1e6) {
        return (amount / 1e6).toFixed(1) + 'M'; // Format for millions
    } else if (amount >= 1e3) {
        return (amount / 1e3).toFixed(1) + 'k'; // Format for thousands
    } else {
        return amount.toString(); // Return as is for less than a thousand
    }
}