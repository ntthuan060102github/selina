import SELINA_API_SERVICE_INFOS from "../../configs/selina_service_infos"
import { APP_ENV } from "../../configs/app_config"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Pagination } from "@mui/material"
import HorizontalBookCard from "../horizontal_book_card/HorizontalBookCard"
import "./seller_requirements_body.css"

export default function SellerRequirementsBody({set_has_token}) {
    const navigate = useNavigate()
    const [books, set_books] = useState([])
    const [curr_page, set_curr_page] = useState(1)
    const [num_pages, set_num_pages] = useState(1)

    const click_pagination_bar = function(e, page) {
        set_curr_page(page)
    }

    useEffect(() => {
        const get_data = async () => {
            const response = await axios.get(
                `${SELINA_API_SERVICE_INFOS.bookshelves[APP_ENV].domain}/get-pending-books?page=${curr_page}`,
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
            const books_data = response.data.data.books
            set_books(books_data)
            set_num_pages(response.data.data.pages)
        }
        get_data()
    }, [curr_page])

    return (
        <div className="seller-requirements-body">
            <div className="seller-requirements-body__books">
                {
                    books.map((book, idx) => <HorizontalBookCard key={idx} set_has_token={set_has_token} book_data={book}/>)
                }
            </div>
            <div className="seller-requirements-body__pagination">
                <Pagination 
                    count={num_pages} 
                    variant="outlined"
                    onChange={click_pagination_bar}
                />
            </div>
        </div>
    )
}