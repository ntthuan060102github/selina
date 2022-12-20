import { useRef, useState, useEffect } from "react"
import "./product_form.css"
import axios from "axios"
import { APP_ENV } from "../../configs/app_config"
import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"
import { useNavigate } from "react-router-dom"

export default function ProductForm({set_open, set_has_token, book_data}) {
    const [preview_image, set_preview_image] = useState(null)
    const [form_message, set_form_message] = useState("")
    const [message_status, set_message_status] = useState(false)
    const [seller_submit_add_btn, set_seller_submit_add_btn] = useState(!Boolean(book_data))
    const [seller_cancel_add_btn, set_seller_cancel_add_btn] = useState(!Boolean(book_data))
    const [seller_submit_modify_btn, set_seller_submit_modify_btn] = useState(Boolean(book_data))
    const [seller_delete_btn, set_seller_delete_btn] = useState(Boolean(book_data))

    const name_dom = useRef()
    const author_dom = useRef()
    const desc_dom = useRef()
    const stock_dom = useRef()
    const price_dom = useRef()
    const preview_img_dom = useRef()
    const navigate = useNavigate()

    const preview_image_handler = (e) => {
        set_preview_image(e.target.files[0])
        preview_img_dom.current.src = URL.createObjectURL(e.target.files[0])
    }
    const submit_post_handler = async (e) => {
        const form_data = new FormData()

        const name = name_dom?.current?.value
        const author = author_dom?.current?.value
        const desc = desc_dom?.current?.value
        const stock = stock_dom?.current?.value
        const price = price_dom?.current?.value

        if (!stock || Number.isNaN(stock) || !Number.isInteger(Number(stock))) {
            set_form_message("Stock la so nguyen")
            return
        }
        if (!price || Number.isNaN(price) || !Number.isInteger(Number(price))) {
            set_form_message("Price la so nguyen")
            return
        }
        
        form_data.append("name", name)
        form_data.append("author", author)
        form_data.append("desc", desc)
        form_data.append("price", parseInt(price))
        form_data.append("quantity", parseInt(stock))

        if (preview_image) {
            form_data.append("image", preview_image)
        }

        const post_res = await axios.post(
            `${SELINA_API_SERVICE_INFOS.bookshelves[APP_ENV].domain}/add-new-product`,
            form_data,
            {
                headers: {
                    Authorization: localStorage.getItem("access_token")
                }
            }
        ).then((response) => {
            if (response?.data?.status_code?.toString() === '2') {
                localStorage.removeItem("access_token")
                set_has_token(false)
                return navigate("/authorization")
            }
            return response
        })
        
        if (post_res?.data?.status_code?.toString() !== '1') {
            set_form_message("Lỗi hệ thống!")
            return
        }
        else {
            set_message_status(true)
            set_form_message("Thành công!")
            return
        }
    }

    const submit_modify_handler = async (e) => {
        const form_data = new FormData()

        const name = name_dom?.current?.value
        const author = author_dom?.current?.value
        const desc = desc_dom?.current?.value
        const stock = stock_dom?.current?.value
        const price = price_dom?.current?.value

        if (!stock || Number.isNaN(stock) || !Number.isInteger(Number(stock))) {
            set_form_message("Stock la so nguyen")
            return
        }
        if (!price || Number.isNaN(price) || !Number.isInteger(Number(price))) {
            set_form_message("Price la so nguyen")
            return
        }
        
        form_data.append("name", name)
        form_data.append("author", author)
        form_data.append("desc", desc)
        form_data.append("price", parseInt(price))
        form_data.append("quantity", parseInt(stock))
        form_data.append("book_id", parseInt(book_data.product_id))

        if (preview_image) {
            form_data.append("image", preview_image)
        }

        const post_res = await axios.post(
            `${SELINA_API_SERVICE_INFOS.bookshelves[APP_ENV].domain}/modify-product-info`,
            form_data,
            {
                headers: {
                    Authorization: localStorage.getItem("access_token")
                }
            }
        ).then((response) => {
            if (response?.data?.status_code?.toString() === '2') {
                localStorage.removeItem("access_token")
                set_has_token(false)
                return navigate("/authorization")
            }
            return response
        })
        
        if (post_res?.data?.status_code?.toString() !== '1') {
            set_form_message("Lỗi hệ thống!")
            return
        }
        else {
            set_message_status(true)
            set_form_message("Thành công!")
            return
        }
    }
    
    const remove_product_handler = async (e) => {
        const remove_res = await axios.post(
            `${SELINA_API_SERVICE_INFOS.bookshelves[APP_ENV].domain}/remove-product`,
            {
                book_id: book_data.product_id
            },
            {
                headers: {
                    authorization: localStorage.getItem("access_token")
                }
            }
        ).then((response) => {
            if (response?.data?.status_code?.toString() === '2') {
                localStorage.removeItem("access_token")
                set_has_token(false)
                return navigate("/authorization")
            }
            return response
        })
        if (remove_res.data.status_code.toString() === "1") {
            return navigate("/")
        }
    }

    useEffect(() => {
        if (Boolean(book_data)) {
            name_dom.current.value = book_data?.name
            author_dom.current.value = book_data?.author || ""
            desc_dom.current.value = book_data?.desc
            stock_dom.current.value = book_data?.quantity
            price_dom.current.value = book_data?.price
            preview_img_dom.current.src = book_data?.image
        }
    }, [])

    return (
        <div className="product-form">
            <div className="product-form__image-area">
                <label className="product-form__image-btn">
                    <input 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        onChange={preview_image_handler}
                        className="product-form__image-input" 
                    />
                    Chọn hình
                </label>
                <div className="product-form__preview-img-wrapper">
                    <img 
                        className="product-form__preview-img" 
                        ref={preview_img_dom}
                    />
                </div>
            </div>
            <div className="product-form__info-area">
                <div className="product-form__info-item">
                    <label
                        htmlFor="product-form__info-item-input-name"
                        className="product-form__info-item-label"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        className="product-form__info-item-input"
                        id="product-form__info-item-input-name"
                        ref={name_dom}
                    />
                </div>
                <div className="product-form__info-item">
                    <label
                        htmlFor="product-form__info-item-input-author"
                        className="product-form__info-item-label"
                    >
                        Author
                    </label>
                    <input
                        type="text"
                        className="product-form__info-item-input"
                        id="product-form__info-item-input-author"
                        ref={author_dom}
                    />
                </div>
                <div className="product-form__info-item product-form__info-item--flex-column">
                    <label
                        htmlFor="product-form__info-item-input-desc"
                        className="product-form__info-item-label"
                    >
                        Description
                    </label>
                    <textarea 
                        id="product-form__info-item-input-desc" 
                        rows="10" 
                        cols="50"
                        className="product-form__info-item-input"
                        ref={desc_dom}
                    >
                    </textarea>
                </div>
                <div className="product-form__info-item">
                    <label
                        htmlFor="product-form__info-item-input-stock"
                        className="product-form__info-item-label"
                    >
                        Stock
                    </label>
                    <input
                        type="text"
                        className="product-form__info-item-input"
                        id="product-form__info-item-input-stock"
                        ref={stock_dom}
                    />
                </div>
                <div className="product-form__info-item">
                    <label
                        htmlFor="product-form__info-item-input-price"
                        className="product-form__info-item-label"
                    >
                        Price
                    </label>
                    <input
                        type="text"
                        className="product-form__info-item-input"
                        id="product-form__info-item-input-price"
                        ref={price_dom}
                    />
                </div>
                <div className="product-form__info-item product-form__info-item--message">
                    <div className={!message_status ? "product-form__message" : "product-form__message product-form__message--success"}>
                        {form_message}
                    </div>
                </div>
                <div 
                    className={
                        form_message
                        ? "product-form__info-item product-form__info-item--set-btn-has-mess"
                        : "product-form__info-item product-form__info-item--set-btn"
                    }
                >
                    <div 
                        className="product-form__btn product-form__btn--submit" 
                        onClick={
                            seller_submit_add_btn 
                            ? submit_post_handler
                            : (
                                seller_submit_modify_btn 
                                ? submit_modify_handler
                                : (e) => console.log(e)
                            )
                        }
                    >
                        <div className="product-form__btn-icon">
                            <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect 
                                    width="30" 
                                    height="30" 
                                    className="product-form__btn-rect-tag--submit"
                                />
                                <circle cx="15" cy="15" r="11.25" stroke="white"/>
                                <path d="M10 15L13.75 18.75L20 11.25" stroke="white"/>
                            </svg>
                        </div>  
                        <div className="product-form__btn-label">
                            Xác nhận
                        </div>
                    </div>
                    <div 
                        className="product-form__btn product-form__btn--cancel" 
                        onClick={
                            seller_cancel_add_btn 
                            ? () => set_open(false)
                            : (
                                seller_delete_btn
                                ? remove_product_handler
                                : () => console.log("delete")
                            )
                        }
                    > 
                        {
                            seller_cancel_add_btn
                            ? (
                                <>
                                    <div className="product-form__btn-icon">
                                        <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect 
                                                width="30" 
                                                height="30" 
                                                className="product-form__btn-rect-tag--cancel"
                                            />
                                            <path d="M22.5 7.5L7.5 22.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M7.5 7.5L22.5 22.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="product-form__btn-label">Hủy bỏ</div>
                                </>
                            )
                            : (
                                seller_delete_btn 
                                ? (
                                    <>
                                        <div className="product-form__btn-icon">
                                            <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect 
                                                    width="30" 
                                                    height="30" 
                                                    className="product-form__btn-rect-tag--cancel"
                                                />
                                                <path d="M22.5 7.5L7.5 22.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7.5 7.5L22.5 22.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className="product-form__btn-label">Xóa sản phẩm</div>
                                    </>
                                )
                                : <></>
                            )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}