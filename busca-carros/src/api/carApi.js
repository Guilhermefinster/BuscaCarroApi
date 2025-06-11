// src/api/carApi.js
import axios from 'axios';

const API_URL = 'https://gustavosachetto.site/api-carros/api/v1';

// Função para buscar TODOS os carros
export const getAllCars = async () => {
  try {
    const response = await axios.get(`${API_URL}/cars`);
    // A API retorna um array de objetos de carro.
    // Se a API retornar um objeto encapsulado, ajuste aqui:
    // Ex: return response.data.data; ou return response.data.cars;
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos os carros:", error);
    throw error;
  }
};

// Função para buscar um carro por ID (ainda necessária para a página de detalhes)
export const getCarById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/cars/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar carro com ID ${id}:`, error);
    // Para casos de 404 (não encontrado), é bom retornar null ou um objeto vazio para facilitar o tratamento
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

// Nova função para buscar carros por termo (simulando, pois a API não tem endpoint de busca textual)
// Esta função irá filtrar os dados de todos os carros no lado do cliente
export const searchCars = async (searchTerm) => {
    try {
        const allCars = await getAllCars(); // Busca todos os carros
        if (!searchTerm) {
            return allCars; // Se o termo de busca for vazio, retorna todos
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        // Filtra os carros cujo modelo ou marca contenha o termo de busca
        return allCars.filter(car =>
            (car.model_name && car.model_name.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (car.brand_name && car.brand_name.toLowerCase().includes(lowerCaseSearchTerm))
        );
    } catch (error) {
        console.error("Erro ao buscar carros por termo:", error);
        throw error;
    }
};