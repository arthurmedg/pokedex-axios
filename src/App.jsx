import { useState, useEffect } from 'react';
import api from './services/api';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
  const [todosPokemons, setTodosPokemons] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function carregarLista() {
      try {
        setCarregando(true);
        // Carrega todos os pokémons em segundo plano para permitir buscar qualquer um
        const response = await api.get('/pokemon?limit=1000');
        setTodosPokemons(response.data.results);
      } catch (err) {
        console.log(err);
        setErro('Erro ao conectar com a PokéAPI.');
      } finally {
        setCarregando(false);
      }
    }

    carregarLista();
  }, []);

  const resultados = busca.trim() === ''
    ? []
    : todosPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(busca.toLowerCase())
      );

  return (
    <div className="pagina">
      <div className="caixa-busca">
        <h1>Buscar Pokémon</h1>
        <input
          type="text"
          placeholder="Ex: pikachu, charizard, mewtwo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {carregando && <p className="texto-status">Carregando dados...</p>}

      {erro && <p className="texto-erro">{erro}</p>}

      {!carregando && !erro && busca.trim() !== '' && (
        <div className="resultados">
          {resultados.length > 0 ? (
            resultados.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                nome={pokemon.name}
                url={pokemon.url}
              />
            ))
          ) : (
            <p className="texto-status">Nenhum Pokémon encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;