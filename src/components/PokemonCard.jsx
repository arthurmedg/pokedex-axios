import './PokemonCard.css';

function PokemonCard({ nome, url }) {
  const partesUrl = url.split('/');
  const id = partesUrl[partesUrl.length - 2];

  const imagemUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="pokemon-item">
      <img src={imagemUrl} alt={nome} />
      <div className="pokemon-info">
        <span className="pokemon-id">Nº {id}</span>
        <h3>{nome}</h3>
      </div>
    </div>
  );
}

export default PokemonCard;