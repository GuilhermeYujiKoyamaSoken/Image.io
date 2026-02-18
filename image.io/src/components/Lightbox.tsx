'use client'

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface LightboxProps {
    image?: string
    isOpen: boolean
    onClose: () => void
}

export function Lightbox({ image, isOpen, onClose }: LightboxProps) {
    const [zoom, setZoom] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [dragging, setDragging] = useState(false)
    const startPos = useRef({ x: 0, y: 0 })

    useEffect(() => {
        if (isOpen) {
            setZoom(1)
            setPosition({ x: 0, y: 0 })
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
        document.addEventListener("keydown", handleKey)
        document.body.style.overflow = "hidden"
        return () => {
            document.removeEventListener("keydown", handleKey)
            document.body.style.overflow = "auto"
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        setZoom(prev => Math.min(Math.max(prev - e.deltaY * 0.001, 1), 4))
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom <= 1) return
        setDragging(true)
        startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return
        setPosition({ x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y })
    }

    const handleMouseUp = () => setDragging(false)

    const toggleZoom = () => {
        if (zoom > 1) { setZoom(1); setPosition({ x: 0, y: 0 }) } 
        else { setZoom(2) }
    }

    const resetZoom = () => { setZoom(1); setPosition({ x: 0, y: 0 }) }

    const downloadImage = () => {
        if (!image) return
        const link = document.createElement("a")
        link.href = image
        link.download = "imagem"
        link.click()
    }

    return createPortal(
        <div
            className="fixed inset-0 bg-black/95 flex justify-center items-center z-[9999]"
            onClick={onClose}
        >
            <div
                className="relative w-full h-full flex justify-center items-center group"
                onClick={e => e.stopPropagation()}
            >
                {/* Controles */}
                <div className="absolute top-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                        onClick={resetZoom}
                        className="bg-gray-900/80 text-gray-100 px-3 py-2 rounded shadow hover:bg-gray-800 transition"
                    >
                        Reset
                    </button>
                    <button
                        onClick={downloadImage}
                        className="bg-gray-900/80 text-gray-100 px-3 py-2 rounded shadow hover:bg-gray-800 transition"
                    >
                        Download
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-red-600 text-white px-3 py-2 rounded shadow hover:bg-red-500 font-bold transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Imagem */}
                <img
                    src={image}
                    onClick={toggleZoom}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    draggable={false}
                    style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }}
                    className="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-200 select-none cursor-zoom-in"
                />
            </div>
        </div>,
        document.body
    )
}
