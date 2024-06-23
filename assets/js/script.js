document.addEventListener('DOMContentLoaded', function() {
    async function fetchProducts() {
        const response = await fetch('sample.json');
        return await response.json();
    }

    function getProductById(products, id) {
        return products.find(product => product.id === id);
    }

    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function renderProductDetails(product) {
        const productDetailsDiv = document.getElementById('product-details');
        
        if (!product) {
            productDetailsDiv.innerHTML = '<p>Product not found</p>';
            return;
        }

        const productHTML = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <h2>Pricing Details</h2>
            <p>Price: ${product.pricing_details.currency} ${product.pricing_details.price}</p>
            <p>Discount: ${product.pricing_details.discount.amount} (${product.pricing_details.discount.type})</p>
            <h2>Product Attributes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${product.table_data.map(item => `
                        <tr>
                            <td>${item.attribute}</td>
                            <td>${item.value}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        productDetailsDiv.innerHTML = productHTML;
    }

    const productId = getQueryParameter('id');

    fetchProducts().then(products => {
        const product = getProductById(products, productId);
        renderProductDetails(product);
    }).catch(error => {
        console.error('Error fetching products:', error);
        const productDetailsDiv = document.getElementById('product-details');
        productDetailsDiv.innerHTML = '<p>Error loading product data</p>';
    });
});
