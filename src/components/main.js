function Main({ userData, userRepo }) {
  console.log(userData, userRepo);

  return (
    <section className="main">
      <div className="user">
        <div className="user_foto">
          <img src={userData.avatar_url} alt="foto" />
        </div>
        <div className="user_name">{userData.name}</div>
        <a href={userData.html_url} target="_blank" rel="noreferrer" className="user_nick">
          {userData.login}
        </a>
        <div className="user_data">
          <div className="user_data_element">
            <div>
              <img src={require('../assets/img/followers.png')} alt="followers" />
            </div>
            <p>
              {userData.followers === 1
                ? `${userData.followers} follower`
                : `${userData.followers} followers`}
            </p>
          </div>
          <div className="user_data_element">
            <div>
              <img src={require('../assets/img/following.png')} alt="following" />
            </div>
            <p>{`${userData.following} following`}</p>
          </div>
        </div>
      </div>
      <div className="repo">
        <h1>Repositories ({userRepo.length})</h1>
        <div className="repo_list">
          {userRepo.map((el) => (
            <div className="repo_element" key={el.id}>
              <a href={el.html_url} target="_blank" rel="noreferrer" className="repo_element_title">
                {el.name}
              </a>
              <p className="repo_element_discription">{el.description}</p>
            </div>
          ))}

          {/* <div className="repo_element">
            <a
              href="https://github.com/Denyto?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="repo_element_title"
            >
              react-hot-loader
            </a>
            <p className="repo_element_discription">
              Tweak React components in real time. (Deprecated: use Fast Refresh instead.
            </p>
          </div>
          <div className="repo_element">
            <a
              href="https://github.com/Denyto?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="repo_element_title"
            >
              overreacted.io
            </a>
            <p className="repo_element_discription">Personal blog by Dan Abramov.</p>
          </div>
          <div className="repo_element">
            <a
              href="https://github.com/Denyto?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="repo_element_title"
            >
              whatthefuck.is
            </a>
            <p className="repo_element_discription">
              An opinionated glossary of computer science terms for front-end developers. Written by
              Dan Abramov.
            </p>
          </div>
          <div className="repo_element">
            <a
              href="https://github.com/Denyto?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="repo_element_title"
            >
              react-deep-force-update
            </a>
            <p className="repo_element_discription">react-deep-force-update</p>
          </div>
          <div className="repo_element">
            <a
              href="https://github.com/Denyto?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="repo_element_title"
            >
              react-deep-force-update
            </a>
            <p className="repo_element_discription">react-deep-force-update</p>
          </div>
          <div className="repo_element">
            <a
              href="https://github.com/Denyto?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="repo_element_title"
            >
              react-deep-force-update
            </a>
            <p className="repo_element_discription">react-deep-force-update</p>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Main;
