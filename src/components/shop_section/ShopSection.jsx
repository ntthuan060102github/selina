import "./shop_section.css"
import ShopTag from "../shop_tag/ShopTag"
import CartItem from "../cart_item/CartItem"

export default function ShopSection() {
    return (
        <div className="shop-section">
            <div className="shop-section__selector">
                <input type="radio" name="shop-selector" className="shop-section__selector-checkbox" />
                <ShopTag/>
            </div>
            <CartItem/>
            <CartItem/>
        </div>
    )
}