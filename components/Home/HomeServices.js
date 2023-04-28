import React from 'react'

import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Arrow_r } from '../../public/svg/icon';

SwiperCore.use([Navigation]);

export default function HomeServices({ service }) {
    return (
        <>
            {/* <!-- Service Query Shortcode --> */}
            {service && <div className="fn_cs_service_query" data-mobile="disable" data-column-count="4">
                <div className="top_bar">
                    <div className="t_inner">
                        <h3> {service.title} </h3>
                        <span>{service.description} </span>
                        <div className="owl_control">
                            <div className="fn_prev"></div>
                            <div className="fn_next"></div>
                        </div>
                    </div>
                </div>
                <div className="service_part">
                    <div className="owl-carousel">
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={2}
                            autoplaydisableoninteraction={'false'}
                            loop={true}
                            // pagination={{ clickable: true }}
                            className="custom-class"
                            navigation={{
                                prevEl: ".fn_prev",
                                nextEl: ".fn_next",
                            }}
                            autoplay={{
                                "delay": 3500,
                                "disableOnInteraction": false
                            }}
                            breakpoints={{
                                // when window width is >= 768px
                                768: {
                                    // when window width is >= 992px
                                    slidesPerView: 3,
                                },
                                1200: {
                                    // when window width is >= 992px
                                    slidesPerView: 4,
                                }
                            }}
                        >
                            {service.services.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div className="item">
                                        <Link href={`/detalles-servicio/${item.id}`}><a className="full_link" ></a></Link>
                                        <div className="img_holder">
                                            <img src={`${process.env.NEXT_PUBLIC_URL_API}/assets/${item.imagen_slider}`} alt="" />
                                            <div className="abs_img" style={{ "backgroundImage": `url(${process.env.NEXT_PUBLIC_URL_API}/assets/${item.imagen_slider})` }}></div>
                                        </div>
                                        <div className="title">
                                            <h3>{item.title}</h3>
                                        </div>
                                        <div className="view_more">
                                            <span className="more_link">
                                                <span className="text">Ver más</span>
                                                <span className="arrow"><Arrow_r className="fn__svg" /></span>
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>}

            {/* <!-- /Service Query Shortcode --> */}

        </>
    )
}
