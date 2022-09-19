import { Outlet, Link } from "react-router-dom"
import {Layout, Menu} from 'antd'
import { useContext } from "react"
import { MainContext } from "../contexts/MainContext"

const Base = () => {
    const {user} = useContext(MainContext)
    const {Header, Content} = Layout

    return (
        <Layout>
            <Header>
                <nav>
                    <ul className="menu-opts">
                        <li>
                            {user 
                            ? `Bienvenid@, ${user.username}`
                            : <Link to={'/login'}>Login</Link>
                            }
                        </li>
                        <li>
                            {!user 
                            ? <Link to={'/register'}>Register</Link>
                            : ''
                            }
                        </li>
                    </ul>
                    <ul className="menu-title">
                        <li>
                            <span className="title">Pokémon App</span>
                        </li>
                    </ul>
                </nav>
            </Header>
            <Content>
                <Outlet/>
            </Content>
        </Layout>
    )
}

export default Base