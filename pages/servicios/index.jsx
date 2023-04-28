import React, { useEffect, useState } from "react";

import Link from "next/link";
import Layout from "../../layout/layout";
import SidebarComponent from "../../layout/SidebarComponent";
import Title from "../../layout/title";

import Services from "/Directus/SDKDirectus/services/Services";
import LoadingFullPage from "../../components/utilities/LoadingFullPage";

import { getInitialConten } from "../../components/store/company/index";

import { useDispatch } from "react-redux";

export default function () {
  const dispatch = useDispatch();
  const { getAllServices } = Services;
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState(null);
  const [count, setCount] = useState(null);
  const [page, setPage] = useState(1);


  const getServices = () =>
    getAllServices(page)
      .then((data) => {
        setServices(data.data);
        setCount(data.count);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      
  useEffect(() => {
    setLoading(true);
    dispatch(getInitialConten(setLoading));
    getServices();
  }, [page]);

  const loadingTable = {
    pointerEvents: "none",
    opacity: " 0.5",
    background: "#CCC",
  };
  return (
    <>
      <Title title="Services" />
      <Layout>
        <div>
          {/* Page Title */}
          <div className="industify_fn_pagetitle">
            <div className="container">
              <div className="title_holder">
                <h3>Nuestros servicios</h3>
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
                      <span className="bread-current">Nuestros servicios</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* /Page Title */}

          {/* Sidebar Page */}

          {loading | !services ? (
            <LoadingFullPage />
          ) : (
            <div className="industify_fn_sidebarpage">
              <div className="container">
                <div className="s_inner">
                  {/* Main Sidebar: Left */}
                  <div style={loading ? loadingTable : {}}>
                    <div className="industify_fn_leftsidebar">
                      <ul className="industify_fn_service_list">
                        {services &&
                          services.map((item, i) => (
                            <li key={i}>
                              <div className="item">
                                <div className="item_in">
                                  <div className="img_holder">
                                    <div
                                      className="img_abs"
                                      style={{
                                        backgroundImage: `url(${item.imagen_slider})`,
                                      }}
                                    ></div>
                                    <Link
                                      href={`/detalles-servicio/${item.id}`}
                                    >
                                      <a></a>
                                    </Link>
                                  </div>
                                  <div className="title">
                                    <h3>
                                      <Link
                                        href={`/detalles-servicio/${item.id}`}
                                      >
                                        <a>{item.title}</a>
                                      </Link>
                                    </h3>
                                    <p>
                                      {`${new DOMParser()
                                        .parseFromString(item.description, "text/html")
                                        .documentElement.textContent
                                        .substring(0, 225)
                                        .trim()}${
                                          item.description.length > 200
                                            ? "..."
                                            : ""
                                        }`}
                                    </p>

                                  </div>
                                  <div className="read_more">
                                    <Link
                                      href={`/detalles-servicio/${item.id}`}
                                    >
                                      <a>Seguir leyendo</a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>

                      <div className="clearfix"></div>

                      <div className="industify_fn_pagination">
                        <ul>
                          {count &&
                            [...Array(Math.ceil(count.total_count / 10))].map(
                              (x, i) =>
                                page === i ? (
                                  <li key={i} className="active">
                                    <span className="current">{i + 1} </span>
                                  </li>
                                ) : (
                                  <li
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={page === i + 1 ? "active" : ""}
                                  >
                                    <Link href="#">
                                      <a>{i + 1} </a>
                                    </Link>
                                  </li>
                                )
                            )}
                          <li className="view">
                            {count && (
                              <p>{`Ver página ${page} de ${Math.ceil(
                                count.total_count / 10
                              )}`}</p>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="industify_fn_rightsidebar">
                    {/* Service List */}

                    {/* /Service List */}

                    {/* Get Sidebar */}
                    <SidebarComponent />
                    {/* /Get Sidebar */}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* /Sidebar Page */}
        </div>
      </Layout>
    </>
  );
}
