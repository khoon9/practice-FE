import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

        // return : 각 map 의 return 에 대해 모두 기다린 후 한번에 반환
        // map 에 의해 배열로 리턴됨.
        const DamageRelations = await Promise.all(
          types.map(async (i) => {
            const type = await axios.get(i.type.url);
            return type.data.damage_relations;
          })
        );
        console.log("D", DamageRelations);

        const formattedPokemonData = {
          id,
          name,
          weight: weight / 10,
          height: height / 10,
          previous: nextAndPreviousPokemon.previous,
          next: nextAndPreviousPokemon.next,
          abilities: formatPokemonAlilities(abilities),
          stats: formatPokemonStats(stats),
          DamageRelations,
        };
        setPokemon(formattedPokemonData);
        setIsLoading(false);

        console.log(formattedPokemonData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // 여기서 url 은 id-1 (0~) 을 매개로 받음. id 는 1~ 이기에 1이 차이남.
  async function getNextAndProviousPokemon(id) {
    const urlPokemon = `${baseUrl}?limit=1&offset=${id - 1}`;
    const { data: pokemonData } = await axios.get(urlPokemon);
    const nextResponse =
      pokemonData.next && (await axios.get(pokemonData.next));
    const previoustResponse =
      pokemonData.previous && (await axios.get(pokemonData.previous));
    return {
      next: nextResponse?.data?.results?.[0]?.name,
      previous: previoustResponse?.data?.results?.[0]?.name,
    };
  }

  const formatPokemonAlilities = (abilities) => {
    return abilities
      .filter((_, index) => index <= 1)
      .map((obj) => obj.ability.name.replaceAll("-", " "));
  };

  const formatPokemonStats = ([
    statHP,
    statATK,
    statDEP,
    statSATK,
    statSDEP,
    statSPD,
  ]) => [
    { name: "Hit Points", baseStat: statHP.base_stat },
    { name: "Attack", baseStat: statATK.base_stat },
    { name: "Defense", baseStat: statDEP.base_stat },
    { name: "Special Attack", baseStat: statSATK.base_stat },
    { name: "Special Defense", baseStat: statSDEP.base_stat },
    { name: "Speed", baseStat: statSPD.base_stat },
  ];

  return <div>DetailPage</div>;
};

export default DetailPage;
