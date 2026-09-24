document.addEventListener('DOMContentLoaded', () => {
    const restaurantList = document.getElementById('restaurant-list');
    const restaurantForm = document.getElementById('restaurant-form');
    const tokenInput = document.getElementById('jwt-token');
    const formMessage = document.getElementById('form-message');

    // Função para exibir mensagens no formulário
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`; // 'success' ou 'error'
        
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    }

    // Função para buscar e exibir restaurantes
    async function fetchRestaurants() {
        try {
            const response = await fetch('http://localhost:3000/restaurants');
            if (!response.ok) {
                throw new Error('Falha ao buscar restaurantes do servidor.');
            }
            const restaurants = await response.json();
            
            // Limpa a lista antes de adicionar os novos itens para evitar duplicação
            restaurantList.innerHTML = ''; 
            
            if (restaurants.length === 0) {
                restaurantList.innerHTML = '<p>Nenhum restaurante cadastrado ainda.</p>';
                return;
            }

            restaurants.forEach(restaurant => {
                const card = document.createElement('div');
                card.className = 'restaurant-card';
                card.innerHTML = `
                    <h3>${restaurant.name}</h3>
                    <p><strong>Categoria:</strong> ${restaurant.category}</p>
                    <p class="rating"><strong>Avaliação:</strong> ${restaurant.rating.toFixed(1)} ★</p>
                `;
                restaurantList.appendChild(card);
            });
        } catch (error) {
            console.error('Erro ao carregar restaurantes:', error);
            restaurantList.innerHTML = '<p>Não foi possível carregar os restaurantes. Verifique a conexão com o servidor.</p>';
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
            showMessage('Por favor, insira um token JWT para adicionar um restaurante.', 'error');
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
                showMessage('Token inválido ou expirado. Faça login novamente para obter um novo token.', 'error');
                return;
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Erro ao adicionar restaurante. Verifique os dados e tente novamente.' }));
                throw new Error(errorData.message || 'Erro desconhecido');
            }
            
            showMessage('Restaurante adicionado com sucesso!', 'success');
            
            // Limpa o formulário e atualiza a lista
            restaurantForm.reset();
            tokenInput.value = token; // Mantém o token no campo para facilitar múltiplos cadastros
            await fetchRestaurants(); // Aguarda a atualização da lista

        } catch (error) {
            console.error('Erro no formulário:', error);
            showMessage(error.message, 'error');
        }
    });

    // Carrega os restaurantes ao iniciar a página
    fetchRestaurants();
});