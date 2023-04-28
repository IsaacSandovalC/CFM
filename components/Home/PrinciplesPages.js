import Link from "next/link";
import React, { useEffect, useState } from "react";

import Layout from "../../layout/layout";
import Title from "../../layout/title";
import Principles from "/Directus/SDKDirectus/services/Principles";
import { useDispatch, useSelector } from "react-redux";
import { getInitialConten } from "../store/company/index";

import { toast } from "react-toastify";
import LoadingFullPage from "../../components/utilities/LoadingFullPage";

export default function PrinciplesPages() {
  const { getAllPrinciples } = Principles;
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.company); //Contiene los valores de la barra superior de la barra de navegación

  const [principles, setPrinciples] = useState(null);
  const [loading, setLoading] = useState(null);

  const getDataPrinciples = () =>
    getAllPrinciples()
      .then(setPrinciples)
      .catch((error) => toast.error("¡Error!, " + error.message))
      .finally(setLoading(false));

  useEffect(() => {
    setLoading(true);
    getDataPrinciples();
    if (!data) {
      dispatch(getInitialConten(setLoading));
    }
  }, []);

  return (
    <>
      <Title title="Principles" />
      <Layout>
        {/* Page Title  */}
        <div className="industify_fn_pagetitle">
          <div className="container">
            <div className="title_holder">
              <h3>Principios</h3>
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
                    <span className="bread-current">Principios</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Title  */}

        {/* Principles  */}
        {loading | !principles ? (
          <LoadingFullPage />
        ) : (
          <div className="industify_fn_principles">
            <div className="container">
              <div className="principles">
                <ul>
                  {principles &&
                    principles.map((principle, i) => (
                      <li key={i}>
                        <div className="item">
                          <div className="item_left">
                            <h2>{i.length > 1 ? i + 1 : `0${i + 1}`}.</h2>
                            <h3>{principle.title} </h3>
                          </div>
                          <div
                            className="item_right"
                            dangerouslySetInnerHTML={{
                              __html: principle.description,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* /Principles  */}
      </Layout>
    </>
  );
}
