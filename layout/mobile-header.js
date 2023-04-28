import React, { useState, useEffect } from "react";
import MetisMenu from "metismenujs";
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatLocalPhone } from "../components/utilities/functions";
import RenderSocialMedia from "../components/utilities/RenderSocialMedia";

export default function MobileHeader() {
  const { data } = useSelector((state) => state.company); //Contiene los valores de la barra superior de la barra de navegación
  const { navbar, socialMedia, topPanel } = data;
  const [isMobileMenu, setMobileMenu] = useState(false);
  const MobileMenuTrueFalse = () => setMobileMenu(!isMobileMenu);

  useEffect(() => {
    new MetisMenu("#metismenu");
  }, []);

  return (
    <>
      {data && (
        <div className="industify_fn_mobilemenu_wrap">
          <div className="industify_fn_toppanel">
            <div className="left_panel">
              <div className="info">
                <Link href={`tel:${topPanel.contact_number}`}>
                  <a>{formatLocalPhone(topPanel.contact_number)} </a>
                </Link>
              </div>
              <div className="info">
                <Link href={`mailto:${topPanel.mail_contact}`}>
                  <a>{topPanel.mail_contact} </a>
                </Link>
              </div>
              <div className="industify_fn_social_list">
                <ul>
                  {socialMedia &&
                    socialMedia.map((item, i) => (
                      <li key={i}>
                        <Link href={item.url}>
                          <a target="_blank" rel="noreferrer">
                            <RenderSocialMedia social={item.social_medias} />
                          </a>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          {/* <!-- LOGO & HAMBURGER --> */}
          <div className="logo_hamb">

            <div className="in">
              <div className="menu_logo">
                <Link href="/">
                  <a>
                    <img
                      className="desktop_logo"
                      src={`${process.env.NEXT_PUBLIC_URL_API}/assets/${navbar.icon_company}`}
                      alt="Industry HTML Template"
                    />

                  </a>
                </Link>
              </div>
              <div
                onClick={MobileMenuTrueFalse}
                className={
                  !isMobileMenu
                    ? "hamburger hamburger--collapse-r"
                    : "hamburger hamburger--collapse-r is-active"
                }
              >
                {/* <!-- TOLL FREE MOBILE --> */}
                <div className="m_toll_free_lang">
                  <div className="m_toll_free">
                    <span className="shape1"></span>
                    <span className="shape2"></span>
                    <span className="shape3"></span>
                    <div className="tf_in">
                      <div className="tf_in">
                        <div
                          className="img_holder"
                          style={{
                            backgroundImage: `url(${process.env.NEXT_PUBLIC_URL_API}/assets/${navbar.internal_icon})`,
                          }}
                        ></div>
                        <p>
                          <span>{navbar.internal_message} </span>
                        </p>

                      </div>
                      <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /TOLL FREE MOBILE --> */}

              </div>
            </div>
          </div>
          {/* <!-- /LOGO & HAMBURGER --> */}
          {/* <!-- MOBILE DROPDOWN MENU --> */}
          <div
            className={
              !isMobileMenu ? "mobilemenu" : "mobilemenu opened d-block"
            }
          >
            <div>
              <nav>
                <ul className="metismenu" id="metismenu">
                  <li>
                    <Link href="/">
                      <a>Inicio</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/servicios">
                      <a>Servicios</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/nosotros">
                      <a>Nosotros</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/principios">
                      <a>Principios</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/proyectos">
                      <a>Proyectos</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contactanos">
                      <a>Contactanos</a>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* <!-- /MOBILE DROPDOWN MENU --> */}
        </div>
      )}
    </>
  );
}
