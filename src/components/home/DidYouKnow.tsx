import { useEffect, useState } from "react";

// Hooks
import { useGetRandomInfo } from "../../hooks/randomInfo";

export function DidYouKnow() {
  const [nextInfo, setNextInfo] = useState(0);
  const [animation, setAnimation] = useState(false);

  const info = useGetRandomInfo(nextInfo);

  function handleClick() {
    setNextInfo(nextInfo + 1);
    setAnimation(true);
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 500);
  }, [nextInfo]);

  return info.randomCountryFromInfo ? (
    <>
      <section className="didYouKnow">
        <div className="content">
          <img
            src={info.randomCountryFromInfo.flags.png}
            alt={info.randomCountryFromInfo.flags.alt ?? "Country flag of the random fact"}
            className={animation ? "active" : "inactive"}
          />
          <p>{info.sentence}</p>
          <button onClick={() => handleClick()}>Apprends moi autre chose !</button>
        </div>
      </section>
    </>
  ) : null;
}
