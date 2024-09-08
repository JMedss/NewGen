

type TermsCardProps = {
    id: string;
    header: string;
    subheader: string;
    paragraphOne: string;
    paragraphTwo: string;
}

const TermsCard = ({ id, header, subheader, paragraphOne, paragraphTwo }: TermsCardProps) => {
  return (
    <div id={id} className="flex flex-col">
        <div>
            <h3 className="text-[#fee302] font-bold">{header.toUpperCase()}</h3>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-col">
                <div className="flex flex-col mt-6">
                    <h4 className="text-[18px] tracking-widest text-white">{subheader}</h4>
                    <hr className="w-full border-t border-y-yellow-primary" />
                </div>
                <p className="text-white mt-2">{paragraphOne}</p>
                <p className="text-white mt-4">{paragraphTwo}</p>
            </div>
        </div>
    </div>
  )
}

export default TermsCard
