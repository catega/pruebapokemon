import { useContext, useEffect } from "react"
import { MainContext } from "../contexts/MainContext"
//import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {Form, Input, Button} from 'antd'

const Login = () => {
    const {login, errorLogin, isLogged} = useContext(MainContext)
    const {Item} = Form
    //const {register, handleSubmit, formState: {errors}} = useForm()

    const navigate = useNavigate()

    const sendLogin = data => {
        login(data)
    }

    useEffect(() => {
        if (isLogged)
            navigate('/pokemon')
    }, [isLogged])

    return (
        <>
            <p>{errorLogin}</p>
            <Form onFinish={sendLogin} wrapperCol={{span: 8}} labelCol={{span: 8}}>
                <Item label={'Username'}
                name={'username'}
                rules={[{
                    required: true,
                    message: 'Este campo es obligatorio'
                }]}>
                    <Input />
                </Item>
                <Item label={'Password'}
                name={'password'}
                rules={[{
                    required: true,
                    message: 'Este campo es obligatorio'
                }]}>
                    <Input.Password />
                </Item>
                <Item wrapperCol={{span: 23}}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Item>
            </Form>
        </>
    )
}

/*
<form onSubmit={handleSubmit(sendLogin)}>
    <input {...register('username', {required: 'Este campo es obligatorio'})} type="text" />
    <span>{errors.username?.message}</span>
    <input {...register('password', {required: 'Este campo es obligatorio'})} type="password" />
    <span>{errors.password?.message}</span>
    <input type="submit" value={'Login'}/>
</form>
*/

export default Login