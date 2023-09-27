"use client"

import MovieList from "@/components/MovieList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const MovielistPage = () => {

    const [fetching, setFetching] = useState<boolean>(true);

    // obtain route parameters
    const searchParams = useSearchParams();
    const urlParam = searchParams.get("urlParam");
    const categoryName = searchParams.get("categoryName");

    useEffect(()=>{
        document.title = `${categoryName} Movies - Tvflix`;
    })

    return (
        <article className="container-layout">
            {/* loading icon */}
            {fetching && <div className="fetching"></div>}

            {/* */}
            <MovieList urlParam={urlParam} categoryName={categoryName} setFetching={setFetching}/>
        </article>
    )
}

export default MovielistPage;

