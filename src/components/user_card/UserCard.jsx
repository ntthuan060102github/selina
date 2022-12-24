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
                        <div className="user-card__buttons">
                            {
                                user_data?.user_data !== "banned"
                                ? <div className="user-card__button user-card__ban-button">
                                <div className="user-card__button-icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.5 0.5L0.5 15.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M0.5 0.5L15.5 15.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className="user-card__button-label">
                                    Khóa tài khoản
                                </div>
                                </div>
                                : <div className="user-card__button user-card__unlock-button">
                                    <div className="user-card__button-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="11.25" stroke="white"/>
                                            <path d="M7 12L10.75 15.75L17 8.25" stroke="white"/>
                                        </svg>
                                    </div>
                                    <div className="user-card__button-label">
                                        Mở khóa tài khoản
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                : <></>
            } 
        </>
    )
}