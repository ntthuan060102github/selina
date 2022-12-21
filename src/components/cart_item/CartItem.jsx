import "./cart_item.css"
import { useState, useEffect } from "react"

export default function CartItem({ book_data }) {
    const price = book_data?.price
    const [quantity, set_quantity] = useState(book_data?.quantity)
    const [total, set_total] = useState(book_data?.total_price)

    const quantity_decrement_handler = () => {
        if (quantity <= 1) return
        set_quantity(quantity - 1)
        return
    }

    const quantity_increment_handler = () => {
        set_quantity(quantity + 1)
        return
    }

    useEffect(() => {
        set_total(price * quantity)
    }, [quantity])

    return (
        <div className="cart-item">
            <div className="cart-item__group">
                <div className="cart-item__img">
                    <img src={book_data?.image} alt="" />
                </div>
                <div className="cart-item__details">
                    <h4 className="cart-item__name">{book_data?.name}</h4>
                    <div className="cart-item__description">{book_data?.desc}</div>
                </div>
            </div>
            <div className="cart-item__group">
                <div className="cart-item__price">
                    <p><b>Giá</b></p>
                    <p>{price}đ</p>
                </div>
                <div className="cart-item__quantity">
                    <p><b>Số lượng</b></p>
                    <div className="cart-item__quantity-controller">
                        <span className="quantity-controller--decrement" onClick={quantity_decrement_handler}>&lt;</span>
                        <span>{quantity}</span>
                        <span className="quantity-controller--increment" onClick={quantity_increment_handler}>&gt;</span>
                    </div>
                </div>
                <div className="cart-item__total">
                    <p><b>Tổng cộng</b></p>
                    <p>{total}đ</p>
                </div>
            </div>     
        </div>
    )
}