"use client"
import { useEffect, useState } from "react"
import { MdVisibility } from "react-icons/md"
import { MdVisibilityOff } from "react-icons/md"
import toast from "react-hot-toast"

type PasswordChangeProps = {
    provider: string | null | undefined
    sessionId: string | null | undefined
}

const PasswordChange = ({provider, sessionId}: PasswordChangeProps) => {
    // state for google alert
    const [googleAlert, setGoogleAlert] = useState(false)
    // state for if forms pop up or not according to provider
    const [password, setPassword] = useState(false)
    // state for password visibility
    const [newPasswordVisible, setNewPasswordVisible] = useState(false)
    // state for confirm password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

    // types for passwords and confirm passwords
    const [passwordType, setPasswordType] = useState<"password" | "text">("password")
    const [confirmPasswordType, setConfirmPasswordType] = useState<"password" | "text">("password")

    //state for passwords do not match alert
    const [passwordAlert, setPasswordAlert] = useState(false)

    // state for new password data
    const [data, setData] = useState({
        sessionId: sessionId ? sessionId : "",
        newPassword: "",
        confirmPassword: ""
    })

    // if google account it shows alert otherwise it shows password form
    const handlePassword = (e: React.FormEvent) => {
        e.preventDefault()
        if(provider === "google") {
            setGoogleAlert(true)
            setTimeout(() => {
                setGoogleAlert(false)
            }, 5000)
        } else {
            setPassword(true)
        }
    }
    // handle new password visibility
    const handleNewPassword = () => {
        setNewPasswordVisible(!newPasswordVisible)
        setPasswordType(newPasswordVisible ? "password" : "text")
    }
    // handle confirm password visibility
    const handleConfirmPassword = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible)
        setConfirmPasswordType(confirmPasswordVisible ? "password" : "text")
    }
    // handle cancel btn for password form
    const handleCancel = (e: React.FormEvent) => {
        e.preventDefault()
        setPassword(false)
        setData({
            sessionId: sessionId ? sessionId : "",
            newPassword: "",
            confirmPassword: ""
        })
    }

   
    // handle password change submission
    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        if(data.newPassword !== data.confirmPassword) {
            setPasswordAlert(true)
            setTimeout(() => {
                setPasswordAlert(false)
            }, 5000)
            setData({
                sessionId: sessionId ? sessionId : "",
                newPassword: "",
                confirmPassword: ""
            })
        } else {
            const res = await fetch("/api/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(() => toast.success("Password Changed Successfully"))
            .catch(() => toast.error("Password Change Failed"))
            .finally(() => { 
                setPassword(false)
                setData({
                    sessionId: sessionId ? sessionId : "",
                    newPassword: "",
                    confirmPassword: ""
                })
            })
        }
    }

  return (
    <div className='flex flex-col w-[50%] min-w-[300px]'>
      <div className={password ? "" : "flex w-full justify-center items-center md:items-start md:justify-normal"}>
        <h4 className="font-bold text-[20px] text-[#fee302] tracking-wider">Password: </h4>
      </div>
      <div className={password ? "hidden" : 'flex flex-col w-full h-full justify-center items-center'}>
                <div className={googleAlert ? "flex bg-red-500 my-2 py-2 px-1 rounded-sm w-full md:w-[80%] min-w-[290px] rounded-8px" : "hidden"}>
                    <p className="text-white leading-tight">Your account was signed in using google. To update your information, update your Google profile.</p>
                </div>
            <button onClick={handlePassword} className="text-black-primary/70 my-12 md:my-0 underline font-bold">Change Password</button>
      </div>
      <form action="submit" className={password? "w-full" : "hidden"} onSubmit={handlePasswordChange}>
        <div className="flex flex-col mt-1">
            <label htmlFor="newPassword" className="text-white">New Password: </label>
            <div className="relative w-full md:w-[80%] min-w-[290px] ">
                <input id="newPassword" className="block w-full rounded-[8px] border-0 py-1.5 text-black-primary  shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6" type={passwordType} value={data.newPassword} onChange={(e) => setData({...data, newPassword: e.target.value})} required />
                <button onClick={handleNewPassword} className={newPasswordVisible ? "absolute z-10 right-4 top-[12px] lg:top-[10px] text-[#fee302]" : "hidden"}><MdVisibility /></button>
                <button onClick={handleNewPassword} className={newPasswordVisible ? "hidden" : "absolute z-10 right-4 top-[12px] lg:top-[10px] text-[#fee302]"}><MdVisibilityOff /></button>
            </div>
        </div>
        <div className="flex flex-col mt-1">
            <label htmlFor="confirmPassword" className="text-white">Confirm Password: </label>
            <div className="relative w-full md:w-[80%] min-w-[290px] ">
                <input id="confirmPassword" className="block w-full rounded-[8px] border-0 py-1.5 text-black-primary  shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6" type={confirmPasswordType} value={data.confirmPassword} onChange={(e) => setData({...data, confirmPassword: e.target.value})} required />
                <button type="button" onClick={handleConfirmPassword} className={confirmPasswordVisible ? "absolute z-10 right-4 top-[12px] lg:top-[10px] text-[#fee302] hover:scale-100 hover:translate-y-0" : "hidden"}><MdVisibility /></button>
                <button type="button" onClick={handleConfirmPassword} className={confirmPasswordVisible ? "hidden" : "absolute z-10 right-4 top-[12px] lg:top-[10px] text-[#fee302] hover:scale-100 hover:translate-y-0"}><MdVisibilityOff /></button>
            </div>
        </div>

        <div className={passwordAlert ? "flex bg-red-500 my-2 py-2 px-1 rounded-sm w-[80%] min-w-[290px]" : "hidden"}>
                    <p className="text-white leading-tight">Passwords did not match. Please try again</p>
                </div>

        <div className="flex items-center gap-1 w-full md:w-[80%] min-w-[290px] mt-4">
            <button type="button" onClick={handleCancel} className="bg-black-primary/50 text-yellow-primary font-bold w-[30%] py-1.5 rounded-[8px]">Cancel</button>
            <button type="submit" className="bg-yellow-primary font-bold rounded-[8px] py-1.5 w-[70%]">Change Password</button>
        </div>
      </form>
    </div>
  )
}

export default PasswordChange
