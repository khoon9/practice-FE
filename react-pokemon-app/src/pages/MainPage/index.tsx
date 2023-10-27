import { useEffect, useState } from "react";
import axios from "axios";
import PokeCard from "../../components/PokeCard";
import AutoComplete from "../../components/AutoComplete";
import { PokemonData, PokemonNameAndUrl } from "../../types/PokemonData";

const MainPage = () => {
  const [allPokemons, setAllPokemons] = useState<PokemonNameAndUrl[]>([]);
  const [displayedPokemons, setDisplayedPokemons] = useState<
    PokemonNameAndUrl[]
  >([]);
  const limitNum = 20;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  useEffect(() => {
    fetchPokeData();
  }, []);

  const fetchPokeData = async () => {
    try {
      const response = await axios.get<PokemonData>(url);
      const newAllPokemons = [...response.data.results];
      setAllPokemons(newAllPokemons);
      setDisplayedPokemons(fetchDisplayedPokemons(newAllPokemons));
    } catch (error) {
      console.error(error);
    }
  };

  // 전체 포켓몬 배열, 현재 화면 표시 포켓몬 입력받아 추가

  const fetchDisplayedPokemons = (
    allPokemonsData: PokemonNameAndUrl[],
    displayedPokemons: PokemonNameAndUrl[] = []
  ) => {
    const loadRecordNum = displayedPokemons.length + limitNum;
    return allPokemonsData.filter((_, index) => index + 1 <= loadRecordNum);
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <AutoComplete
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemons}
        />
      </header>
      <section className="pt-6 flex flex-col justify-center items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }: PokemonNameAndUrl) => {
              return <PokeCard key={url} url={url} name={name} />;
            })
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      {allPokemons.length > displayedPokemons.length &&
        displayedPokemons.length !== 1 && (
          <div className=" text-center">
            <button
              className="bg-slate-800 rounded-lg px-6 py-2 my-4 text-base font-bold text-white"
              onClick={() =>
                setDisplayedPokemons(
                  fetchDisplayedPokemons(allPokemons, displayedPokemons)
                )
              }
            >
              더보기
            </button>
          </div>
        )}
    </article>
  );
};

export default MainPage;
