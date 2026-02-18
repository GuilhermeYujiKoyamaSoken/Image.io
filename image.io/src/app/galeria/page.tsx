'use client'

import { ImageCard, Template, InputText, Button } from '@/components'
import { useImageService } from '@/resources'
import { Image } from '@/resources/image/image.resources'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GaleriaPage() {
    const imageService = useImageService()
    const [images, setImages] = useState<Image[]>([])
    const [query, setQuery] = useState('')
    const [extension, setExtension] = useState('')
    const [loading, setLoading] = useState(false)

    async function searchImages(queryParam: string = '', extensionParam: string = '') {
        setLoading(true)
        try {
            const result = await imageService.buscar(queryParam, extensionParam)
            setImages(result)
        } catch (error: any) {
            console.error('Erro ao buscar imagens:', error)
            setImages([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        searchImages()
    }, [])


    function handleDelete(id: string) {
        setImages(prev => prev.filter(img => img.id !== id))
    }

    const handleUpdate = (updatedImage: Image) => {
        setImages(prev =>
            prev.map(img =>
                img.id === updatedImage.id ? updatedImage : img
            )
        )
    }

    function renderImageCard(image: Image) {
        return (
            <ImageCard
                key={image.id ?? image.url}
                image={image}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
        )
    }

    return (
        <Template loading={loading}>
            <section className="flex flex-col md:flex-row md:justify-center items-center gap-4 mb-10 px-4">
                <InputText
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            searchImages(query, extension)
                        }
                    }}
                    placeholder="Pesquisar por nome ou tags"
                    className="w-full md:w-64"
                />
                <select
                    value={extension}
                    onChange={e => setExtension(e.target.value)}
                    className="border border-gray-700 bg-gray-800 text-gray-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
                >
                    <option value="">Todos os formatos</option>
                    <option value="PNG">PNG</option>
                    <option value="JPEG">JPEG</option>
                    <option value="GIF">GIF</option>
                </select>
                <Button
                    onClick={() => searchImages(query, extension)}
                    style="bg-gray-500 hover:bg-gray-300"
                    label="Pesquisar"
                />
                <Link href="/formulario">
                    <Button
                        style="bg-green-500 hover:bg-green-300"
                        label="Adicionar"
                    />
                </Link>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {images.length > 0 ? (
                    images.map(renderImageCard)
                ) : (
                    <div className="col-span-full flex justify-center items-center h-64 text-gray-400 text-lg">
                        Imagem não encontrada
                    </div>
                )}
            </section>
        </Template>
    )
}
