import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Empty from './empty';

function Main({ userData, userRepo }) {
  const items = [...Array(userData.public_repos).keys()];

  // async function getNewPage() {
  //   setIsLoading(true);
  //   const octokit = new Octokit();
  //   const newResponseRepo = await octokit.request('GET /users/{username}/repos', {
  //     username: userData.login,
  //     per_page: 100,
  //     page: 2,
  //   });
  //   console.log(newResponseRepo);
  //   setTimeout(() => setIsLoading(false), 500);
  // }

  function Items({ currentItems }) {
    return (
      <div className="repo_list">
        {currentItems &&
          currentItems.map((item) => (
            <div className="repo_element" key={userRepo[item].id}>
              <a
                href={userRepo[item].html_url}
                target="_blank"
                rel="noreferrer"
                className="repo_element_title"
              >
                {userRepo[item].name}
              </a>
              <p className="repo_element_discription">{userRepo[item].description}</p>
            </div>
          ))}
      </div>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  return (
    <section className="main">
      <div className="container main_container">
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
        <div className="repo" id="container">
          {userRepo.length > 0 ? (
            <>
              <h1>Repositories ({userData.public_repos})</h1>
              <PaginatedItems itemsPerPage={4} />
            </>
          ) : (
            <Empty></Empty>
          )}
          {/* {userRepo.length > 0 ? (
            <>
              <h1>Repositories ({userRepo.length})</h1>
              <div className="repo_list">
                {userRepo.map((el) => (
                  <div className="repo_element" key={el.id}>
                    <a
                      href={el.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="repo_element_title"
                    >
                      {el.name}
                    </a>
                    <p className="repo_element_discription">{el.description}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Empty></Empty>
          )} */}
        </div>
      </div>
    </section>
  );
}

export default Main;
