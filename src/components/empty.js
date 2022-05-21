function Empty() {
  return (
    <div className="state">
      <div className="state_content">
        <div>
          <img src={require('../assets/img/stroke.png')} alt="user" />
        </div>
        <p>Repository list is empty</p>
      </div>
    </div>
  );
}

export default Empty;
