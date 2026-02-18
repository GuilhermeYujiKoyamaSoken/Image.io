import React from "react"

interface ButtonProps {
    style?: string
    label?: string
    onClick?: (e: any) => void
    type?: "submit" | "button" | "reset" | undefined
    disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ onClick, style = "", label, type = "button", disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                px-5 py-2 rounded-lg font-semibold
                transition shadow-sm
                text-white
                bg-blue-600 hover:bg-blue-500
                disabled:bg-gray-700 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-blue-400
                cursor-pointer
                ${style}
            `}
        >
            {label}
        </button>
    )
}
