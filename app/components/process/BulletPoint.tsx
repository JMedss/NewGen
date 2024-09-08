import Image from "next/image"


type BulletPointProps = {
    bulletPoint: string
}

const BulletPoint = ({ bulletPoint }: BulletPointProps ) => {
  return (
    <div className="flex items-center gap-2">
        <div className="w-[16px] flex-shrink-0">
            <Image 
                style={{ width: "auto", height: "auto" }}
                src="circle.svg" 
                width={100} 
                height={100} 
                aria-hidden="true"
                alt="Bullet Point"/>
        </div>

        <p className="text-[16px] lg:text-[18px] font-light text-white-primary leading-[110%] tracking-[1px] md:w-[280px] lg:w-[350px]">{bulletPoint}</p>
    </div>
  )
}

export default BulletPoint
