import Image from "next/image";
import {
  ThumbUpIcon
} from '@heroicons/react/outline';
import { forwardRef } from "react";
import { useRouter } from "next/router";

// eslint-disable-next-line react/display-name
const Thumbnail = forwardRef(({result}, ref) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  const { 
    id,
    title, 
    backdrop_path, 
    poster_path, 
    overview,
    original_name,
    media_type,
    release_date,
    vote_count
  } = result;

  return (
    <div ref={ref} className="group cursor-pointer p-2 transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
        <Image
          onClick={() => router.push(`/movie/${id}`)}
          layout="responsive"
          src={
            `${BASE_URL}${backdrop_path || poster_path}`
            || `${BASE_URL}${poster_path}`
          }
          width={1920}
          height={1080}
          alt={''}
        />
        <div className="p-2">
          <p className="truncate max-w-md">{overview}</p>

          <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease group-hover:font-bold">
            {title || original_name}
          </h2>
          
          <p className="flex items-center opacity-0 group-hover:opacity-100">
            {media_type && `${media_type} •`}{" "}
            {release_date && `${release_date} •`}{" "}
            <ThumbUpIcon className="h-5 mx-2"/> {vote_count}
          </p>
        </div>
    </div>
  )
})

export default Thumbnail;