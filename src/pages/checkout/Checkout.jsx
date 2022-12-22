import CheckoutBody from "../../components/checkout_body/CheckoutBody"
import MainLayout from "../../components/main_layout/MainLayout"

export default function Checkout({ set_has_token }) {

    return (
        <MainLayout body={<CheckoutBody set_has_token={set_has_token}/>}/>
    )
}