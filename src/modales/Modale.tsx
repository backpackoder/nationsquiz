// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Types
import { ModaleProps } from "../types/props";

export function Modale({ name, children, setIsModaleOpened }: ModaleProps) {
  function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <div className={"modaleWrapper"} onClick={() => setIsModaleOpened(false)}>
      <div className={`modale ${name}`} onClick={(e) => handleModalClick(e)}>
        <FontAwesomeIcon
          icon={faXmark}
          size="2xl"
          className="closeBtn"
          onClick={() => setIsModaleOpened(false)}
        />
        {children}
      </div>
    </div>
  );
}
