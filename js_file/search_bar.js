document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const query = document.getElementById('search-input').value.toLowerCase();

    const pages = {
        home: '../index.html',
        about: '../about-us.html',
        products: '../products.html',
        contact: '../contact.html',
        services: '../services.html',

        man: '../products.html',
        woman: '../products.html',
        formal: '../products.html',
        casual: '../products.html',
        boots: '../products.html',

        clancy: '../product_page/clancy_blue.html',
        gary: '../product_page/gary_shoes.html',
        heavenly: '../product_page/heavenly_black.html',
        sally: '../product_page/sally_shoes.html',
        workandwalk: '../product_page/work_and_walk_chesnut.html',

        delivery: '../delivery_policies/delivery.html',
        exchange: '../delivery_policies/exchange_return.html',
        return: '../delivery_policies/exchange_return.html',
        policies: '../services.html',

        cart: '../Cart_profile-code/cart.html',
        profile: '../Cart_profile-code/profile.html',
    };

    function getSimilarity(str1, str2) {
        let longer = str1.length > str2.length ? str1 : str2;
        let shorter = str1.length > str2.length ? str2 : str1;
        let longerLength = longer.length;

        if (longerLength === 0) return 1.0;

        let editDistance = getEditDistance(longer, shorter);
        return (longerLength - editDistance) / parseFloat(longerLength);
    }

    function getEditDistance(s1, s2) {
        const matrix = [];
        for (let i = 0; i <= s2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= s1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= s2.length; i++) {
            for (let j = 1; j <= s1.length; j++) {
                if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                    );
                }
            }
        }
        return matrix[s2.length][s1.length];
    }

    let bestMatch = null;
    let highestSimilarity = 0;

    for (const key in pages) {
        const similarity = getSimilarity(query, key);
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            bestMatch = key;
        }
    }

    if (highestSimilarity > 0.5) {
        window.location.href = pages[bestMatch];
    } else {
        alert(`No page found for "${query}".`);
    }
});
