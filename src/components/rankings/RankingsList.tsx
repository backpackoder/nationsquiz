import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

// Types
import { RankingsListProps } from "../../types/props";
import { AppProviderProps } from "../../types/context";

// Components
import { PlayThisQuizBtn } from "../buttons/PlayThisQuizBtn";

// Commons
import { ROUTES } from "../../commons/commons";

export function RankingsList({ options }: RankingsListProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data }: AppProviderProps = useContext(AppContext);
  const { rankings, showRank, showSettings, playBtn } = options;

  return (
    <ul className="rankings-list">
      {rankings?.map((rank, index) => {
        const { theme, region, difficulty, length, pseudo, nationality, score, time } = rank;

        const date = formatDistanceToNow(new Date(rank.date), {
          addSuffix: true,
          includeSeconds: false,
        });

        const nationalityFlag = data?.find((country) => country.name.common === nationality);

        return (
          <li key={index} className="rankings-item">
            {showRank && <p className={index + 1 === 1 ? "rank first" : "rank"}>{index + 1}</p>}

            <div className="infos">
              {showSettings && (
                <ul className="showSettings">
                  <li> {t(`rankings.filters.theme.${theme}`)}</li>
                  <li> {t(`rankings.filters.region.${region.toLowerCase()}`)}</li>
                  <li>{t(`rankings.filters.difficulty.${difficulty}`)}</li>
                  <li> {t(`rankings.filters.length.${length}`)}</li>
                </ul>
              )}

              <div className="player">
                <h4>{pseudo}</h4>
                {nationalityFlag && (
                  <img
                    src={nationalityFlag?.flags.png}
                    alt={nationalityFlag?.flags.alt}
                    onClick={() =>
                      navigate(`../${ROUTES.STUDY}${ROUTES.INFOS.ROOT}${nationality.toLowerCase()}`)
                    }
                  />
                )}
              </div>

              <p className="scoreAndTime">
                <Trans
                  components={{
                    span: <span></span>,
                  }}
                  values={{ score, time }}
                >
                  {score === 1 ? "ranking.scoreAndTime.one" : "ranking.scoreAndTime.many"}
                </Trans>
              </p>

              <div className="date">
                <FontAwesomeIcon icon={faClock} size="sm" />
                <p>
                  <small>{date}</small>
                </p>
              </div>

              {playBtn && <PlayThisQuizBtn settings={{ theme, region, difficulty, length }} />}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
