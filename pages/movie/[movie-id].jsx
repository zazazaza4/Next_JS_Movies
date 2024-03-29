import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import { ThumbUpIcon } from '@heroicons/react/outline';


export default function MovieSingle({ results }) {
    const [moreInfo, setMoreInfo] = useState(false);
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const {
        title,
        backdrop_path,
        poster_path,
        overview,
        original_name,
        media_type,
        release_date,
        vote_count,
        genres
    } = results;

    console.log(results);

    const truncate = (string, n) => string.length > 100 ? string.slice(0, n) + ' ...' : string;

    const genresNames = genres ? genres.map(genre => genre.name) : [];
    return (
        <div className={'ada'}>
            <Head>
                <title>Hulu Clone | {title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className="">
                <div className="relative w-screen h-screen">
                    <Image
                        className="absolute z-10"
                        layout="fill"
                        objectFit='cover'
                        src={
                            `${BASE_URL}${backdrop_path || poster_path}`
                            || `${BASE_URL}${poster_path}`
                        }
                        alt={title}
                        width={1920}
                        height={1080}
                    />
                    <div
                        className="relative z-20 flex justify-center items-end h-screen bg-gradient-to-t  from-[#06202A] lg:items-center lg:justify-start lg:bg-gradient-to-r"
                    >
                        <div className="max-w-xl text-white px-3 pb-5 bg-opacity-5 bg-slate-600">
                            <h2 className="text-center text-3xl mb-4 font-light">
                                {title || original_name}
                            </h2>
                            <p className="mb-2">
                                { 
                                    moreInfo 
                                    ? overview 
                                    : truncate(overview, 100) 
                                }
                                <span 
                                    onClick={() => {
                                        setMoreInfo(moreInfo => !moreInfo)
                                    }}
                                    className=" mx-2 cursor-pointer text-gray-400 hover:text-red-600 transition"
                                >
                                    {
                                        moreInfo 
                                        ? 'Hidden'
                                        : 'More'
                                    }
                                </span>
                            </p>
                            <div className="mb-2">
                                <span>Genres: </span> 
                                {
                                    genresNames.join(', ')
                                }
                            </div>
                            <p className="mb-4 flex items-center">
                                {release_date && `${release_date} •`}{" "}
                                <ThumbUpIcon className="h-5 mx-2" /> {vote_count}
                            </p>
                            <div className="text-center">
                                <button
                                    onClick={() => location.href =`https://rezka.ag/search/?do=search&subaction=search&q=${title}` }
                                    className="rounded-full px-10 py-2 text-black bg-white hover:bg-slate-300 transition active:bg-gray-500 active:text-white ">
                                        Watch Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    const id = context.query['movie-id'];
    const API_KEY = '94f7bec1b91c0b7133e5fa7be293f498';

    const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        .then(res => res.json());

    return {
        props: {
            results: request
        }
    }
} 