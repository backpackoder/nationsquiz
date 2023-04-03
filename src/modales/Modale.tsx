import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type ModaleProps = {
  modale: string;
  children: React.ReactNode;
  setIsModaleOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Modale({ modale, children, setIsModaleOpened }: ModaleProps) {
  function handleModalClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <div className={`modaleWrapper ${modale}`} onClick={() => setIsModaleOpened(false)}>
      <div className={`modale ${modale}`} onClick={(e) => handleModalClick(e)}>
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
