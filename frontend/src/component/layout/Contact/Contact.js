import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mburunjoroge0@gmail.com">
        <Button>Contact: mburunjoroge0@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
