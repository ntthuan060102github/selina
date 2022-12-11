import "./home_body.css"
import ProductGrid from "../product_gird/ProductGird"
import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"
import { APP_ENV } from "../../configs/app_config"

export default function MainLayout(props) {
    const active_categories_nav = true //props?.role === "normal_user"
    const active_banner = true //props?.role === "normal_user"

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
                            <a href="#" className="home-body__categories-nav-item-link">
                                Thuan123
                            </a>
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
            <div className="home-body__main-area">
                <ProductGrid 
                    api={
                        `${SELINA_API_SERVICE_INFOS.bookshelves[APP_ENV].domain}`
                    }
                />
            </div>
        </div>
    )
}