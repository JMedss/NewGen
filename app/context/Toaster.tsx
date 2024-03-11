"use client"
import { Toaster } from "react-hot-toast"

const ToasterContext = ( ) => {
    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: "",
                    duration: 4000,
                    style: {
                        background: "linear-gradient(to right, #021628, #00284C)",
                        color: "#fff",
                        boxShadow: "-8px 8px 10px #000",
                        outline: "solid 1px #fee302",
                    },
                    // Default options for specific types
                    success: {
                        duration: 3000,
                    },
                }}
            />
        </div>
    )
}

export default ToasterContext