document.addEventListener('DOMContentLoaded', () => {
    const restaurantList = document.getElementById('restaurant-list');
    const restaurantForm = document.getElementById('restaurant-form');
    const tokenInput = document.getElementById('jwt-token');

    // Função para buscar e exibir restaurantes
    async function fetchRestaurants() {
        try {
            const response = await fetch('http://localhost:3000/restaurants');
            if (!response.ok) {
                throw new Error('Erro ao buscar restaurantes');
            }
            const restaurants = await response.json();
            
            restaurantList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens
            restaurants.forEach(restaurant => {
                const card = document.createElement('div');
                card.className = 'restaurant-card';
                card.innerHTML = `
                    <h3>${restaurant.name}</h3>
                    <p>Categoria: ${restaurant.category}</p>
                    <p>Avaliação: ${restaurant.rating}</p>
                `;
                restaurantList.appendChild(card);
            });
        } catch (error) {
            console.error('Erro:', error);
            restaurantList.innerHTML = '<p>Não foi possível carregar os restaurantes.</p>';
        }
    }

    // Função para adicionar um novo restaurante
    restaurantForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const category = document.getElementById('category').value;
        const rating = parseFloat(document.getElementById('rating').value);
        const token = tokenInput.value;

        if (!token) {
            alert('Por favor, insira um token JWT para adicionar um restaurante.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/restaurants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, category, rating })
            });

            if (response.status === 401) {
                alert('Token inválido ou expirado. Faça login novamente.');
                return;
            }

            if (!response.ok) {
                throw new Error('Erro ao adicionar restaurante');
            }

            // Limpa o formulário e atualiza a lista
            restaurantForm.reset();
            fetchRestaurants(); 

        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao adicionar o restaurante.');
        }
    });

    // Carrega os restaurantes ao iniciar a página
    fetchRestaurants();
});