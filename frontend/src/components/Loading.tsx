import React from "react"

export default function Loading(){
    return (

        <div className="loading-container" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "60vh"}}>
            <div className="br-loading medium d-flex justify-content-center align-itens-center position-fixed top-50 start-50 translate-middle" role="progressbar"></div>
        </div>

    )
}