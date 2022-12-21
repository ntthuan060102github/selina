import "./order_info_card.css"

export default function OrderInfoCard() {
    
    return (
        <div className="order-info-cart">
            <div className="order-info-cart__row">
                <div className="order-info-cart__shop-name">
                    Nguyen Trong Thuan
                </div>
            </div>
            <div className="order-info-cart__row">
                
            </div>
            <div className="order-info-cart__row">
                <div className="order-info-cart__order-status">
                    <div className="order-info-cart__order-status-label"></div>
                    <div className="order-info-cart__order-status-result"></div>
                </div>
                <div className="order-info-cart__order-price">
                    Tổng cộng: 
                    <div className="order-info-cart__order-price-num">
                        20000
                    </div>
                    đ
                </div>
            </div>
            <div className="order-info-cart__row">
                
            </div>
        </div>
    )
}