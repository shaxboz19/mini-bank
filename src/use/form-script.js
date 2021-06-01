import * as yup from 'yup'
import {useField, useForm } from 'vee-validate'
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useFormScript() {
    const store = useStore();
    const router = useRouter();
        const {handleSubmit, isSubmitting, submitCount} = useForm();
        const {value : email, errorMessage : eError, handleBlur : eBlur} = useField(
         'email',
            yup
                .string()
                .trim()
                .required('Пожалуйста введите email')
                .email('Введите корректный email')
        );
        const {value : password, errorMessage : pError, handleBlur : pBlur} = useField(
         'password',
            yup
                .string()
                .trim()
                .required('Пожалуйста введите пароль')
                .min(6, 'Минимальная количство символов 6')
        );
        const onSubmit = handleSubmit(async values => {
             console.log('form :', values);
             try {
                await store.dispatch('auth/login', values)
                router.push('/')
            } catch(e) {
                console.log(e);
            }
           

            
        } );
        const isTooManyAttempts= computed(()=>{
           return submitCount.value >= 3;
        });

        watch(isTooManyAttempts, val => {
            if(val) {
                setTimeout(() => {
                    submitCount.value = 0;
                }, 1500);
            }
        })

        return {
            email,
            eError,
            eBlur,
            password,
            pError,
            pBlur,
            onSubmit,
            isSubmitting,
            isTooManyAttempts
        }        
    
    }