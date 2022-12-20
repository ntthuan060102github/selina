import "./cart_item.css"
import { useState, useEffect } from "react"

export default function CartItem() {
    const [quantity, set_quantity] = useState(1)
    const [price, set_price] = useState(100000)
    const [total, set_total] = useState(100000)

    const quantity_decrement_handler = () => {
        if (quantity <= 1) return
        set_quantity(quantity - 1)
    }

    const quantity_increment_handler = () => {
        set_quantity(quantity + 1)
    }

    useEffect(() => {
        set_total(price * quantity)
    }, [quantity])

    return (
        <div className="cart-item">
            <div className="cart-item__group">
                <div className="cart-item__img">
                    <img src="/images/default_avt.png" alt="" />
                </div>
                <div className="cart-item__details">
                    <h4 className="cart-item__name">Tên sách</h4>
                    <div className="cart-item__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora praesentium vel quibusdam quisquam dolor culpa autem recusandae vero ipsum? Consequatur aliquam non necessitatibus eligendi odit nulla veritatis. Praesentium, consectetur distinctio?</div>
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