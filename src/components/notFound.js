function NotFound() {
  return (
    <div className='state'>
      <div className="state_content">
        <div>
          <img src={require('../assets/img/user.png')} alt="user" />
        </div>
        <p>User not found</p>
      </div>
    </div>
  );
}

export default NotFound;
