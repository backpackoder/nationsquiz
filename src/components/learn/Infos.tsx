import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useParams } from "react-router-dom";

// Types
import { AppProviderProps } from "../../types/context";

// Components
import { PageNotFound } from "../errors/PageNotFound";

// Utils
import { stringForUrl } from "../../utils/stringForUrl";
import { getFormattedNumber } from "../../utils/formattedNumber";

export function Infos() {
  const { country } = useParams();
  const { actualLanguage, data }: AppProviderProps = useContext(AppContext);

  const countryData = data?.find(
    (item) => stringForUrl(item.name.common) === country && stringForUrl(country)
  );

  const countryLanguage = Object.keys(countryData !== undefined && countryData?.languages);

  return countryData ? (
    <section>
      <article className="infos">
        <h2>{countryData.name.common}</h2>

        <div className="imgsWrapper">
          <img src={countryData.flags.png} alt={countryData.flags.alt} className="flag" />
          {countryData.coatOfArms.png !== undefined && (
            <img
              src={countryData.coatOfArms.png}
              alt={`Coat of arms of ${country}`}
              className="coatOfArms"
            />
          )}
        </div>

        <p>Official name: {countryData.name.official}</p>

        <p>
          Capital: {countryData.capital} ({countryData.capitalInfo.latlng[0]} -{" "}
          {countryData.capitalInfo.latlng[1]})
        </p>

        <p>Languages: {countryData.languages["fra"]}</p>
        {/* <p>
          Languages:{" "}
          {countryLanguage.map((lang, index) => {
            return (
              <span key={index}>
                {countryData.languages[lang]}
                {index < countryLanguage.length - 1 && ", "}
              </span>
            );
          })}
        </p> */}

        <p>Region: {countryData.region}</p>
        <p>continent: {countryData.continents[0]}</p>
        <p>subregion: {countryData.subregion}</p>

        <p>Area: {countryData.area}</p>

        {countryData.borders && (
          <p>
            Borders:{" "}
            {countryData.borders.map((border, index) => {
              const fullName = data?.find((item) => item.cca3 === border);

              return (
                <span key={index}>
                  {fullName?.name.common}
                  {index < countryData.borders.length - 1 && ", "}
                </span>
              );
            })}
          </p>
        )}

        <p>
          Population:{" "}
          {getFormattedNumber({ population: countryData.population, language: actualLanguage })}{" "}
          inhabitants
        </p>

        {countryData.unMember !== undefined && (
          <p>Membre de l'UE: {countryData.unMember === true ? "Oui" : "Non"}</p>
        )}

        {countryData.independent !== undefined && (
          <p>Indépendant : {countryData.independent === true ? "Oui" : "non"}</p>
        )}

        <p>Currency:</p>

        <p>
          Téléphone: {countryData.idd.root}
          {countryData.idd.suffixes}
        </p>

        <p>Maps:</p>

        <p>GINI:</p>

        <p>
          Car: sign: {countryData.car.signs}, side: {countryData.car.side}
        </p>

        <p>
          Timezones:{" "}
          {countryData.timezones.map((timezone, index) => {
            return (
              <span key={index}>
                {timezone}
                {index < countryData.timezones.length - 1 && ", "}
              </span>
            );
          })}
        </p>
      </article>
    </section>
  ) : (
    <PageNotFound />
  );
}
