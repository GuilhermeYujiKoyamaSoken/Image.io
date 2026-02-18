import * as Yup from 'yup'

export interface FormProps {
    name: string;
    tags: string;
    file: string | Blob;
}

export const formScheme: FormProps = { name: '', tags: '', file: '' }

export const formValidationScheme = Yup.object().shape({
    name: Yup.string().trim()
            .required('Nome é obrigatório!')
            .max(50, 'Nome tem um limite de 50 caracteres!'),
    tags: Yup.string().trim()
            .required('Tags é obrigatório!')
            .max(50, 'Tags têm um limite de 50 caracteres!'),
    file: Yup.mixed<Blob>()
            .required('selecione uma imagem para upload!')
            .test('size', 'Arquivos não podem ser maiores do que 20 MB!', (file) => {
                return file.size < 20000000;
            })
            .test('type', 'Formatos aceitos: jpeg, giff or png', (file) => {
                return file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
            })
})