function Loader({ note }) {
  return (
    <div className="state">
      <div className="state_note">
        {note && (
          <>Пардон, но сдесь <span>{note}</span> !!! репозиториев. Придется подождать )</>
        )}
      </div>
      <div className="state_loader"></div>
    </div>
  );
}

export default Loader;
