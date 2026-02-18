import * as Yup from 'yup'

export interface LoginForm {
    name: string;
    email: string;
    password: string;
    passwordMatch: string;
}

export const validationScheme = Yup.object().shape({
    email: Yup.string().trim().required('Email é obrigatório!').email('Email inválido!'),
    password: Yup.string().required('Senha é obrigatório!').min(8, 'Senha precisa ter no mínimo 8 caracteres!'),
    passwordMatch: Yup.string().oneOf([Yup.ref('password')], 'A senhas deve ser iguais')
})

export const formScheme: LoginForm = { email: '', name: '', password: '', passwordMatch: '' }