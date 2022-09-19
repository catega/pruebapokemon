//import {useForm} from 'react-hook-form'
import { useContext, useEffect } from 'react'
import { MainContext } from '../contexts/MainContext'
import { useNavigate } from 'react-router-dom'
import {Form, Input, Button} from 'antd'

const Register = () => {
    const { registerUser, errorRegister, isRegistered } = useContext(MainContext)
    const {Item} = Form
    //const {register, handleSubmit, formState: {errors}} = useForm()

    const navigate = useNavigate()

    const sendRegister = data => {
        registerUser(data)
    }

    useEffect(() => {
        if (isRegistered)
            navigate('/login')
    }, [isRegistered])

    return (
        <>
            <p>{errorRegister}</p>
            <Form onFinish={sendRegister} wrapperCol={{span: 8}} labelCol={{span: 8}}>
                <Item label={'Username'}
                name={'username'}
                rules={[
                    {
                        required: true,
                        message: 'Este campo es obligatorio'
                    },
                    {
                        max: 25,
                        message: 'El usuario debe tener menos de 25 carácteres'
                    },
                    {
                        min: 3,
                        message: 'El usuario debe tener más de 3 carácteres'
                    }
                ]}>
                    <Input />
                </Item>
                <Item label={'Password'}
                name={'password'}
                rules={[
                    {
                        required: true,
                        message: 'Este campo es obligatorio'
                    },
                    {
                        min: 8,
                        message: 'La contraseña debe tener más de 8 carácteres'
                    }
                ]}>
                    <Input.Password />
                </Item>
                <Item wrapperCol={{span: 23}}>
                    <Button type="primary" htmlType="submit">
                        Registrarse
                    </Button>
                </Item>
            </Form>
        </>
    )
}

/*
<form onSubmit={handleSubmit(sendRegister)}>
                <input 
                {...register('username', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 3,
                        message: 'El usuario debe tener al menos 3 carácteres'
                    },
                    maxLength: {
                        value: 25,
                        message: 'El usuario debe tener 25 carácteres como máximo'
                    }})}
                type="text" />
                <span>{errors.username?.message}</span>

                <input {...register('password', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 8,
                        message: 'La contraseña debe tener 8 carácteres como mínimo'
                    }
                })} 
                type="password" />
                <span>{errors.password?.message}</span>

                <input type="submit" value={'Registrarse'} />
            </form>
*/

export default Register