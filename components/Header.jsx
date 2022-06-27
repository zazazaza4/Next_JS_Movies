import Image from "next/image";
import HeaderItem from "./HeaderItem";
import {
    HomeIcon,
    CollectionIcon,
    BadgeCheckIcon,
    LightningBoltIcon,
    SearchIcon,
    UserIcon
} from '@heroicons/react/outline';
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex flex-col m-5 sm:flex-row justify-between items-center">
        <div className="flex flex-grow justify-evenly max-w-2xl">
            <HeaderItem 
              title="HOME"
              Icon={HomeIcon} 
            />
            <HeaderItem title="TRENDING" Icon={LightningBoltIcon}/>
            <HeaderItem title="VERIFIED" Icon={BadgeCheckIcon}/>
            <HeaderItem title="COLLECTIONS" Icon={CollectionIcon}/>
            <HeaderItem title="SEARCH" Icon={SearchIcon}/>
            <HeaderItem title="ACCOUNT" Icon={UserIcon}/>
        </div>
        <Image 
            onClick={() => router.push('/')}
            className="object-contain cursor-pointer hover:scale-95 transition duration-300 active:scale-75"
            src="https://links.papareact.com/ua6"
            width={200}
            height={100}
            alt='hulu'
        />
    </header>
  )
}

export default Header;