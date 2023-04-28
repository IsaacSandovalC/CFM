import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Layout from "../../layout/layout";
import PhotoGallery from "../../components/Gallery/PhotoGallery";
import Title from "../../layout/title";
import Projects from "/Directus/SDKDirectus/services/Projects";
import { getInitialConten } from "../store/company/index";
import { generateShareLink } from "../utilities/functions";
import RenderSocialMedia from "../utilities/RenderSocialMedia";
import LoadingFullPage from "../utilities/LoadingFullPage";
import { toast } from "react-toastify";

export default function Portfolio1({ id }) {
  const { getProjectById } = Projects;
  const { data: initicalConten } = useSelector((state) => state.company); //contiene los valores de la initicalConten que estan en el estado global
  const dispatch = useDispatch();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProject = () =>
    getProjectById(id)
      .then(setProject)
      .catch((error) => toast.error("¡Error!, " + error.message))
      .finally(() => setLoading(false));

  useEffect(() => {
    if (id) {
      setLoading(true);
      if (!initicalConten) {
        dispatch(getInitialConten(setLoading));
      }
      getProject();
    }
  }, [id]);

  return (
    <>
      {loading && !initicalConten ? (
        <Layout>
          <LoadingFullPage />
        </Layout>
      ) : (
        <div>
          {initicalConten && project && (
            <div>
              <Title title="Portfolio Single 1" />
              <Layout>
                <div className="industify_fn_portfolio_single">
                  {/* Justified Images */}
                  <div className="fn_cs_justified_wrap">
                    <PhotoGallery photos={project.gallery} />
                  </div>
                  {/* Portfolio Content */}
                  <div className="industify_fn_psingle_content">
                    <div className="container">
                      <div className="content_in">
                        <div className="content_part">
                          <div
                            dangerouslySetInnerHTML={{ __html: project.body }}
                          />

                          <div className="share_box">
                            <div className="industify_fn_share_icons">
                              <label>
                                <h4>Compartir:</h4>
                              </label>
                              <ul>
                                {initicalConten.socialMedia.map((item) => (
                                  <li>
                                    <Link
                                      href={generateShareLink(
                                        item.social_medias,
                                        `${process.env.NEXT_PUBLIC_HOSTS}/detalles-proyecto/${id}`
                                      )}
                                    >
                                      <a target="_blank" rel="noreferrer">
                                        <RenderSocialMedia
                                          social={item.social_medias}
                                        />
                                      </a>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="helpful_part">
                          <div className="hp_inner">
                            <ul>
                              {project.details.map((detail, i) => (
                                <li key={i}>
                                  <p>{detail.title} </p>
                                  <span>{detail.description} </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Portfolio Content */}
                </div>
              </Layout>
            </div>
          )}
        </div>
      )}
    </>
  );
}
