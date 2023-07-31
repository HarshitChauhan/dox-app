import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section>
      <div>
        <div class="title">404</div>
        <div class="bg-img"></div>
        <div class="desc">
          <h2 class="subtitle">Look like you're lost</h2>
          <p>the page you are looking for not available!</p>
          <Link to="/" class="home">
            Go to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
