import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokeCard from "./components/PokeCard";
import useDebounce from "./hooks/useDebounce";
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = useDebounce(searchInput, 500);
  // API 호출
  // 컴포넌트 마운트 -> useState 초기화 -> return 렌더링 -> useEffect 순서
  useEffect(() => {
    fetchPokeData(true);
  }, []);

  useEffect(() => {
    handleSearchInput(debouncedValue);
  }, [debouncedValue]);

  const fetchPokeData = async (isFirstFetch) => {
    try {
      const offsetValue = isFirstFetch ? 0 : offset + limit;
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`;
      const response = await axios.get(url);
      setPokemons([...pokemons, ...response.data.results]);
      setOffset(offsetValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInput = async (searchTerm) => {
    setSearchInput(searchTerm);
    if (searchTerm.length > 0) {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
        );
        const pokemonData = {
          url: `http://pokeapi.co/api/v2/pokemon/${response.data.id}`,
          name: searchInput,
        };
        setPokemons([pokemonData]);
      } catch (error) {
        setPokemons([]);
        console.log(error);
      }
    } else {
      fetchPokeData(true);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <div className="relative z-50">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center justify-center w-[20.5rem] h-6 rounded-lg m-auto"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-[20.5rem] h-6 bg-[hsl(214,13%,47%)] text-xs px-2 py-1 rounded-l-lg text-gray-300 text-center"
              placeholder=""
            />
            <button
              type="submit"
              className=" w-[2.5rem] h-6 bg-slate-900 text-slate-300 px-2 py-1 rounded-r-lg text-xs"
            >
              검색
            </button>
          </form>
        </div>
      </header>
      <section className="pt-6 flex flex-col justify-center items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {pokemons.length > 0 ? (
            pokemons.map(({ url, name }, index) => {
              return <PokeCard key={url} url={url} name={name} />;
            })
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      <div className=" text-center">
        <button
          className="bg-slate-800 rounded-lg px-6 py-2 my-4 text-base font-bold text-white"
          onClick={() => fetchPokeData(false)}
        >
          더보기
        </button>
      </div>
    </article>
  );
}

export default App;
