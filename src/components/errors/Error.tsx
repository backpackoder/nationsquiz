import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

// Commons
import { ROUTES } from "../../commons/commons";

export function Error() {
  const { error } = useContext(AppContext);
  const navigate = useNavigate();

  function handleNav(route?: string) {
    route && navigate(route);
    window.location.reload();
  }

  return (
    <>
      <div>
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <div>
          <button onClick={() => handleNav(ROUTES.HOME)}>Go homepage</button>
          <button onClick={() => handleNav()}>Reload</button>
        </div>
      </div>
    </>
  );
}
