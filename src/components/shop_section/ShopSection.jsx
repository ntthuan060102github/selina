import "./shop_section.css"
import ShopTag from "../shop_tag/ShopTag"
import CartItem from "../cart_item/CartItem"
import { useState, useEffect } from "react"

export default function ShopSection({ shop_data, set_total_price, set_shop_group_id }) {
    const [seller_tag, set_seller_tag] = useState({})
    const [books, set_books] = useState([])

    useEffect(() => {
        const seller = {
            avatar_url: shop_data?.seller_avt,
            full_name: shop_data?.seller_name
        }
        set_seller_tag(seller)
        set_books(shop_data?.books)
    }, [])
    
    const check_handle = (e) => {
        set_total_price(shop_data?.total_price)
        set_shop_group_id(shop_data?.group_id)
    }

    return (
        <div className="shop-section">
            <div className="shop-section__selector">
                <input type="radio" name="shop-selector" className="shop-section__selector-checkbox" onChange={check_handle}/>
                <ShopTag user={seller_tag}/>
            </div>
            {
                books.map(book => <CartItem book_data={book} key={book.book_id}/>)
            } 
        </div>
    )
}