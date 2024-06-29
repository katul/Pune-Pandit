		// Function to get query parameters
        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        // Get the product ID from the query parameter
        const productId = getQueryParam('id');
		
        var xhr = new XMLHttpRequest();

        // Configure it: GET-request for the URL /data.json
        xhr.open('GET', 'sample.json', true);

        // Set the callback function to execute when the request completes
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Parse the JSON data
                var data = JSON.parse(xhr.responseText);

                // Get the container where we will display the products
                var productsContainer = document.getElementById('products-container');

                // Iterate over the products array
                data.products.forEach(function(product) {
                    var pid = product.id;
                    if(pid==productId){
                        // Create a div element for the product
                        var productElement = document.createElement('div');
                        productElement.classList.add('product');

                        // Format price details
                        var priceDetails = `Price: ${product.pricing_details.price}`;
                        if (product.pricing_details.currency) {
                            priceDetails += ` ${product.pricing_details.currency}`;
                        }
                        if (product.pricing_details.discount) {
                            var discount = product.pricing_details.discount;
                            priceDetails += ` (Discount: ${discount.amount}${discount.type === 'percentage' ? '%' : ''})`;
                        }

                        // Set the inner HTML of the product element
                        productElement.innerHTML = `
                            <h2>${product.name}</h2>
                            <img src="${product.imagePath || ''}" alt="${product.name}">
                            <p>${product.description}</p>
                            <p>${priceDetails}</p>
                            <h3>Insights:</h3>
                            <ul>
                                ${product["Insights:"].map(insight => `<li>${insight.text}</li>`).join('')}
                            </ul>
                            <h3>Promises:</h3>
                            <ul>
                                ${product.Promise.map(promise => `<li>${promise.text}</li>`).join('')}
                            </ul>
                        `;

                        // Append the product element to the container
                        productsContainer.appendChild(productElement);
                    }
                });
            } else {
                console.error('Error loading data:', xhr.statusText);
            }
        };

        // Set the callback function to execute in case of error
        xhr.onerror = function () {
            console.error('Network error');
        };

        // Send the request
        xhr.send();
