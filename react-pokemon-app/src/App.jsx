import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import PokeCard from "./components/PokeCard";
import Test from "./components/Test";
function App() {
  const [pokemons, setPokemons] = useState([]);
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0";

  // API 호출
  // 컴포넌트 마운트 -> useState 초기화 -> return 렌더링 -> useEffect 순서
  useEffect(() => {
    fetchPokeData();
  }, []);

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response);
      setPokemons(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        {/* 입력 폼 위치 */}
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
    </article>
  );
}

export default App;
