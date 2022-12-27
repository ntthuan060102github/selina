import "./shop_section.css"
import ShopTag from "../shop_tag/ShopTag"
import CartItem from "../cart_item/CartItem"
import { useState, useEffect, useRef } from "react"

export default function ShopSection({ shop_data, set_total_price, set_checkout_id, set_checkout_shop }) {
    const [seller_tag, set_seller_tag] = useState({})
    const [books, set_books] = useState([])
    const [shop_total_price, set_shop_total_price] = useState(0)
    const check_dom = useRef()
    console.log(shop_data)
    useEffect(() => {
        const seller = {
            avatar_url: shop_data?.seller_avt,
            full_name: shop_data?.seller_name,
            user_id: shop_data?.seller_id
        }
        set_seller_tag(seller)
        set_books(shop_data?.books)
        set_shop_total_price(shop_data?.total_price)
    }, [])

    const synchronize_total_price = () => {
        if (check_dom.current.checked) {
            set_total_price(shop_total_price)
        }
    }
    
    const check_handle = (e) => {
        set_total_price(shop_total_price)
        set_checkout_id(shop_data?.group_id)
        set_checkout_shop(shop_data)
    }

    return (
        <div className="shop-section">
            <div className="shop-section__selector">
                <input
                    type="radio"
                    name="shop-selector"
                    className="shop-section__selector-checkbox"
                    ref={check_dom}
                    onChange={check_handle}
                />
                <ShopTag user={seller_tag}/>
            </div>
            {
                books.map(book => <CartItem 
                    book_data={book}
                    key={book.book_id}
                    set_shop_total_price={set_shop_total_price}
                    synchronize_total_price={synchronize_total_price}
                />)
            } 
        </div>
    )
}