import "./book_detail_info.css"
import { useRef, useState, forwardRef } from "react"
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Button from '@mui/material/Button'

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export default function BookDetailInfo({set_has_token, book_data}) {
    const counter = useRef()
    const [open, set_open_toastify] = useState(false);

    const modify_counter_increase_handle = () => {
        let count = Number(counter.current?.value)

        counter.current.value = count + 1
    }
    const modify_counter_decrease_handle = () => {
        let count = Number(counter.current?.value)

        if (count <= 1) {
            return
        }
        counter.current.value = count - 1
    }
    const add_to_cart_handler = () => {
        set_open_toastify(true)
        
    }

    const handle_close_toastify = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        set_open_toastify(false);
    };

    return (
        <div className="book-detail-info">
            <div className="book-detail-info__sub-area">
                <div className="book-detail-info__img-area">
                    <img src={book_data?.image} alt="" className="book-detail-info__preview-img" />
                </div>
            </div>
            <div className="book-detail-info__sub-area">
                <div className="book-detail-info__info-area">
                    <div className="book-detail-info__shop-label">
                        <img src="/images/default_avt.png" alt="" className="book-detail-info__shop-img" />
                        <div className="book-detail-info__shop-name">Nguyen Trong Thuan</div>
                    </div>
                    <div className="book-detail-info__name">
                        {book_data?.name}
                    </div>
                    <div className="book-detail-info__price">
                        {book_data?.price || "---"}đ
                    </div>
                    <div className="book-detail-info__desc">
                        {book_data?.desc}
                    </div>
                    <div className="book-detail-info__quantity">
                        {book_data?.quantity || "-"} remaining
                    </div>
                    <div className="book-detail-info__take-an-order-area">
                        <div className="book-detail-info__counter">
                            <div className="book-detail-info__counter-item">
                                <div className="book-detail-info__counter-btn" onClick={modify_counter_decrease_handle}>
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.94629 1.22999L1.78462 6.39166C1.17504 7.00124 1.17504 7.99874 1.78462 8.60832L6.94629 13.77" stroke="#9E9E9E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="book-detail-info__counter-item">
                                <div className="book-detail-info__counter-wrapper">
                                    <input 
                                        type="text" 
                                        className="book-detail-info__counter-num" 
                                        ref={counter}
                                        value="1"
                                    />
                                </div>
                            </div>
                            <div className="book-detail-info__counter-item">
                                <div className="book-detail-info__counter-btn" onClick={modify_counter_increase_handle}>
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.05371 13.77L6.21538 8.60834C6.82496 7.99876 6.82496 7.00126 6.21538 6.39168L1.05371 1.23001" stroke="#9E9E9E" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="book-detail-info__submit" onClick={add_to_cart_handler}>
                            Them vao gio hang
                        </div>
                    </div>
                </div>
            </div>
            <Stack spacing={2} sx={{ width: '0' }}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handle_close_toastify}>
                    <Alert onClose={handle_close_toastify} severity="success" sx={{ width: '100%' }}>
                        Them vao gio hang thanh cong!
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}