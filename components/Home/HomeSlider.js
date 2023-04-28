import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux'

SwiperCore.use([Navigation, Pagination, Autoplay]);


export default function HomeSlider() {
    const { data } = useSelector((state) => state.company)//Contiene los valores de la barra superior de la barra de navegación
    const { slider } = data

    return (
        <>
            <div className="industify_slider_alpha" data-desc-show="yes" data-category-show="yes" data-nav-types="square" data-autoplay-switch="enabled" data-autoplay-time="8000" data-effect="cards" data-progress="enabled" data-box-pos="cr" data-img-effect="enabled" data-text-effect="enabled">

                {/* <!-- Alpha Slider: navigation --> */}
                <div className="owl_control">
                    <div className="fn_prev"><span><span className="a"></span><span className="b"></span><span className="c"></span></span></div>
                    <div className="fn_next"><span><span className="a"></span><span className="b"></span><span className="c"></span></span></div>
                </div>
                {/* <!-- /Alpha Slider: navigation --> */}

                {/* <!-- Alpha Slider: pagination --> */}
                <div className="swiper-pagination"></div>
                {/* <!-- /Alpha Slider: pagination --> */}

                {/* <!-- Alpha Slider: wrapper --> */}
                <Swiper
                    spaceBetween={2}
                    slidesPerView={1}
                    autoplaydisableoninteraction={'true'}
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation={{
                        prevEl: ".fn_prev",
                        nextEl: ".fn_next",
                    }}
                    autoplay={{
                        "delay": 3500,
                        "disableOnInteraction": false
                    }}
                    className="custom-class"
                >
                    {slider && slider.map((sl) =>
                        <SwiperSlide key={sl.id}>
                            <div className="item">
                                <div className="img_holder" style={{
                                    backgroundImage: `url(${process.env.NEXT_PUBLIC_URL_API}/assets/${sl.image})`,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    backgroundBlendMode: 'darken'
                                }}>
                                    <div className="title_holder">
                                        <div className="inner">
                                            <div className="in">
                                                <p><span>{sl.title_top} </span></p>
                                                <h3><span>{sl.title_middle} </span></h3>
                                                <div className="desc"><span>{sl.description}</span></div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                    }
                </Swiper>
                {/* <!-- Alpha Slider: wrapper --> */}

            </div>
            {/* <!-- /Alpha Slider --> */}
        </>
    )
}
