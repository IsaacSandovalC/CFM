import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import Title from "../../layout/title";
import WeAre from "../../components/Home/WeAre";
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

  return (
    <>
      <Title title="Nosotros" />
      <Layout>
        <div className="industify_fn_pagetitle">
          <div className="container">
            <div className="title_holder">
              <h3>Nosotros</h3>
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
                    <span className="bread-current">Nosotros</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {loading | !initialContend ? (
          <LoadingFullPage />
        ) : (
          <div className="industify_fn_portfolio_page">
            <div className="portfolio_list">
              <div className="container">
                <div className="list_in">
                  {initialContend && <WeAre weAre={initialContend.weAre} />}
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
