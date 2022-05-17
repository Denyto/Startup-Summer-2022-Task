import { Octokit } from '@octokit/core';
import { useState } from 'react';
import Main from '../components/main.js';
import Initial from '../components/initial.js';
import NotFound from '../components/notFound.js';
import Loader from '../components/loader.js';

const octokit = new Octokit({ auth: `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` });

function Page() {
  const [userData, setUserData] = useState(null);
  const [userRepoData, setUserRepoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  async function search(e) {
    if (e.code === 'Enter') {
      setIsNotFound(false);
      setIsInitial(false);
      try {
        setIsLoading(true);
        const responseUser = await octokit.request('GET /users/{username}', {
          username: e.target.value,
        });

        const responseRepo = await octokit.request('GET /users/{username}/repos', {
          username: e.target.value,
        });
        setTimeout(() => {
          setUserData(responseUser.data);
          setUserRepoData(responseRepo.data);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setIsNotFound(true);
        console.log('NOT FOUND');
      }
      e.target.value = '';
    }
  }

  return (
    <>
      <div>
        <header className="header">
          <div className="logo">
            <img src={require('../assets/img/git.png')} className="App-logo" alt="logo" />
          </div>
          <input type="text" onKeyDown={search}></input>
        </header>
      </div>
      {isInitial && <Initial></Initial>}
      {!isLoading && !isInitial ? <Main userData={userData} userRepo={userRepoData}></Main> : null}
      {isNotFound && <NotFound></NotFound>}
      {isLoading && <Loader></Loader>}
    </>
  );
}

export default Page;
