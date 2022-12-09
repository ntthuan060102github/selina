import "./book_card.css"

export default function BookCard({book}) {

    return (
        <div className="book-card">
            <div className="book-card__img-area">
                <img src="" alt="" className="book-card__img" />
            </div>
            <div className="book-card__shortcut-info">
                <div className="book-card__book-name">
                    Nguyen Trong Thuan
                </div>
                <div className="book-card__author-name">
                    Nguyen Trong Thuan
                </div>
                <div className="book-card__price">
                    100000đ
                </div>
            </div>
        </div>
    )
}