import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export function useModalScript(fn) {

    const {isSubmitting, handleSubmit} = useForm({
        initialValues : {
            status : 'active'
        }
    })
    const {value:name, errorMessage : nMessage, handleBlur : nBlur} = useField(
        'name',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите ваше имя')
            .min(3, 'Минимальная длина букв 3')
    );
    const {value:phone, errorMessage : pMessage, handleBlur : pBlur} = useField(
        'phone',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите ваш телефон')
    );
    const {value:cash, errorMessage : cMessage, handleBlur : cBlur} = useField(
        'cash',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите вашу сумму')
    );
    const {value : status} = useField(
        'status'
    )
    const onCreate = handleSubmit(fn)
    return  {
        isSubmitting,
        name,
        nMessage,
        nBlur,
        phone,
        pMessage,
        pBlur,
        cash,
        cMessage,
        cBlur,
        onCreate,
        status
    }
}