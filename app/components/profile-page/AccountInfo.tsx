"use client"
import { useState, useEffect } from "react"
import PasswordChange from "./PasswordChange"
import toast from "react-hot-toast"
import { getSession } from "next-auth/react"

type AccountInfoProps = {
    email: string | null | undefined,
    name: string | null | undefined,
    provider: string | null | undefined,
    id: string | null | undefined,
    stripeId: string | null | undefined
}

const AccountInfo = ({ email, name, provider, id, stripeId }: AccountInfoProps) => {

    const [readOnly, setReadOnly] = useState(true)
    const [googleAlert, setGoogleAlert] = useState(false)
    const [data, setData] = useState({
        email: "",
        name: "", 
        sessionId: ""
    })
    
    useEffect(() => {
        if(email && name && id) {
            setData({
                email: email,
                name: name,
                sessionId: id
            })
        }
    }, [email, name, id])
    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault()
        if(provider === "google") {
            setGoogleAlert(true)
            setTimeout(() => {
                setGoogleAlert(false)
            }, 5000)
        } else {
        setReadOnly(!readOnly)
        }
    }

    const cancelEdit = (e: React.FormEvent) => {
        e.preventDefault()
        setReadOnly(true)
        if(email && name && id) {
            setData({
                email: email,
                name: name,
                sessionId: id
            })
        }
    }

    // function that updates the session after updates
    const updateSession = async () => {
        const session = await getSession()

        // update the data state to reflect ui changes
        setData({
            ...data,
            email: session?.user?.email as string,
            name: session?.user?.name as string,        
        })
    }


    const updateBasicInfo = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        const res = await fetch("/api/update-basic-info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({data, stripeId})

        })
        // update the session
        updateSession()
        toast.success("Information Updated")
        } catch (error) {
            toast.error("Error updating your information")
        } finally {
            setReadOnly(true)
        }
    }

  return (
    <div className="w-full border border-[#fee302] shadow-inner shadow-black py-8 px-2 min-w-[320px] md:min-w-[650px]">
        <div className="flex flex-col items-center justify-center gap-12 md:items-stretch md:flex-row w-full md:gap-8">
           <div className="flex flex-col w-[50%] min-w-[300px]">
                <h4 className="font-bold text-[20px] text-[#fee302] tracking-wider">Basic Information: </h4>
                <form className="w-full" action="submit" onSubmit={updateBasicInfo}>
                    <div className="flex flex-col mt-1">
                        <label htmlFor="name" className={readOnly ? "text-gray-300" : "text-white"}>Name: </label>
                        <input className={readOnly ? "w-[80%] min-w-[290px] bg-gray-300 text-black/50 border-[1.6px] border-black rounded-md shadow-sm shadow-black" : "bg-white w-[80%] min-w-[290px] rounded-md shadow-sm shadow-black focus:ring-0 focus:border-1 focus:border-[#fee302]"} id="name" type="text" value={data.name ? data.name : ""} onChange={(e) => setData({...data, name: e.target.value})} readOnly={readOnly} disabled={readOnly} required/>
                    </div>
                    <div className="flex flex-col mt-1">
                        <label htmlFor="email" className={readOnly ? "text-gray-300" : "text-white"}>Email: </label>
                        <input className={readOnly ? "w-[80%] min-w-[290px] bg-gray-300 text-black/50 border-[1.6px] border-black rounded-md shadow-sm shadow-black" : "bg-white w-[80%] min-w-[290px] rounded-md shadow-sm shadow-black focus:ring-0 focus:border-1 focus:border-[#fee302]"} id="email" type="email" value={data.email ? data.email : ""} onChange={(e) => setData({...data, email: e.target.value})} readOnly={readOnly} disabled={readOnly} required/>
                    </div>
                    <div className="flex items-center w-[80%] min-w-[290px] gap-2 mt-4">
                        <button type="button" onClick={cancelEdit} className={readOnly ? "hidden" : "bg-gray-600 w-full hover:scale-100 hover:translate-y-0"}>Cancel</button>
                        <button className={readOnly ? "hidden" : "bg-[#fee302] w-full hover:scale-100 hover:translate-y-0"}>Update</button>
                    </div>
                </form>
                
                <div className={googleAlert ? "flex bg-red-500 my-2 py-2 px-1 rounded-sm w-[80%] min-w-[290px]" : "hidden"}>
                    <p className="text-white leading-tight">Your account was signed in using google. To update your information, update your Google profile.</p>
                </div>

                <button onClick={handleEdit} className={readOnly ? "w-[80%] min-w-[290px] update bg-gray-600 rounded-md py-1 mt-2 shadow-sm shadow-black" : "hidden"}>Edit Information</button>
           </div>
           <PasswordChange provider={provider} sessionId={id}/>
        </div>
    </div>
  )
}

export default AccountInfo
