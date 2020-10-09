import React from "react";
import {Link} from 'react-router-dom';
import './Header.css';


export default function Header(props){
    return (
        <header className="notes-header">
            <div className="header-title">

                <Link to="/" className="header-logo">
                    {props.title}
                </Link>

            </div>
            <div className="header-actions">

                <Link to='/manage-tags'>
                    <button className="manage-tags-button">{props.actions}</button>
                </Link>

            </div>
        </header>
        );

}