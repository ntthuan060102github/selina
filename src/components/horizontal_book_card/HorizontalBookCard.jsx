import "./horizontal_book_card.css"

export default function HorizontalBookCard({set_has_tokens, book_data}) {

    return <div className="horizontal-book-card">
        <div className="horizontal-book-card__sub-area">
            <div className="horizontal-book-card__shop-avt-area">
                <img src={book_data.seller_info.avatar_url || "/images/default_avt.png"} className="horizontal-book-card__shop-avt-img" />
            </div>
            <div className="horizontal-book-card__shop-name">
                Trong Thuan
            </div>
        </div>
        <div className="horizontal-book-card__sub-area">
            <div className="horizontal-book-card__book-area">
                <div className="horizontal-book-card__book-img-area">
                    <img src={book_data.image} alt="" className="horizontal-book-card__book-img" />
                </div>
                <div className="horizontal-book-card__book-info">
                    <div className="horizontal-book-card__book-info-item horizontal-book-card__book-info-item--font-large">
                        <b>{book_data.name}</b>
                    </div>
                    <div className="horizontal-book-card__book-info-item">
                        <b>Tác giả</b>: {book_data.author}
                    </div>
                    <div className="horizontal-book-card__book-info-item">
                        <b>Tóm tắt</b>: {book_data.desc}
                    </div>
                    <div className="horizontal-book-card__book-info-item">
                        <b>Giá</b>: {book_data.price} đ
                    </div>
                </div>
            </div>
        </div>
        <div className="horizontal-book-card__sub-area">
            <div className="horizontal-book-card__buttons">
                <div className="horizontal-book-card__button horizontal-book-card__approve-btn">
                    <div className="horizontal-book-card__button-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="11.25" stroke="white"/>
                            <path d="M7 12L10.75 15.75L17 8.25" stroke="white"/>
                        </svg>
                    </div>
                    <div className="horizontal-book-card__button-label">
                        Phê duyệt
                    </div>
                </div>
                <div className="horizontal-book-card__button horizontal-book-card__reject-btn">
                    <div className="horizontal-book-card__button-icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 0.5L0.5 15.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M0.5 0.5L15.5 15.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className="horizontal-book-card__button-label">
                        Từ chối
                    </div>
                </div>
            </div>
        </div>
    </div>
}