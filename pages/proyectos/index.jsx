import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import Title from "../../layout/title";
import { Arrow_r } from "../../public/svg/icon";
import Link from "next/link";

import { getInitialConten } from "../../components/store/company";
import LoadingFullPage from "../../components/utilities/LoadingFullPage";
import { useDispatch, useSelector } from "react-redux";

export default function () {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { data: initialContend } = useSelector((state) => state.company); //contiene los valores de la initicalConten que estan en el estado global

  useEffect(() => {
    dispatch(getInitialConten(setLoading));
  }, []);

  const resderOptions = () => {
    const { project } = initialContend;

    if (project.projects.length) {
      return (
        <>
          {project.projects.map((item) => (
            <li key={item.id}>
              <div className="item">
                <div className="item_in">
                  <Link href={`/detalles-proyecto/${item.id}`}>
                    <a></a>
                  </Link>
                  <div className="img_holder">
                    <img src="img/thumb/560-375.jpg" alt="" />
                    <div
                      className="img_abs"
                      style={{
                        backgroundImage: `url(${process.env.NEXT_PUBLIC_URL_API}/assets/${item.icon_image})`,
                      }}
                    ></div>
                  </div>
                  <div className="title_holder">
                    <h3> {item.title} </h3>
                    <p>
                      Ver más.
                      <Arrow_r className="fn__svg" />
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </>
      );
    }
    return <h3>No hay proyectos registrados.</h3>;
  };

  return (
    <>
      <Title title="Proyectos" />
      <Layout>
        {/* Page Title */}
        <div className="industify_fn_pagetitle">
          <div className="container">
            <div className="title_holder">
              <h3>Proyectos</h3>
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
                    <span className="bread-current">Proyectos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/*  /Page Title  */}

        {loading ? (
          <LoadingFullPage />
        ) : (
          <div className="industify_fn_portfolio_page">
            <div className="portfolio_list">
              <div className="container">
                <div className="list_in">
                  <ul className="industify_fn_portfolio_list">
                    {initialContend &&
                      initialContend.project &&
                      resderOptions()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
