import React, { useEffect, useState } from "react";

import Layout from "../../layout/layout";
import SidebarComponent from "../../layout/SidebarComponent";
import Title from "../../layout/title";
import { Check } from "../../public/svg/icon";
import Link from "next/link";
import Services from "/Directus/SDKDirectus/services/Services";

import { getInitialConten } from "../store/company/index";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import ContacBar from "./ContacBar";

import LoadingFullPage from "../../components/utilities/LoadingFullPage";

export default function ServiceComponent({ id }) {
  const { getServiceById } = Services;
  const { data: initicalConten } = useSelector((state) => state.company); //contiene los valores de la initicalConten que estan en el estado global
  const dispatch = useDispatch();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const getService = () =>
    getServiceById(id)
      .then(setService)
      .catch((error) => toast.error("¡Error!, " + error.message))
      .finally(setLoading(false));

  useEffect(() => {
    if (id) {
      dispatch(getInitialConten(setLoading));
      getService();
    }
  }, [id]);

  return (
    <>
      {loading | !service ? (
        <Layout>
          <LoadingFullPage />
        </Layout>
      ) : (
        <>
          <Title title="Nosotros" />
          <Layout>
            <div>
              {service && (
                <>
                  {/* Page Title */}
                  <div className="industify_fn_pagetitle">
                    <div className="container">
                      <div className="title_holder">
                        <h3>{service.title} </h3>
                        <div className="industify_fn_breadcrumbs">
                          <ul>
                            <li>
                              <Link href="/">
                                <a title="Home">Inicio</a>
                              </Link>
                            </li>
                            <li className="separator">
                              <span></span>
                            </li>
                            <li>
                              <Link href="/servicios">
                                <a title="Services">Nuestros servicios</a>
                              </Link>
                            </li>
                            <li className="separator">
                              <span></span>
                            </li>
                            <li>
                              <span className="bread-current">
                                {service.title}{" "}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Page Title */}

                  {/* Sidebar Page */}
                  <div className="industify_fn_sidebarpage">
                    <div className="container">
                      <div className="s_inner">
                        {/* Main Sidebar: Left */}
                        <div className="industify_fn_leftsidebar">
                          {/* Single Service */}
                          <div className="industify_fn_service_single">
                            <img src={service.image} alt="" />
                            <div className="desc_holder">
                              <div
                                className="desc_holder"
                                style={{ marginTop: "1%" }}
                                dangerouslySetInnerHTML={{
                                  __html: service.description,
                                }}
                              />
                            </div>

                            {/* Check List Shortcode */}
                            {service && service.features.length > 0 && (
                              <div className="fn_cs_check_list">
                                <h3>Características del servicio</h3>
                                <div className="list">
                                  <ul>
                                    {service &&
                                      service.features &&
                                      service.features.map((item) => (
                                        <li key={item.id}>
                                          <div className="item">
                                            <Check className="fn__svg" />
                                            <p>{item.name} </p>
                                          </div>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                            {/* Check List Shortcode */}

                            {/* Call to Action Shortcode (with corner) */}

                            <ContacBar id={id} />
                            {/* /Call to Action Shortcode (with corner) */}

                            {/* Get Random Services */}
                            {/* You can change data-index value to exclude 1st service single from the service list. You can also change data-count value to set including services count. */}
                            <div
                              data-html="includes/random-service.html"
                              data-index="5"
                              data-count="2"
                            ></div>
                            {/* /Get Random Services */}
                          </div>
                          {/* /Single Service */}
                        </div>
                        {/* /Main Sidebar: Left */}

                        {/* Main Sidebar: Right */}
                        <div className="industify_fn_rightsidebar">
                          {/* Service List */}
                          <div className="service_list_as_function">
                            <div className="title">
                              <h3>Lista completa de servicios</h3>
                            </div>
                            <div className="list_holder">
                              <ul>
                                {initicalConten &&
                                  initicalConten.services &&
                                  initicalConten.services.map((item) => (
                                    <li
                                      key={item.id}
                                      className={item.id === id ? "active" : ""}
                                    >
                                      <Link
                                        href={`/detalles-servicio/${item.id}`}
                                      >
                                        <a>{item.title}</a>
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                          {/* /Service List */}

                          {/* Get Sidebar */}
                          <SidebarComponent />
                          {/* /Get Sidebar */}
                        </div>
                        {/* Main Sidebar: Right */}
                      </div>
                    </div>
                  </div>
                  {/* /Sidebar Page */}
                </>
              )}
            </div>
          </Layout>
        </>
      )}
    </>
  );
}
