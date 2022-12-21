import "./order_body.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { APP_ENV } from "../../configs/app_config"
import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"
import OrderInfoCard from "../order_info_card/OrderInfoCard"

export default function OrderBody({set_has_token}) {
    const navigate = useNavigate()
    useEffect(() => {
        const get_orders = async () => {
            const orders_response = await axios.get(
                `${SELINA_API_SERVICE_INFOS.bookshelves[APP_ENV].domain}/get-orders`,
                {
                    headers: {
                        authorization: localStorage.getItem('access_token')
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

            const orders = orders_response.data.data
            console.log(orders)
        }
        get_orders()
    })

    return (
        <div className="order-body">

        </div>
    )
}