import React, { useContext, useMemo } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate, useParams } from "react-router-dom";

// Types
import { AppProviderProps } from "../../types/context";

// Components
import { PageNotFound } from "../errors/PageNotFound";

// Utils
import { stringForUrl } from "../../utils/stringForUrl";
import { getFormattedNumber } from "../../utils/formattedNumber";
import {
  getDataDependingOnLanguage,
  GetDataDependingOnLanguageType,
} from "../../utils/getDataWithLanguage";
import { useTranslation } from "react-i18next";
import { CONTINENTS } from "../../commons/commons";

type currencies = [
  string,
  {
    name: string;
    symbol: string;
  }
];

export function Infos() {
  const { country } = useParams();
  const { t } = useTranslation();
  const { actualLanguage, data }: AppProviderProps = useContext(AppContext);

  const countryData = data?.find(
    (item) => stringForUrl(item.name.common) === country && stringForUrl(country)
  );

  const [ISO_4217, currencyValues]: currencies = Object.entries(
    countryData !== undefined && countryData?.currencies
  )[0];

  function dataWithLanguage(type: GetDataDependingOnLanguageType) {
    return (
      countryData !== undefined &&
      getDataDependingOnLanguage({
        data: countryData,
        type,
        language: actualLanguage,
      })
    );
  }

  const carSide = useMemo(() => {
    switch (actualLanguage) {
      case "fra":
        return countryData?.car.side === "right" ? "droite" : "gauche";

      case "spa":
        return countryData?.car.side === "right" ? "derecho" : "izquierdo";

      default:
        return countryData?.car.side;
    }
  }, [actualLanguage]);

  const text = {
    capital: {
      name: countryData?.capital[0],
      latlng: `${countryData?.capitalInfo.latlng[0]} - ${countryData?.capitalInfo.latlng[1]}`,
    },
    borders: countryData?.borders
      .map((border) => data?.find((item) => item.cca3 === border)?.name.common)
      .join(", "),
    languages: Object.entries(countryData !== undefined && countryData?.languages)
      .map((language) => language[1])
      .join(", "),
    idd: countryData && `${countryData.idd.root}${countryData.idd.suffixes}`,
    currencies: `${currencyValues.name}, ${ISO_4217}, ${currencyValues.symbol}`,
    population:
      countryData &&
      getFormattedNumber({
        number: countryData.population,
        language: actualLanguage,
      }),
    gini: Object.entries(countryData !== undefined && countryData?.gini)[0][1].toString(),
    car: `"${countryData?.car.signs[0]}"`,
  };

  return countryData ? (
    <article>
      <div className="infos">
        <div className="namesAndImgs">
          <div className="namesWrapper">
            <h2>{dataWithLanguage("common name")}</h2>
            <h3>{dataWithLanguage("official name")}</h3>
          </div>

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
        </div>

        <div className="rows">
          <Row type="Geography" bg="rgba(144, 238, 144, 0.5)">
            <p>Maps: {countryData.maps.openStreetMaps}</p>
            <Item title="Continent" value={countryData.region} />
            <Item title="Subregion" value={countryData.subregion} />
            <Item title="Capital" value={text.capital.name} />
            <Item title="Area" value={countryData.area.toString()} />
            <Item title="Borders" value={text.borders} />
            <Item
              title="Landlocked"
              value={`${t(`study.infos.values.${countryData?.landlocked ? "yes" : "no"}`)}`}
            />
          </Row>

          <Row type="Status" bg="rgb(135, 207, 235)">
            <Item title="Population" value={text.population} />
            <Item title="Languages" value={text.languages} />
            <Item
              title="Independent"
              value={`${t(`study.infos.values.${countryData?.independent ? "yes" : "no"}`)}`}
            />
            <Item
              title="Un member"
              value={`${t(`study.infos.values.${countryData?.unMember ? "yes" : "no"}`)}`}
            />
          </Row>

          <Row type="Economy" bg="rgba(255, 255, 0, 0.5)">
            <Item title="Currency" value={text.currencies} />
            <Item title="Gini" value={text.gini} />
          </Row>

          <Row type="Miscellaneous" bg="rgba(255, 166, 0, 0.5)">
            <Item title="Calling code" value={text.idd} />
            <Item title="Timezones" value={countryData.timezones.join(", ")} />
            <Item
              title="Car"
              value={`${t("study.infos.values.car", {
                sign: countryData?.car.signs[0],
                side: carSide,
              })}`}
            />
          </Row>
        </div>
      </div>
    </article>
  ) : (
    <PageNotFound />
  );
}

function Row({
  type,
  bg = "rgb(230, 230, 230)",
  children,
}: {
  type: string;
  bg: string;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();

  return (
    <div className={`row ${type}`} style={{ backgroundColor: bg }}>
      <p className="rowTitle">{t(`study.infos.rows.${type.toLowerCase()}`)}</p>
      <div className="items">{children}</div>
    </div>
  );
}

function Item({ title, value }: { title: string; value: string | undefined }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { actualLanguage }: AppProviderProps = useContext(AppContext);

  const src = useMemo(() => {
    switch (true) {
      case value && value === CONTINENTS[value?.toUpperCase()]:
        return value && value;

      default:
        return title;
    }
  }, [title, value]);

  const valueToDisplay = useMemo(() => {
    switch (title) {
      case "Area":
        return (
          value &&
          `${getFormattedNumber({ number: parseInt(value), language: actualLanguage })} km²`
        );

      case "Borders":
        return (
          value &&
          value.split(", ").map((border, index) => {
            return (
              <React.Fragment key={index}>
                <span
                  className="border"
                  onClick={() => navigate(`/study/infos/${border.toLowerCase()}`)}
                >
                  {border}
                </span>
                {index < value.split(", ").length - 1 && ", "}
              </React.Fragment>
            );
          })
        );

      case "Population":
        return t("study.infos.values.population", { population: value });

      default:
        return value;
    }
  }, [title, value]);

  return value && src ? (
    <div className="item">
      <p className="type">{t(`study.infos.labels.${title.replace(/\s/g, "").toLowerCase()}`)}</p>
      <img
        className="infosItemImg"
        src={`../../imgs/${src.toLowerCase()}.png`}
        alt={title.toLowerCase()}
      />
      <p className="value">{valueToDisplay}</p>
    </div>
  ) : null;
}
