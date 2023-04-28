import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { formatLocalPhone } from "../components/utilities/functions";
import RenderSocialMedia from "../components/utilities/RenderSocialMedia";

export default function DesktopHeader() {
  const { data } = useSelector((state) => state.company); //Contiene los valores de la barra superior de la barra de navegación
  const { navbar, socialMedia, topPanel } = data;

  return (
    <>
      {data && (
        <div className="industify_fn_header">
          {/* <!-- Header: Top Panel --> */}
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
          {/* <!-- /Header: Top Panel --> */}

          {/* <!-- Header: Bottom Panel --> */}
          <div className="header_inner">
            <div className="menu_logo">
              <Link href="/">
                <a>
                  <img
                    className="desktop_logo"
                    src={`${process.env.NEXT_PUBLIC_URL_API}/assets/${navbar.icon_company}`}
                    alt="Industry HTML Template"
                  />
                  <img
                    className="desktop_logo_dark"
                    src={`${process.env.NEXT_PUBLIC_URL_API}/assets/${navbar.icon_company_dark}`}
                    alt="Industry HTML Template"
                  />
                </a>
              </Link>
            </div>
            <div className="menu_nav">
              <ul className="industify_fn_main_nav vert_nav">
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
            </div>
            <div className="toll_free_lang">
              <div className="toll_free"
                  onMouseEnter={(e) => e.currentTarget.classList.add("expanded")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("expanded")}
              >
                <span className="shape1"></span>
                <span className="shape2"></span>
                <span className="shape3"></span>
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
              </div>
            </div>
          </div>
          {/* <!-- /Header: Bottom Panel --> */}
        </div>
      )}

      <div className="my-class"></div>
    </>
  );
}
