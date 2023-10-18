import axios from "axios";
import React, { useEffect, useState } from "react";

const PokeCard = ({ name, url }) => {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetchPokemon(url);
  }, [url]);

  const fetchPokemon = (url) => {
    try {
      axios.get(url).then((res) => {
        setPokemon(formatPokemonData(res.data));
      });
    } catch (error) {
      console.log(error);
    }
  };
  const formatPokemonData = (params) => {
    const { id, name, types } = params;
    const pokemonData = {
      id: id,
      name: name,
      type: types[0].type.name,
    };
    return pokemonData;
  };

  return (
    <div>
      이름 {pokemon.name}, id: {pokemon.id}, type: {pokemon.type}{" "}
    </div>
  );
};

export default PokeCard;
