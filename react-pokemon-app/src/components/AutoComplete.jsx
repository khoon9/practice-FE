import React, { useState } from "react";

const AutoComplete = ({ allPokemons, setDisplayedPokemons }) => {
  const [searchInput, setSearchInput] = useState("");

  // 0. e 에서 text 뽑아서 text 처리 및 검색으로 보내, 반환 배열 받기
  //    allPokemons 에서 text 기반 검색
  //    text 는 소문자로 변험 후 includes 을 사용해 해당되는 모두를 반환
  // 1. 찾아낸 pokemon 들로 이뤄진 목록을 setDisplayedPokemons 에 반영
  const filterNames = (Input) => {
    const value = Input.toLowerCase();
    return value
      ? allPokemons.filter((pokemon) => pokemon?.name.includes(value))
      : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let text = searchInput.trim();
    setDisplayedPokemons(filterNames(text));
    setSearchInput("");
  };

  // 일치하는 포켓몬이름이 존재할 경우  빈 배열 보내기
  const checkEqualName = (input) => {
    const filteredArray = filterNames(input);
    return filteredArray[0]?.name === input ? [] : filteredArray;
  };

  return (
    <>
      <div className="relative z-50">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="relative flex items-center justify-center w-[20.5rem] h-6 rounded-lg m-auto"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-[20.5rem] h-6 bg-[hsl(214,13%,47%)] text-xs px-2 py-1 rounded-l-lg text-gray-300 text-center"
            placeholder="포켓몬 이름 검색"
          />
          <button
            type="submit"
            className=" w-[2.5rem] h-6 bg-slate-900 text-slate-300 px-2 py-1 rounded-r-lg text-xs"
          >
            검색
          </button>
        </form>
        {checkEqualName(searchInput).length > 0 && (
          <div className=" w-full flex bottom-0 h-0 flex-col absolute justify-center items-center translate-y-2">
            <div className="w-0 h-0 bottom-0 border-x-transparent border-x-8 border-b-[8px] border-gray-700 -translate-y-1/2"></div>
            <ul className="w-40 max-h-[134px] py-1 bg-gray-300 rounded-lg absolute top-0 overflow-auto scrollbar-none">
              {checkEqualName(searchInput).map((pokemon, index) => {
                return (
                  <li key={`button-${index}`}>
                    <button
                      aria-label={pokemon.name}
                      onClick={() => {
                        setSearchInput(pokemon.name);
                      }}
                      className="text-base w-full hover:bg-gray-600 p-[2px] text-grey-100"
                    >
                      {pokemon.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AutoComplete;
