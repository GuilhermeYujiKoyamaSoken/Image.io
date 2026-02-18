'use client'

import { Template, RenderIf, InputText, Button, FieldError, useNotification } from '@/components'

import { useState, useEffect } from 'react'
import { LoginForm, formScheme, validationScheme } from './formScheme'
import { useFormik } from 'formik'
import { useAuth } from '@/resources'
import { useRouter } from 'next/navigation'
import { AccessToken, Credentials, User } from '@/resources/user/user.resources'

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false)
    const [newUserState, setNewUserState] = useState<boolean>(false)

    const auth = useAuth()
    const notification = useNotification()
    const router = useRouter()


    useEffect(() => {
        if (auth.isSessionValid()) {
            router.replace('/galeria')
        }
    }, [])

    const { values, handleChange, handleSubmit, errors, resetForm } =
        useFormik<LoginForm>({
            initialValues: formScheme,
            validationSchema: validationScheme,
            onSubmit: onSubmit
        })

    async function onSubmit(values: LoginForm) {
        setLoading(true)

        try {
            if (!newUserState) {

                const credentials: Credentials = {
                    email: values.email,
                    password: values.password
                }

                const accessToken: AccessToken =
                    await auth.authenticate(credentials)

                auth.initSession(accessToken)

                router.push("/galeria")

            } else {

                const user: User = {
                    email: values.email,
                    name: values.name,
                    password: values.password
                }

                await auth.save(user)

                notification.notify(
                    "Usuário criado com sucesso!",
                    "success"
                )

                resetForm()
                setNewUserState(false)
            }

        } catch (error: any) {

            const message =
                error?.message || "Erro inesperado"

            notification.notify(message, "error")

        } finally {
            setLoading(false)
        }
    }

    return (
        <Template loading={loading}>
            <div className="flex min-h-[80vh] items-center justify-center">

                <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            {newUserState
                                ? 'Criar Conta'
                                : 'Bem-vindo de volta'}
                        </h2>

                        <p className="text-gray-400 text-sm mt-2">
                            {newUserState
                                ? 'Preencha os dados para criar sua conta'
                                : 'Entre para acessar sua galeria'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    Nome
                                </label>
                                <InputText
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <FieldError error={errors.name} />
                            </div>
                        </RenderIf>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Email
                            </label>
                            <InputText
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                            <FieldError error={errors.email} />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-1">
                                Senha
                            </label>
                            <InputText
                                    id="password"
                                    type='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                            <FieldError error={errors.password} />
                        </div>

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    Confirmar senha
                                </label>
                                <InputText
                                    id="passwordMatch"
                                    type="password"
                                    value={values.passwordMatch}
                                    onChange={handleChange}
                                    error={errors.passwordMatch}
                                />
                                <FieldError error={errors.passwordMatch} />
                            </div>
                        </RenderIf>

                        <div className="pt-4">

                            <RenderIf condition={!newUserState}>
                                <Button
                                    type="submit"
                                    label="Entrar"
                                    style="w-full bg-blue-600 hover:bg-blue-500 transition duration-200 rounded-lg py-2 font-semibold"
                                />

                                <button
                                    type="button"
                                    onClick={() => setNewUserState(true)}
                                    className="w-full mt-3 text-sm text-gray-400 hover:text-white transition"
                                >
                                    Não tem conta? Criar agora
                                </button>
                            </RenderIf>

                            <RenderIf condition={newUserState}>
                                <Button
                                    type="submit"
                                    label="Criar Conta"
                                    style="w-full bg-green-600 hover:bg-green-500 transition duration-200 rounded-lg py-2 font-semibold"
                                />

                                <button
                                    type="button"
                                    onClick={() => setNewUserState(false)}
                                    className="w-full mt-3 text-sm text-gray-400 hover:text-white transition"
                                >
                                    Já possui conta? Entrar
                                </button>
                            </RenderIf>

                        </div>
                    </form>

                </div>
            </div>
        </Template>
    )
}
