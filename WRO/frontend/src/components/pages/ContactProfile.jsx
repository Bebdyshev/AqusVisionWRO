import React from "react";
import "./ContactProfile.css"
function ContactProfile(props) {
  return(
    <div className="profile">
      <p style={{"fontWeight": "bold"}}>{props.name}</p>
      <p>{props.role}</p>
      <a href={props.email}>{props.email}</a>
    </div>
  );
}

export default ContactProfile