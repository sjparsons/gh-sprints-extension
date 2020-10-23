const SIZES = ["XS", "S", "M", "L", "XL"];
const DAYS = {
    XS: 0.5,
    S: 1,
    M: 3,
    L: 5,
    XL: 10
};

function getTotalDays(counts) {
    return Object.keys(counts).reduce((sum, size) => sum + counts[size] * DAYS[size], 0);
}