import Image from "next/image"
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings"
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface Props {
    netflixOriginals: Movie[];
}

function Banner(props: Props) {
    const { netflixOriginals } = props;

    const [movie, setMovie] = useState<Movie>()

    useEffect(() => {
        setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
    }, [netflixOriginals])

    return (
        <div className="flex flex-col py-16 space-y-2 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
            <div className='absolute top-0 left-0 -z-10 h-[95vh] w-full'>
                <Image
                    src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>

            <h1 className="text-2xl font-bold lg:text-7xl md:text-4xl">
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className="text-xs text-shadow-md max-wx-ws md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                {movie?.overview}
            </p>

            <div className="flex space-x-3">
                <button className="text-black bg-white bannerButton">
                    <FaPlay className="w-4 h-4 text-black md:h-7 md:w-7" /> Play
                </button>
                <button className="bannerButton bg-[gray]/70">
                    More Info <InformationCircleIcon className="w-5 h-5 md:h-8 md:w-8" />
                </button>
            </div>
        </div>
    )
}

export default Banner