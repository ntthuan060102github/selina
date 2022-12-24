import { useState } from "react"
import "./user_card.css"

export default function UserCard({user_data}) {
    const [hidden, set_hidden] = useState(false)

    return (
        <>
            {
                !hidden 
                ? <div className="user-card">
                    <div className="user-card__sub-area user-card__sub-area-top">
                        <div className="user-card__username">
                            <b>{user_data.email}</b>
                        </div>
                    </div>
                    <div className="user-card__sub-area user-card__sub-area-mid">
                        <div className="user-card__user-infos">
                            <div className="user-card__avt-area">
                                <img src={user_data.avatar_url || "/images/default_avt.png"} className="user-card__avt" />
                            </div>
                            <div className="user-card__user-info">
                                <div className="user-card__user-name">
                                    <b>Họ tên</b>: {user_data.full_name}
                                </div>
                                <div className="user-card__user-genre">
                                    <b>Giới tính</b>: {user_data.genre ? "Nam" : "Nữ"}
                                </div>
                                <div className="user-card__user-phone">
                                    <b>Số điện thoại</b>: {user_data.phone_num}
                                </div>
                                <div className="user-card__user-address">
                                    <b>Địa chỉ</b>: {user_data.address}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-card__sub-area user-card__sub-area-bot">

                    </div>
                </div>
                : <></>
            } 
        </>
    )
}