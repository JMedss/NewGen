"use client"
import { useRouter } from "next/navigation"

type PrimaryButtonProps = {
    text: string,
    link: string,
    classes: string
}

const PrimaryButton = ({ text, link, classes }: PrimaryButtonProps) => {
    const router = useRouter()
    const handleClick = (link: string) => {
        router.push(link)
    }
  return (
    <button 
        className={`font-montserrat font-extrabold text-[16px] sm:text-[18px] px-6 py-4 rounded-[8px] hover:opacity-70 transiton duration-500 ease-in-out custom-outline ${classes}`}
        onClick={() => handleClick(link)}
        >
        {text}
    </button>
  )
}

export default PrimaryButton
