import React from "react";

import Link from "next/link";
import Slider from "react-slick";

export default function BrandsSlider({ brand }) {
  const map = "../img/blog/map.jpg";

  const settings = {
    dots: false,
    arrows: false,  
    speed: 500,   
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 1500,    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {brand && (
        <div className="blog_section">
          <div
            className="overlay"
            style={{ backgroundImage: `url(${map})` }}
          ></div>
          <div className="fn_cs_main_title">
            <div className="container">
              <div className="title_holder">
                <h3>{brand.title} </h3>
              </div>
            </div>
          </div>

          <div className="fn_cs_triple_blog_modern fn_alpha">
            <div className="container">
              <Slider {...settings}>
                {brand.brands &&
                  brand.brands.map((item, i) => (
                    <div key={i} onClick={() => console.log("cloci")}>
                      <Link href={item.url}>
                        <a target="_blank" rel="noreferrer">
                          <img
                            src={`${process.env.NEXT_PUBLIC_URL_API}/assets/${item.icon}`}
                            style={{
                              maxWidth: "100%",
                              alignContent: "center",
                            }}
                          />
                        </a>
                      </Link>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
