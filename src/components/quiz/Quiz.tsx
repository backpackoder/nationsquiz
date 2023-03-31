import { useContext } from "react";
import { AppProviderProps } from "../../types/main";
import { AppContext } from "../AppContext";

export function Quiz() {
  const { data }: AppProviderProps = useContext(AppContext);

  const arrayOfCountries: number[] = [];
  const items = 8;

  function getRandomCountry() {
    const randomCountry = Math.floor(Math.random() * data.length - 1);

    if (arrayOfCountries.includes(randomCountry)) {
      console.log("error!!!");
      getRandomCountry();
    } else {
      arrayOfCountries.push(randomCountry);
    }

    console.log("arrayOfCountries", arrayOfCountries);

    return randomCountry;
  }

  return (
    <div>
      <h2>Quiz principal</h2>
      <p>{data[7].name.common}</p>
      <ul>
        {Array(items)
          .fill(0)
          .map((_, index) => (
            <li key={index} onClick={() => console.log("item", index)}>
              {data[getRandomCountry()]?.name?.common}
            </li>
          ))}
      </ul>
      <button onClick={() => console.log("getRandomCountry", getRandomCountry())}>ici</button>
    </div>
  );
}
