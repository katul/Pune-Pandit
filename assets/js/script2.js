fetch('sample.json')
    .then(response => response.json())
    .then(data => {
        const tabsContainer = document.querySelector('.tabs');
        const contentContainer = document.querySelector('.content-container');

        const createTab = (type, isActive) => {
            const tab = document.createElement('div');
            tab.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            tab.dataset.tab = type;
            if (isActive) tab.classList.add('active');
            tabsContainer.appendChild(tab);
        };

        const createContent = (product) => {
            const content = document.createElement('div');
            content.classList.add('content');
			content.classList.add('col-md-3');
            content.dataset.tab = product.type;

            content.innerHTML = `
                
                <a href="details.html?id=${product.id}"><img src="assets/img/related/${product.imagePath}" alt="${product.name}" width="200"></a>
				<h2>${product.name}</h2>
                <!-- <p>${product.description}</p>
                <p><strong>Price:</strong> ₹${product.pricing_details.price}</p>
                <h3>Insights:</h3>
                <ul>${product["Insights:"].map(item => `<li>${item.text}</li>`).join('')}</ul>
                <h3>Promise:</h3>
                <ul>${product.Promise.map(item => `<li>${item.text}</li>`).join('')}</ul> -->
            `;
            contentContainer.appendChild(content);
        };

        const types = Array.from(new Set(data.products.map(product => product.type)));
        types.forEach((type, index) => createTab(type, index === 0));

        data.products.forEach(product => createContent(product));

        const tabs = document.querySelectorAll('.tabs div');
        const contents = document.querySelectorAll('.content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(item => item.classList.remove('active'));
                tab.classList.add('active');

                const selectedTab = tab.getAttribute('data-tab');
                contents.forEach(content => {
                    if (content.dataset.tab === selectedTab) {
                        content.style.display = 'flex'; // Show content of selected tab
                    } else {
                        content.style.display = 'none'; // Hide content of other tabs
                    }
                });
            });
        });
		const activeTabs = document.querySelectorAll('.tabs div.active');
		activeTabs.forEach(activetab => {
			const selectedTab = activetab.getAttribute('data-tab');
			contents.forEach(content => {
				if (content.dataset.tab === selectedTab) {
					content.style.display = 'flex'; // Show content of selected tab
				} else {
					content.style.display = 'none'; // Hide content of other tabs
				}
			});
		});
				
		
		
    })
    .catch(error => console.error('Error fetching data:', error));