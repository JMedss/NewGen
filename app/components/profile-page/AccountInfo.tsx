"use client"
import { useState, useEffect } from "react"
import PasswordChange from "./PasswordChange"
import toast from "react-hot-toast"
import { getSession } from "next-auth/react"
import xss from 'xss';

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

    // data for user information
    const [data, setData] = useState({
        email: "",
        name: "", 
        sessionId: ""
    })
    
    // get the name, email and id from the props (session)
    useEffect(() => {
        if(email && name && id) {
            setData({
                email: email,
                name: name,
                sessionId: id
            })
        }
    }, [email, name, id])

    // handle edit information button click, if the user is signed in with google, show an alert
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

    // function to cancel the edit and set data back to previous state
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

    // function that sanitizes the input and updates data
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log("name:", name, "value:", value)
        const sanitizedValue = xss(value);  // Sanitize input value
        setData({
            ...data,
            [name]: sanitizedValue
        });
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

    useEffect(() => {
        console.log(data)
    }, [data])

  return (
    <div className="w-full border border-[#fee302]  py-8 px-2 min-w-[320px] md:min-w-[650px] rounded-[8px]">
        <div className="flex flex-col items-center justify-center gap-12 md:items-stretch md:flex-row w-full md:gap-8">
           <div className="flex flex-col w-[50%] min-w-[300px]">
                <h4 className="font-bold text-[20px] text-[#fee302] tracking-wider">Basic Information: </h4>
                <form className="w-full" action="submit" onSubmit={updateBasicInfo}>
                    <div className="flex flex-col mt-1">
                        <label htmlFor="name" className={readOnly ? "text-white-primary/70" : "text-white"}>Name: </label>
                        <input className={readOnly ? "block w-full md:w-[80%] rounded-[8px] border-0 py-1.5 text-black-primary opacity-70 shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6" : "block w-full md:w-[80%] rounded-[8px] border-0 py-1.5 text-black-primary shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6"} id="name" type="text" value={data.name ? data.name : ""} onChange={handleInputChange} readOnly={readOnly} disabled={readOnly} name="name" required/>
                    </div>
                    <div className="flex flex-col mt-1">
                        <label htmlFor="email" className={readOnly ? "text-white-primary/70" : "text-white"}>Email: </label>
                        <input className={readOnly ? "block w-full md:w-[80%] rounded-[8px] border-0 py-1.5 text-black-primary opacity-70 shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6" : "block w-full md:w-[80%] rounded-[8px] border-0 py-1.5 text-black-primary shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6"} id="email" type="email" value={data.email ? data.email : ""} onChange={handleInputChange} readOnly={readOnly} disabled={readOnly} name="email" required/>
                    </div>
                    <div className="flex items-center w-[80%] min-w-[290px] gap-2 mt-4">
                        <button type="button" onClick={cancelEdit} className={readOnly ? "hidden" : "bg-black-primary/50 text-yellow-primary font-bold w-full py-1.5 rounded-[8px]"}>Cancel</button>
                        <button className={readOnly ? "hidden" : "bg-yellow-primary font-bold rounded-[8px] py-1.5 w-full"}>Update</button>
                    </div>
                </form>
                
                <div className={googleAlert ? "flex bg-red-500 my-2 py-2 px-1 rounded-sm w-[80%] min-w-[290px]" : "hidden"}>
                    <p className="text-white leading-tight">Your account was signed in using google. To update your information, update your Google profile.</p>
                </div>

                <button onClick={handleEdit} className={readOnly ? "w-full md:w-[80%] bg-yellow-primary font-bold rounded-[8px] py-1.5" : "hidden"}>Edit Information</button>
           </div>
           <PasswordChange provider={provider} sessionId={id}/>
        </div>
    </div>
  )
}

export default AccountInfo
