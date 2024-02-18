
// assuming if n <= 0, returns 0 for all functions
var sum_to_n_a = function(n) {
    // your code here
    if (n <= 0) {
        return 0;
    }
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    // your code here
    if (n <= 0) {
        return 0;
    }
    return n * (n + 1) / 2;
};

var sum_to_n_c = function(n) {
    // your code here
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
}