'use client'

import { useState } from "react"
import { Lightbox } from "./Lightbox"
import { ArrowDownIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline"
import { useImageService } from "@/resources"
import { Image } from "@/resources/image/image.resources"
import { useNotification } from "@/components"

interface ImageCardProps {
    image: Image;
    onDelete?: (id: string) => void;
    onUpdate?: (image: Image) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete, onUpdate }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const [editName, setEditName] = useState(image.name)
    const [editTags, setEditTags] = useState(image.tags)

    const imageService = useImageService()
    const { notify } = useNotification()

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (image.url) window.open(image.url, '_blank')
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()

        if (!image.id) return

        const confirmDelete = confirm(`Deseja realmente excluir "${image.name}"?`)
        if (!confirmDelete) return

        try {
            setIsDeleting(true)
            await imageService.deletar(image.id)

            notify("Imagem excluída com sucesso", "success")
            onDelete?.(image.id)

        } catch {
            notify("Erro ao excluir imagem", "error")
        } finally {
            setIsDeleting(false)
        }
    }

    const handleUpdate = async () => {
        try {

            await imageService.atualizar(image.id, {
                name: editName,
                tags: editTags
            })

            notify("Imagem atualizada com sucesso", "success")
            setIsEditing(false)

            const updatedImage: Image = {
                ...image,
                name: editName,
                tags: editTags,
                updatedAt: new Date().toISOString()
            }

            onUpdate?.(updatedImage)

        } catch {
            notify("Erro ao atualizar imagem", "error")
        }
    }
    return (
        <>
            <div
                className="bg-gray-900 text-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer overflow-hidden"
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={image.url}
                    className="h-56 w-full object-cover"
                    alt={image.name}
                />

                <div className="p-4 flex flex-col gap-3">

                    <div className="flex justify-between items-start">
                        <h5 className="text-lg font-semibold break-words">
                            {image.name}
                        </h5>

                        <div className="flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsEditing(true) }}
                                className="w-8 h-8 bg-yellow-600 hover:bg-yellow-500 rounded flex items-center justify-center transition"
                            >
                                <PencilIcon className="w-5 h-5 text-white" />
                            </button>

                            <button
                                onClick={handleDownload}
                                className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded flex items-center justify-center transition"
                            >
                                <ArrowDownIcon className="w-5 h-5 text-white" />
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="w-8 h-8 bg-red-600 hover:bg-red-500 rounded flex items-center justify-center transition disabled:opacity-50"
                            >
                                {isDeleting ? "..." : <TrashIcon className="w-5 h-5 text-white" />}
                            </button>
                        </div>
                    </div>

                    {image.tags && (
                        <div className="flex flex-wrap gap-2">
                            {image.tags.split(',').map(tag => (
                                <span
                                    key={tag}
                                    className="bg-gray-700 text-xs px-2 py-1 rounded-full"
                                >
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between text-sm text-gray-400">
                        <p>{`Formato: ${image.extension}`}</p>
                        <p>{`Tamanho: ${formatBytes(image.size)}`}</p>
                    </div>

                    <div className="text-sm text-gray-500 space-y-1">
                        <div>Criado em: {formatDateTime(image.uploadDate)}</div>
                        {image.updatedAt && (
                            <div>Editado em: {formatDateTime(image.updatedAt)}</div>
                        )}
                    </div>

                </div>
            </div>

            <Lightbox
                image={image.url}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            {isEditing && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-xl w-96 space-y-4">
                        <h2 className="text-lg font-semibold text-white">
                            Editar imagem
                        </h2>

                        <input
                            className="w-full p-2 rounded bg-gray-800 text-white"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            placeholder="Nome" />

                        <input
                            className="w-full p-2 rounded bg-gray-800 text-white"
                            value={editTags}
                            onChange={(e) => setEditTags(e.target.value)}
                            placeholder="Tags separadas por vírgula" />

                        <div className="flex justify-end gap-2">
                            <button
                                className="px-3 py-1 bg-gray-600 rounded"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                className="px-3 py-1 bg-green-600 rounded"
                                onClick={handleUpdate}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function formatBytes(bytes: number = 0, decimals = 2) {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function formatDateTime(dateTime?: string) {
    if (!dateTime) return ''
    const date = new Date(dateTime)
    return date.toLocaleString('pt-BR')
}
