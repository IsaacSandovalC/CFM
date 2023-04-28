import React, { useEffect, useState } from "react";

import Layout from "../layout/layout";
import SidebarComponent from "../layout/SidebarComponent";
import Title from "../layout/title";
import Link from "next/link";
import { getInitialConten } from "../components/store/company/index";
import { useDispatch } from "react-redux";
import LoadingFullPage from "../components/utilities/LoadingFullPage";
import UsefulLinks from "/Directus/SDKDirectus/services/UsefulLinks";

export default function ({ id }) {
  const [loading, setLoading] = useState();
  const { getContentPage } = UsefulLinks;
  const dispatch = useDispatch();
  const [page, setPage] = useState(null);

  const getPage = () =>
    getContentPage(id)
      .then((data) => setPage(data))
      .catch((error) => toast.error("¡Error!, " + error.message))
      .finally(setLoading(false));

  useEffect(() => {
    dispatch(getInitialConten(setLoading));
    getPage();
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingFullPage />
      ) : (
        <Layout>
          {/* Page Title */}
          <Title title="Blog Single 4" />
          {page && (
            <div>
              <div className="industify_fn_pagetitle">
                <div className="container">
                  <div className="title_holder">
                    <h2> {page.name} </h2>
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
                          <a title="Blog">Elaces Utiles</a>
                        </li>
                        <li className="separator">
                          <span> </span>
                        </li>
                        <li>
                          <span className="bread-current">{page && page.url} </span>
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
                    <div className="industify_fn_leftsidebar" style={{ paddingTop: 20 }}>
                      {/* Single  */}
                      <div className="industify_fn_blog_single">
                        <div className="desc_holder" dangerouslySetInnerHTML={{ __html: page.page }} />
                      </div>
                      {/* /Single Blog */}
                    </div>
                    {/* /Main Sidebar: Left */}

                    {/* Main Sidebar: Right */}
                    <div className="industify_fn_rightsidebar">
                      {/* Get Sidebar */}
                      <SidebarComponent />
                      {/* /Get Sidebar */}
                    </div>
                    {/* Main Sidebar: Right */}
                  </div>
                </div>
              </div>
              {/* /Sidebar Page */}
            </div>
          )}
        </Layout>
      )}
    </>
  );
}
