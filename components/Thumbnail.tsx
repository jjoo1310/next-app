import Image from "next/image";
import { Movie } from "../typings";

interface Props {
    // When using firebase
    // movie: Movie | DocumentData;
    movie: Movie;
}

function Thumbnail(props: Props) {
    const { movie } = props;

    return (
        <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                alt=''
                className='object-cover rounded-sm md:rounded'
                layout="fill"
            />
        </div>
    )
}

export default Thumbnail