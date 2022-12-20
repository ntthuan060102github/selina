import "./shop_tag.css"

export default function ShopTag({user}) {

    return (
        <div className="shop-tag">
            <div className="shop-tag__wrapper">
                <img 
                    src={user?.avatar_url || "/images/default_avt.png"}
                    alt="" 
                    className="shop-tag__avatar" 
                />
                <div className="shop-tag__name">
                    Trong Thuan
                </div>
            </div>
        </div>
    )
}