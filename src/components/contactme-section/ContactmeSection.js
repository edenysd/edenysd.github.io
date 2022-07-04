
import React from "react"
import ContactmeCard from "./ContactmeCard"

const ContactmeSection = () => {
    return (
        <div className="flex h-screen min-h-screen bg-gray-900 flex-col w-full p-3 mt-5" id="contactme-section">
            <p className="mt-16 sm:mt-32 text-cyan-200 text-6xl sm:text-8xl font-serif">
                Contact Me
            </p>
            <div className="w-full h-full p-3">
                <ContactmeCard />
            </div>
        </div >
    )
}

export default ContactmeSection