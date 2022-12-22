import MainLayout from "../../components/main_layout/MainLayout"
import HomeBody from "../../components/home_body/HomeBody"

export default function Home({set_has_token, owner_role}) {

    return (
        <MainLayout body={<HomeBody set_has_token={set_has_token} owner_role={owner_role}/>}/>
    )
}