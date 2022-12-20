import "./home_body.css"
import ProductGrid from "../product_grid/ProductGrid"
import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"
import { APP_ENV } from "../../configs/app_config"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import AddProductPopup from "../add_product_popup/AddProductPopup"
import ShopTag from "../shop_tag/ShopTag"

export default function HomeBody({set_has_token}) {
    const [active_categories_nav, set_active_categories_nav] = useState(false)
    const [active_banner, set_active_banner] = useState(false)
    const [active_shop_label, set_active_shop_label] = useState(false)
    const [active_add_product_btn, set_active_add_product_btn] = useState(false)
    const [user_data, set_user_data] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const get_my_info = async () => {
            const response = await axios.get(
                `${SELINA_API_SERVICE_INFOS.auth[APP_ENV].domain}\\ping`,
                {
                    headers: {
                        Authorization: localStorage.getItem("access_token")
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

            const user_role = response?.data?.role
            const user_data = response?.data?.data
            
            set_user_data(user_data)
            set_active_categories_nav(user_role === "normal_user")
            set_active_banner(user_role === "normal_user")
            set_active_shop_label(user_role === "seller")
            set_active_add_product_btn(user_role === "seller")
        }
        get_my_info()
    }, [])

    return (
        <div className="home-body">
            {
                active_banner 
                ? 
                <div className="home-body__main-banner">
                    <img 
                        src="https://minhduongads.com/wp-content/uploads/2019/03/truyen-thong-minh-duong.jpg" 
                        alt="" 
                        className="home-body__main-banner-img" 
                    />
                </div>
                : <></>
            }
            {
                active_categories_nav
                ?
                <div className="home-body__categories-nav">
                    <div className="home-body__categories-nav-title">
                        Danh mục sản phẩm
                    </div>
                    <ul className="home-body__categories-nav-list">
                        <li className="home-body__categories-nav-item">
                            <Link to="/search" className="home-body__categories-nav-item-link">
                                Thuan123
                            </Link>
                        </li>
                        <li className="home-body__categories-nav-item">
                            <a href="#" className="home-body__categories-nav-item-link">
                                Thuan123
                            </a>
                        </li>
                        <li className="home-body__categories-nav-item active">
                            <a href="#" className="home-body__categories-nav-item-link">
                                Thuan123
                            </a>
                        </li>
                        <li className="home-body__categories-nav-item">
                            <a href="#" className="home-body__categories-nav-item-link">
                                Thuan123
                            </a>
                        </li>
                        <li className="home-body__categories-nav-item">
                            <a href="#" className="home-body__categories-nav-item-link">
                                Thuan123
                            </a>
                        </li>
                    </ul>
                </div>
                : <></>
            }
            <div className="home-body__seller-area">
                {
                    active_shop_label
                    ? <ShopTag user={user_data}/>
                    : <></>
                }
                {
                    active_add_product_btn
                    ? <div className="home-body__add-product-area-wrapper">
                        <AddProductPopup className="home-body__add-product-area" set_has_token={set_has_token}/>   
                    </div>
                    : <></>
                }
            </div>
            <div className="home-body__main-area">
                <ProductGrid 
                    api={
                        `${SELINA_API_SERVICE_INFOS.bookshelves[APP_ENV].domain}/get-products-at-home?`
                    }
                    set_has_token={set_has_token}
                />
            </div>
        </div>
    )
}