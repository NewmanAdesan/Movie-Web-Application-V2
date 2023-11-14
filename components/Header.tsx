"use client"


import Image from 'next/image'
import Link from 'next/link'
import React, { useState, ChangeEvent} from 'react'
import { SearchBoxProps, HeaderProps, layoutContextType } from '@/common.types'
import { useLayoutContext } from './LayoutContext'


const SearchBox = ({searching, setSearching, setSearchBoxActive, setSearchText}: SearchBoxProps) => {
  let searchWrapperClassname = (searching ? "search-wrapper searching" : "search-wrapper");

  return (
    <div className="search-box">

      {/* Search Input */}
      <div className={searchWrapperClassname}>
        <input 
            type="text" 
            placeholder="Search any movies..." 
            autoComplete="off" 
            aria-label="search movies" 
            className="search-field" 
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => {
                setSearchText(e.target.value);
                if (!e.target.value) setSearching(false);
                else setSearching(true);
              }
            }
        />
        <img 
          src="/search.png" 
          alt="search" 
          width={22} 
          height={22} 
          className="leading-icon" 
        />
      </div>

      {/* Search Box Close Button */}
      <button className="search-btn" onClick={()=>{
        setSearchBoxActive(false);
        setSearchText("");
      }}>
        <img src="/close.png" alt="close search box" width={24} height={24} />
      </button>
    </div>
  );
 }
 



const Header = () => {

  const contextValue = useLayoutContext();
  if (contextValue === null) return <></>;
  const {sidebarActive, searching, setSearching, setSidebarActive, setSearchText} = contextValue;
  const [searchBoxActive, setSearchBoxActive] = useState<boolean>(false);

  return (
    <header className='header'>
        {/* Tvflix logo*/}
        <Link href={"/"} className="mr-auto" onClick={()=>setSearchText("")}>
          <Image 
              src="/logo.svg"
              alt="TvFlix Logo"
              width={140}
              height={32}
          />
        </Link>


        {/* Search Box Component for mobile*/}
        {searchBoxActive && <SearchBox searching={searching} setSearching={setSearching} setSearchBoxActive={setSearchBoxActive} setSearchText={setSearchText}/>}

        {/* Search Box Component for display*/}
        <div className='hidden md:block'>
          <SearchBox searching={searching} setSearching={setSearching} setSearchBoxActive={setSearchBoxActive} setSearchText={setSearchText}/>
        </div>


        {/* Search Box Open Button*/}
        <button className="search-btn" onClick={()=>setSearchBoxActive(true)}>
          <Image src="/search.png" alt="open search box" width={24} height={24} />
        </button>


        {/* Menu Button */}
        <button className="menu-btn p-3" onClick={()=>setSidebarActive((sidebarActive:boolean)=>!sidebarActive)}>
          {sidebarActive 
            ? <Image src="/menu-close.png" alt="close menu" width={24} height={24} className="close" />
            : <Image src="/menu.png" alt="open menu" width={24} height={24} className="menu" />
          }
        </button>
    </header>
  )
}

export default Header;


// let a = html`
//         <header>
//             <a href="./index.html" className="logo">
//                 <img src="./assets/images/logo.svg" alt="Tvflix logo" width="140" height="32">
//             </a>

//             <div className="search-box" search-box>
//                 <div className="search-wrapper" search-wrapper>
//                     <input type="text" placeholder="Search any movies..." autocomplete="off" aria-label="search movies" className="search-field" search-field>
//                     <img src="./assets/images/search.png" alt="search" width="24" height="24" className="leading-icon">     
//                 </div>

//                 <button className="search-btn" search-toggler>
//                     <img src="./assets/images/close.png" alt="close search box" width="24" height="24">
//                 </button>
//             </div>

//             <button className="search-btn" search-toggler menu-close>
//                 <img src="./assets/images/search.png" alt="open search box" width="24" height="24">
//             </button>

//             <button className="menu-btn" menu-btn menu-toggler>
//                 <img src="./assets/images/menu.png" alt="open menu" width="24" height="24" className="menu">
//                 <img src="./assets/images/menu-close.png" alt="close menu" width="24" height="24" className="close">
//             </button>

//         </header>