'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import Link from 'next/link'

import { InputText, Button, useNotification, FieldError, AuthenticatedPage } from '@/components'
import { Template, RenderIf } from '@/components/Template'
import { useImageService } from '@/resources/image/image.service'
import { FormProps, formScheme, formValidationScheme } from './formScheme'

export default function formularioPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [imagePreview, setImagePreview] = useState<string | undefined>()

    const service = useImageService()
    const notification = useNotification()

    const formik = useFormik<FormProps>({
        initialValues: formScheme,
        onSubmit: handleSubmit,
        validationSchema: formValidationScheme
    })

    async function handleSubmit(dados: FormProps) {
        setLoading(true)

        const formData = new FormData()
        formData.append('file', dados.file)
        formData.append('name', dados.name)
        formData.append('tags', dados.tags)

        await service.salvar(formData)

        formik.resetForm()
        setImagePreview(undefined)

        setLoading(false)
        notification.notify('Upload enviado com sucesso!', 'success')
    }

    function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return

        const file = e.target.files[0]
        formik.setFieldValue('file', file)
        setImagePreview(URL.createObjectURL(file))
    }

    function handleClearForm() {
        formik.resetForm()
        setImagePreview(undefined)
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="flex flex-col items-center justify-center my-5">
                    <h5 className="mt-3 mb-10 text-[30px] font-extrabold tracking-tight text-white">
                        Nova imagem
                    </h5>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1">
                            <label className="block text-[16px] font-medium leading-6 text-white">
                                Nome: *
                            </label>

                            <InputText
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder="Digite o nome da imagem"
                            />
                            <FieldError error={formik.errors.name}></FieldError>

                        </div>

                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-[16px] font-medium leading-6 text-white">
                                Tags: *
                            </label>
                            <label className="block text-[14px] font-medium leading-6 text-white">
                                (Digite as tags separadas por vírgula)
                            </label>

                            <InputText
                                id="tags"
                                value={formik.values.tags}
                                onChange={formik.handleChange}
                                placeholder="Digite as tags"
                            />
                            <FieldError error={formik.errors.tags}></FieldError>

                        </div>

                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-[16px] font-medium leading-6 text-gray-200">
                                Imagem: *
                            </label>
                            <FieldError error={formik.errors.file}></FieldError>

                            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-500 px-6 py-10 bg-gray-800">
                                <label className="flex flex-col items-center justify-center w-full cursor-pointer">
                                    <RenderIf condition={!imagePreview}>
                                        <svg
                                            className="h-16 w-16 text-gray-400 mb-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>

                                        <span className="text-gray-400 text-sm">
                                            Clique para enviar
                                        </span>
                                    </RenderIf>

                                    <RenderIf condition={!!imagePreview}>
                                        <img
                                            src={imagePreview}
                                            width={250}
                                            className="rounded-md"
                                            alt="Preview"
                                        />
                                    </RenderIf>

                                    <input
                                        key={imagePreview}
                                        type="file"
                                        onChange={onFileUpload}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button
                                style="bg-green-500 hover:bg-green-300"
                                label="Salvar"
                                type="submit"
                            />

                            <Button
                                style="bg-gray-400 hover:bg-gray-200"
                                label="Limpar"
                                type="button"
                                onClick={handleClearForm}
                            />

                            <Link href="./galeria">
                                <Button
                                    style="bg-red-500 hover:bg-red-300"
                                    label="Cancelar"
                                    type="button"
                                />
                            </Link>
                        </div>
                    </form>
                </section>
            </Template>
        </AuthenticatedPage>
    )
}
