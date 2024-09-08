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
                        background: "#43607B",
                        borderRadius: "8px",
                        color: "#fff",
                        boxShadow: "-8px 8px 10px 0px rgba(0,0,0,0.4)",
                        outline: "solid 1px rgba(255, 255, 255 ,0.5)",
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