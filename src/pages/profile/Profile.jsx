import SecondaryLayout from "../../components/secondary_layout/SecondaryLayout";
import ProfileForm from "../../components/profile_form/ProfileForm";

export default function Profile({set_has_token}) {
    return (
        <SecondaryLayout body={<ProfileForm/>} set_has_token={set_has_token}/>
    )
}