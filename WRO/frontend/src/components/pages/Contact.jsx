import React from "react";
import ContactProfile from "./ContactProfile";
import "./ContactProfile.css"
function Contact() {
  return(
    <div className="contact_page">
      <div className={"contacts"}>
        <ContactProfile name="Шоканов Бауыржан Сайлаугалиевич" image="https://i.pinimg.com/736x/d5/d8/cf/d5d8cfa0ec342e28c8f31d098c7756fe.jpg" email="shokanov_b@akb.nis.edu.kz" role="Trainer"/>
        <ContactProfile name="Бердышев Керей Нуржанович" image="https://i.pinimg.com/736x/d5/d8/cf/d5d8cfa0ec342e28c8f31d098c7756fe.jpg" email="berdyshev_k1004@akb.nis.edu.kz" role="Hardware Engineer, Web Developer"/>
        <ContactProfile name="Мажитов Джафар Арманович" image="https://i.pinimg.com/736x/d5/d8/cf/d5d8cfa0ec342e28c8f31d098c7756fe.jpg" email="mazhitov_d0708@akb.nis.edu.kz" role="Software Engineer, Data Scientist"/>
      </div>
    </div>
  );
}

export default Contact