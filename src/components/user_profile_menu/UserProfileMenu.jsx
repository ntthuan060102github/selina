import { Link } from "react-router-dom"

export default function UserProfileMenu({menu}) {

    return (
        <div className="user-profile-menu">
            {
                menu.forEach(m => (
                    <Link to={m.to} className="user-profile-menu__item">
                        <div className="user-profile-menu__logo">
                            {m.icon}
                        </div>
                        <div className="user-profile-menu__name">
                            {m.label}
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}