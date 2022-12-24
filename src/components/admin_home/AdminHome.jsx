import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"
import { APP_ENV } from "../../configs/app_config"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import UserCard from "../user_card/UserCard"
import "./admin_home.css"

export default function AdminHome({set_has_token}) {
    const [users, set_users] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const get_data = async () => {
            const response = await axios.get(
                `${SELINA_API_SERVICE_INFOS.profile[APP_ENV].domain}/get-all-users`,
                {
                    headers: {
                        authorization: localStorage.getItem("access_token")
                    }
                }
            ).then((response) => {
                if (response?.data?.status_code?.toString() === '2') {
                    localStorage.removeItem("access_token")
                    set_has_token(false)
                    return navigate("/authorization")
                }
                return response
            })
            const users = response.data.data
            set_users(users)
        }
        get_data()
    }, [])

    return (
        <div className="admin-home">
            {
                users.map((user, idx) => <UserCard key={idx} set_has_token={set_has_token} user_data={user}/>)
            }
        </div>
    )
}