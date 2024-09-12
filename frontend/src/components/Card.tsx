import React from "react"

export default function Card(props){
    return (

        <div className="col-sm d-flex">
            <div className="br-card" id="card0">
                <div className="card-header text-up-02 text-weight-bold my-0">
                    {props.title}
                </div>
                <div className="card-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}


