import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const params = useParams();
  const pokemonId = params.id;
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  console.log(params.id);

  useEffect(() => {
    fetchPokemonData();
  }, [pokemonId]);

  async function fetchPokemonData() {
    const url = `${baseUrl}${pokemonId}`;
    try {
      const { data: pokemonData } = await axios.get(url);

      if (pokemonData) {
        const { name, id, types, weight, height, stats, abilities } =
          pokemonData;
        const nextAndPreviousPokemon = await getNextAndProviousPokemon(id);
        console.log(nextAndPreviousPokemon);
      }
      console.log(pokemonData);
    } catch (error) {
      console.log(error);
    }
  }
  // 여기서 url 은 id-1 (0~) 을 매개로 받음. id 는 1~ 이기에 1이 차이남.
  async function getNextAndProviousPokemon(id) {
    const urlPokemon = `${baseUrl}?limit=1&offset=${id - 1}`;
    const { data: pokemonData } = await axios.get(urlPokemon);
    console.log("*****", pokemonData);
    const nextResponse =
      pokemonData.next && (await axios.get(pokemonData.next));
    const previoustResponse =
      pokemonData.previous && (await axios.get(pokemonData.previous));
    return {
      next: nextResponse?.data?.results?.[0]?.name,
      previous: previoustResponse?.data?.results?.[0]?.name,
    };
  }

  return <div>DetailPage</div>;
};

export default DetailPage;
