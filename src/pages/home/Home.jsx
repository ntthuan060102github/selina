import MainLayout from "../../components/main_layout/MainLayout"
import HomeBody from "../../components/home_body/HomeBody"

export default function Home() {

    return (
        <MainLayout body={<HomeBody/>}/>
    )
}