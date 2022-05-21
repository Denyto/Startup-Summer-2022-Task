import { Octokit } from '@octokit/core';
import { useState } from 'react';
import Main from './main';
import Initial from './initial';
import NotFound from './notFound';
import Loader from './loader';

const octokit = new Octokit();

function Page() {
  const [userData, setUserData] = useState(null);
  const [userRepoData, setUserRepoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [isNote, setIsNote] = useState(null);
  const [isDisable, setIsDisable] = useState(false);


  async function search(e) {

    if (e.code === 'Enter' || e.keyCode === 13) {
      setIsNotFound(false);
      setIsInitial(false);
      setIsDisable(true);
      try {
        setIsLoading(true);
        const responseUser = await octokit.request('GET /users/{username}', {
          username: e.target.value,
        });
        setUserData(responseUser.data);
        const responseRepo = [];

        if (responseUser.data.public_repos > 100) {
          setIsNote(responseUser.data.public_repos);
          let pages = Math.trunc(responseUser.data.public_repos / 100 + 1);
          let urls = [];
          for (let i = 1; i <= pages; i++) {
            urls.push(
              await octokit.request('GET /users/{username}/repos', {
                username: e.target.value,
                per_page: 100,
                page: i,
              })
            );
          }
          Promise.all(urls).then((responses) =>
            responses.forEach((response) => {
              response.data.forEach((el) => responseRepo.push(el));
              setUserRepoData(responseRepo);
              setIsLoading(false);
              setIsNote(null);
            })
          );
        } else {
          octokit
            .request('GET /users/{username}/repos', {
              username: e.target.value,
              per_page: 100,
            })
            .then((res) => {
              res.data.forEach((el) => responseRepo.push(el));
              setUserData(responseUser.data);
              setUserRepoData(responseRepo);
              setIsLoading(false);
            });
        }
      } catch (error) {
        setIsNotFound(true);
        setIsLoading(false);
      }
      e.target.value = '';
      setIsDisable(false);
    }
  }

  return (
    <>
      <div>
        <header className="header">
          <div className="container header_container">
            <div className="logo">
              <img src={require('../assets/img/git.png')} className="App-logo" alt="logo" />
            </div>
            
            <input
              type="text"
              disabled={isDisable}
              placeholder="Enter GitHub username"
              onKeyDown={search}
            ></input>
          </div>
        </header>
      </div>
      {isInitial && <Initial></Initial>}
      {!isLoading && !isInitial && !isNotFound ? (
        <Main userData={userData} userRepo={userRepoData}></Main>
      ) : null}
      {isNotFound && <NotFound></NotFound>}
      {isLoading && <Loader note={isNote}></Loader>}
    </>
  );
}

export default Page;
