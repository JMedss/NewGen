"use client"

import { SessionProvider, sessionProvider } from "next-auth/react"

export default function Provider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}