import axios from "axios";
import React, { useEffect, useState } from "react";
import LazyImage from "./LazyImage";
import { Link } from "react-router-dom";

const PokeCard = ({ name, url }) => {
  const [pokemon, setPokemon] = useState();

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
  const bg = `bg-${pokemon?.type}`;
  const border = `border-${pokemon?.type}`;
  const text = `text-${pokemon?.type}`;
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;
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
    <>
      {pokemon && (
        <Link
          aria-label={name}
          to={`/pokemon/${name}`}
          className={`box-border rounded-lg ${border} w-[8.5rem] h-[8.5rem] z-0 bg-slate-800 justify-between items-center`}
        >
          <div
            className={`${text} basis h-[1.5rem] text-xs w-full pt-1 px-2 text-right rounded-t-lg`}
          >
            #{pokemon.id.toString().padStart(3, "00")}
          </div>
          <div className={` w-full f-6 flex items-center justify-center`}>
            <div
              className={` box-border relative flex w-full h-[5.5rem] basis justify-center items-center`}
            >
              <LazyImage url={img} alt={name} />
            </div>
          </div>
          <div
            className={`${bg} basis h-[1.5rem] w-full text text-xs text-zinc-100 font-medium flex items-center justify-center rounded-b-lg uppercase`}
          >
            {pokemon.name}
          </div>
        </Link>
      )}
    </>
  );
};

export default PokeCard;
