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
        <button className="closeBtn">no</button>
        {children}
      </div>
    </div>
  );
}
