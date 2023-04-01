import { useContext, useState } from "react";
import { AppProviderProps } from "../../types/main";
import { AppContext } from "../AppContext";

export function Quiz() {
  const { data }: AppProviderProps = useContext(AppContext);

  const [score, setScore] = useState(0);

  const [responseData, setResponseData] = useState<any>(data[getRandomCountryResponse()]);
  console.log("responseData", responseData);

  const [hasResponded, setHasResponded] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const arrayOfIDs: any[] = [];
  if (data) {
    data.map((item: any) => {
      arrayOfIDs.push(item.cca2);
    });

    const search = arrayOfIDs.findIndex((item: any) => item === responseData?.cca2);
    if (search !== -1) {
      arrayOfIDs.splice(search, 1);
    }
  }

  function getRandomCountryResponse() {
    return Math.floor(Math.random() * data.length);
  }
  function getRandomCountry() {
    const randomCountry = Math.floor(Math.random() * arrayOfIDs.length);
    const countryChosen = arrayOfIDs[randomCountry];
    const findCountryIndex = data.findIndex((item: any) => item.cca2 === countryChosen);

    arrayOfIDs.splice(randomCountry, 1);

    return findCountryIndex;
  }

  const items = 4;

  const randomResponseLocation = Math.floor(Math.random() * items);
  const [responseLocation, setResponseLocation] = useState(randomResponseLocation);

  const otherResponsesLocationArray: any[] = [];
  for (let i = 0; i < items; i++) {
    otherResponsesLocationArray.push(getRandomCountry());
  }
  const [otherResponsesLocation, setOtherResponsesLocation] = useState<number[]>(
    otherResponsesLocationArray
  );
  console.log("otherResponsesLocation", otherResponsesLocation);

  function resetResponse() {
    setResponseData(data[getRandomCountryResponse()]);
    setResponseLocation(randomResponseLocation);
    setOtherResponsesLocation(otherResponsesLocationArray);
    setHasResponded(false);
    setWrongAnswer(false);
    setCorrectAnswer(false);
  }

  function choose(index: any) {
    setHasResponded(true);
    const isCorrect = index === responseLocation;

    if (isCorrect) {
      !hasResponded && setCorrectAnswer(true);
      setScore(score + 1);
    } else {
      !hasResponded && setWrongAnswer(true);
      setScore(score - 1);
    }

    setTimeout(
      () => {
        resetResponse();
      },
      isCorrect ? 1000 : 2000
    );
  }

  return (
    data && (
      <div className="quiz">
        <h2>Quiz principal</h2>
        <p>score: {score}</p>
        <p>De quel pays est ce drapeau ?</p>
        <img src={responseData?.flags?.png} alt={responseData?.flags?.alt} />

        <ul>
          {Array(items)
            .fill(0)
            .map((_, index) => {
              return index === responseLocation ? (
                <li
                  key={index}
                  style={{
                    backgroundColor:
                      hasResponded && (wrongAnswer || correctAnswer) ? "lightgreen" : "white",
                  }}
                  onClick={() => {
                    choose(index);
                  }}
                >
                  RESPONSE: {responseData?.name?.common}
                </li>
              ) : (
                <li
                  key={index}
                  style={{ backgroundColor: hasResponded && wrongAnswer ? "red" : "white" }}
                  onClick={() => {
                    choose(index);
                  }}
                >
                  {data[otherResponsesLocation[index]]?.name?.common}
                </li>
              );
            })}
        </ul>
      </div>
    )
  );
}
