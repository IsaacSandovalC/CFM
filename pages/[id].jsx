import React, { useEffect, useState } from "react";

import Layout from "../layout/layout";
import SidebarComponent from "../layout/SidebarComponent";
import Title from "../layout/title";
import Link from "next/link";
import { getInitialConten } from "../components/store/company/index";
import { useDispatch } from "react-redux";
import LoadingFullPage from "../components/utilities/LoadingFullPage";

export default function ({ data }) {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(getInitialConten(setLoading));
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <LoadingFullPage />
      ) : (
        <Layout>
          {/* Page Title */}
          <Title title="Blog Single 4" />
          {data && (
            <div>
              <div className="industify_fn_pagetitle">
                <div className="container">
                  <div className="title_holder">
                    <h2> {data.name} </h2>
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
                          <span className="bread-current">
                            {data && data.url}{" "}
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
                    <div
                      className="industify_fn_leftsidebar"
                      style={{ paddingTop: 20 }}
                    >
                      {/* Single  */}
                      <div className="industify_fn_blog_single">
                        <div
                          className="desc_holder"
                          dangerouslySetInnerHTML={{ __html: data.page }}
                        />
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

export async function getStaticPaths() {
  const fetch = require("node-fetch");
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  const paths = await fetch(
    `https://apiep.icautomatizados.com/items/useful_links`,
    { agent }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const paths = data.data.map((item) => ({
          params: { id: `${item.url.replace(/\s+/g, "-").toLowerCase()}` },
        }));
        return {
          paths: paths,
          fallback: false,
        };
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return paths;
}

export async function getStaticProps({ params }) {
  const fetch = require("node-fetch");
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const paths = await fetch(
    `https://apiep.icautomatizados.com/items/useful_links?fields[]=id&fields[]=name&fields[]=page&fields[]=url&filter=%7B%22url%22:%7B%22_eq%22:%22${params.id.replace(
      /-/g,
      " "
    )}%22%7D%7D&limit=1`,
    { agent }
  )
    .then((response) => response.json())
    .then(({ data }) => {
      if (data) {
        return {
          props: {
            data: data[0],
          },
        };
      } else {
        return {
          props: {}, // Devuelve un objeto vacío como valor predeterminado
        };
      }
    });
  return paths;
}
