import "./book_card.css"

export default function BookCard({book}) {

    return (
        <div className="book-card">
            <div className="book-card__img-area">
                <img src={book?.image} alt="" className="book-card__img" />
            </div>
            <div className="book-card__shortcut-info">
                <div className="book-card__info book-card__book-name">
                    <b>{book?.name}</b>
                </div>
                <div className="book-card__info book-card__desc">
                    Nguyen Trong Thuan
                </div>
                <div className="book-card__info book-card__price">
                    {book?.price}đ
                </div>
            </div>
        </div>
    )
}