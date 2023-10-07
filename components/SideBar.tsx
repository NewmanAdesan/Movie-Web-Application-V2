"use client"

import { TMDB_GENRE_LIST_REQUEST } from '@/api_keys';
import Image from 'next/image';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useLayoutContext } from './LayoutContext';

const SideBar = () => {
  const contextValue = useLayoutContext();
  if (contextValue === null) return <></>;
  const {sidebarActive, setSidebarActive} = contextValue;

  let sidebarClassname = (sidebarActive ? "sidebar active" : "sidebar")
  const [genreList, setGenreList] = useState<{[index: number]: string}|null>();

  useEffect(()=>{
    const fetchTMDBGenreList = async () => {
      try{
        const response = await fetch(TMDB_GENRE_LIST_REQUEST());
        const data = await response.json();
        const newGenreList: {[index: number]: string} = {}
        for (const {id, name} of data.genres){
          newGenreList[id] = name;
        }
        setGenreList(newGenreList);
      } catch(error: any){
        console.log("There was an error when using TMDB GENRE LIST REQUEST");
      }
    }

    fetchTMDBGenreList();
  }, [])

  return (
    <>
      <nav className={sidebarClassname}>
        <div className='sidebar-inner'>
              {/* sidebar-list (genre) */}
              <div className="sidebar-list">
                  <p className="title">Genre</p>
                  {genreList && Object.entries(genreList).map(([genreId, genreName]) => (
                      <Link
                        key={genreId}
                        href={{
                          pathname: "/movielist",
                          query: { urlParam: `with_genres=${genreId}`, categoryName: `${genreName}` },
                        }}
                        className="sidebar-link"
                        onClick={()=>setSidebarActive(false)}
                      >
                        {genreName}
                      </Link>
                  ))}
              </div>


              {/* sidebar-list (language) */}
              <div className="sidebar-list">
                  <p className="title">Language</p>
                  <Link
                    key="en"
                    href={{
                      pathname: "/movielist",
                      query: { urlParam: "with_original_language=en", categoryName: "English" }
                    }}
                    className="sidebar-link"
                    onClick={()=>setSidebarActive(false)}
                  >
                    English
                  </Link>
                  <Link
                    key="hi"
                    href={{
                      pathname: "/movielist",
                      query: { urlParam: "with_original_language=hi", categoryName: "Hindi" }
                    }}
                    className="sidebar-link"
                    onClick={()=>setSidebarActive(false)}
                  >
                    Hindi
                  </Link>
                  <Link
                    key="ko"
                    href={{
                      pathname: "/movielist",
                      query: { urlParam: "with_original_language=ko", categoryName: "Korean" }
                    }}
                    className="sidebar-link"
                    onClick={()=>setSidebarActive(false)}
                  >
                    Korean
                  </Link>
              </div>


              {/* sidebar-footer */}
              <div className="sidebar-footer text-text-color">
                  <p className="pb-3">
                      Copyright &copy; 2023 
                      <Link
                          href="https://github.com/NewmanAdesan/Movie-Web-Application-V2"
                          className="sidebar-link inline"
                          style={{"display": "inline"}}>
                        {" "} NewmanAdesan
                      </Link>
                  </p>
                  <p className='pb-3'>
                      Original work copyright &#169; 2023 
                      <Link
                          href="https://youtube.com/@codewithsadee"
                          className="sidebar-link"
                          style={{"display": "inline"}}>
                        {" "} codewithsadee
                      </Link> 
                  </p>
                  <p className='pb-5 text-label'>
                    My version of the web application was built with React, TypeScript, Tailwind CSS, and Next.js, and additionally implements fetching icon and placeholder functionality.
                  </p>

                  <Image 
                      src="/tmdb-logo.svg" 
                      alt="the movie database logo" 
                      width="130" 
                      height="17"
                  />
              </div>
        </div>
      </nav>
      {sidebarActive && <div className="overlay desktop:hidden" onClick={()=>setSidebarActive(false)}></div>}
    </>
  )
}

export default SideBar