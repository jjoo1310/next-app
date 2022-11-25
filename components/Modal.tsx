import Image from "next/image"
import { HandThumbUpIcon, XMarkIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import MuiModal from '@mui/material/Modal'
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Element, Genre } from '../typings'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from "react-icons/fa";
import { PlusIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { baseUrl } from "../constants/movie";

interface Props {

}

function Modal(props: Props) {
    const { } = props;

    const [showModal, setShowModal] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [trailer, setTrailer] = useState<string>('')
    const [genres, setGenres] = useState<Genre[]>();
    const [muted, setMuted] = useState<boolean>(true);

    console.log()

    useEffect(() => {
        if (!movie) return;

        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=ko&append_to_response=videos`
            )
                .then((response) => response.json())
                .catch(err => console.log(err))

            if (data?.videos) {
                const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer');
                setTrailer(data.videos?.results[index]?.key)
            }

            if (data?.genres) {
                setGenres(data.genres)
            }
        }

        fetchMovie()
    }, [movie])

    const handleClose = () => {
        setShowModal(false);
    }

    console.log(trailer)

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className='fixex !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'
        >
            <>
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <div className="relative pt-[56.25%]">
                    {
                        (trailer && trailer != '') ?
                            <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${trailer}`}
                                width='100%'
                                height='100%'
                                style={{ position: 'absolute', top: '0', left: '0' }}
                                playing
                                muted={muted}
                            />
                            :
                            <Image
                                src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                                alt=""
                                layout="fill"
                                className="absolute top-0 left-0 object-cover w-full h-full"
                            />
                    }
                    <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
                        <div className="flex space-x-2">
                            <button
                                className="flex items-center bg-white rounded gap-x-2 px-8 text-xl font-bold text-black transition hover:bg-[#E6E6E6]"
                                onClick={() => { }}
                            >
                                <FaPlay className="text-black h-7 w-7" />
                                Play
                            </button>

                            <button
                                className="modalButton"
                                onClick={() => { }}
                            >
                                <PlusIcon className="h-7 w-7" />
                            </button>

                            <button
                                className="modalButton"
                                onClick={() => { }}
                            >
                                <HandThumbUpIcon className="h-7 w-7" />
                            </button>
                        </div>

                        <button
                            className="modalButton"
                            onClick={() => {
                                setMuted(!muted)
                            }}
                        >
                            {
                                muted ?
                                    <SpeakerXMarkIcon className="w-6 h-6" />
                                    :
                                    <SpeakerWaveIcon className="w-6 h-6" />
                            }
                        </button>
                    </div>
                </div>

                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="font-semibold text-green-400">
                                {movie!.vote_average * 10}% Match
                            </p>
                            <p className="font-light">
                                {movie?.release_date || movie?.first_air_date}
                            </p>
                            <div className="flex items-center justify-center h-4 rounded border border-white/40 px-1.5 text-xs">HD</div>
                        </div>

                        <div className="flex flex-col font-light gap-x-10 gap-y-4 md:flex-row">
                            <p className="w-5/6">{movie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-[gray]">장르: </span>
                                    {genres?.map((genre) => genre.name).join(', ')}
                                </div>

                                <div>
                                    <span className="text-[gray]">Original language: </span>
                                    {movie?.original_language}
                                </div>

                                <div>
                                    <span className="text-[gray]">Total votes: </span>
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    )
}

export default Modal