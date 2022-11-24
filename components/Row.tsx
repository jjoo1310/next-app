import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { Movie } from "../typings";
import Thumbnail from "./Thumbnail";

interface Props {
    title: string;
    // When using firebase
    // movie: Movie | DocumentData[];
    movies: Movie[];
}

function Row(props: Props) {
    const { title, movies } = props;

    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState<Boolean>(false);

    const handleClick = (direction: string) => {
        setIsMoved(true);

        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current

            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth

            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' },)
        }
    }

    return (
        <div className="h-40 space-y-0.5">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#E5E5E5] transition duration-200 hover:text-white md:text-2xl">{title}</h2>
            <div className="relative group md:-ml-2">
                <ChevronLeftIcon
                    className={`absolute top-0 bottom-0 z-40 m-auto transition opacity-0 cursor-pointer left-2 h-9 w-9 hover:scale-125 group-hover:opacity-100 ${!isMoved && 'hidden'}`}
                    onClick={() => handleClick('left')}
                />

                <div
                    ref={rowRef}
                    className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
                >
                    {
                        movies.map((movie, index) => {
                            return (
                                <Thumbnail
                                    key={movie.id}
                                    movie={movie}
                                />
                            )
                        })
                    }
                </div>

                <ChevronRightIcon
                    className="absolute top-0 bottom-0 z-40 m-auto transition opacity-0 cursor-pointer right-2 h-9 w-9 hover:scale-125 group-hover:opacity-100"
                    onClick={() => handleClick('right')}
                />
            </div>
        </div>
    )
}

export default Row