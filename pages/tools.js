import { useRef, useState } from "react";

export default function Tools() {
  const cards = useRef([]);
  const translations = useRef({});
  const [jsonContent, setJsonContent] = useState("");
  const [option, setOption] = useState("1")

  const optionChange = (e) => {
    setOption(e.target.value)
  }

  const keyDown = (e) => {
    if (e.key == "Enter") {
      switch(option) {
        case "1":
          const card = resolveNotation(e.target.value);
          cards.current.push(card);
          setJsonContent(JSON.stringify(cards.current, null, 4));
          break;
        case "2":
          const [key, value] = e.target.value.split(",");
          translations.current[key] = value;
          setJsonContent(JSON.stringify(translations.current, null, 4));
          break;
        default:
      }
      e.target.value = "";
    }
  }

  const resolveNotation = (notation) => {
    const raritiesMap = {
      CH: "champion",
      L: "legendary",
      E: "epic",
      R: "rare",
      C: "common"
    };
    const typesMap = {
      B: "building",
      T: "troop",
      S: "spell"
    };

    const [
      code, 
      elixirCost, 
      type, 
      rarity, 
      isWinCondition,
      shortcuts
    ] = notation.split(" ");

    return {
      code,
      elixirCost: Number(elixirCost),
      type: typesMap[type],
      rarity: raritiesMap[rarity],
      isWinCondition: isWinCondition === "true",
      shortcuts: [shortcuts]
    };
  }

  return (
    <>
      <select onChange={optionChange}>
        <option value="1" defaultValue="1">Cards Info</option>
        <option value="2">Cards Translation</option>
      </select>
      <div className="flex flex-col">
        <input type="text" onKeyDown={keyDown} className="bg-red-100" />
        <textarea value={jsonContent} readOnly className="h-screen bg-blue-100 text-xs" />
      </div>
    </>
  );
}