import "./product_gird.css"
import BookCard from "../book_card/BookCard"
import {
    useState,
    useEffect
} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Pagination } from "@mui/material"

export default function ProductGrid({api, set_has_token}) {
    const [products, set_products] = useState([])
    const [curr_page, set_curr_page] = useState(1)
    const [num_pages, set_num_pages] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        const get_data_at_home = async () => {
            const response = await axios.get(
                `${api}/get-products-at-home?page=${curr_page.toString()}&limit=20`,
                {
                    headers: {
                        Authorization: localStorage.getItem("access_token")
                    }
                }
            ).then(response => {
                if (response?.data?.status_code?.toString() === '2') {
                    localStorage.removeItem("access_token")
                    set_has_token(false)
                    return navigate("/authorization")
                }
                return response
            })
            set_products(response?.data?.data?.docs)
            set_num_pages(response?.data?.data?.pages)
            set_curr_page(response?.data?.data?.page || 1)
        }
        get_data_at_home(api)
    }, [curr_page])

    const click_pagination_bar = function(e, page) {
        set_curr_page(page)
    }

    return (
        <div className="product-gird">
            <div className="product-gird__gird">
                {
                    products.map((product, idx) => <BookCard book={product} key={idx}/>)
                }
            </div>
            <div className="product-gird__pagination">
                <Pagination 
                    count={num_pages} 
                    variant="outlined"
                    onChange={click_pagination_bar}
                />
            </div>
        </div>
    )
}