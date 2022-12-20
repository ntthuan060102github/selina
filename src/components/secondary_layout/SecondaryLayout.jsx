import "./secondary_layout.css"
import TopBar from "../topbar/Topbar"
import axios from "axios"
import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"
import { APP_ENV } from "../../configs/app_config"
import { useNavigate } from "react-router-dom"

export default function SecondaryLayout({set_has_token, nav, body}) {
    const navigation = useNavigate()
    const logout_handler = async () => {
        const logout_res = await axios.get(
            `${SELINA_API_SERVICE_INFOS.auth[APP_ENV].domain}/logout`,
            {
                headers: {
                    authorization: localStorage.getItem("access_token")
                }
            }
        )
        if (logout_res.data.status_code.toString() === "1") {
            set_has_token(false)
            navigation("/authorization")
        }
    }
    
    return (
        <div className="secondary-layout">
            <TopBar/>
            <div className="secondary-layout__wrapper">
                <div className="secondary-layout__sub-area">
                    <div className="secondary-layout__sub-area-wrapper">
                        <div className="secondary-layout__sub-area-row">
                            <div className="secondary-layout___user-avt">
                                <img src="/images/default_avt.png" className="secondary-layout___user-avt-img" />
                            </div>
                            <div className="secondary-layout___user-name">
                                Nguyen Trong Thuan
                            </div>
                        </div>
                        <div className="secondary-layout__sub-area-row">
                            {nav}
                        </div>
                        <div className="secondary-layout__sub-area-row">
                            <div className="secondary-layout__logout-btn" onClick={logout_handler}>
                                Đăng xuất
                            </div>
                        </div>
                    </div>
                </div>
                <div className="secondary-layout__sub-area">
                    <div className="secondary-layout__body">
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}   