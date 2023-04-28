import React from "react";
import Link from "next/link";
import { Arrow_r } from "../../public/svg/icon";

export default function Project({ project }) {
  return (
    <>
      {project && (
        <div className="fn_cs_project_sticky_full">
          <div className="inner">
            <div className="left_part">
              <div className="fn_cs_sticky_section">
                <h3>{project.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: project.description }} />
                <Link href="/proyectos">
                  <a>Ver todos los proyectos</a>
                </Link>
              </div>
            </div>

            <div className="right_part">
              <div className="fn_cs_sticky_section">
                <ul>
                  {project.projects &&
                    project.projects.map((item, i) => (
                      <li key={i}>
                        <div className="item">
                          <div className="img_holder">
                            <img src="img/thumb/700-500.jpg" alt="" />
                            <div
                              className="abs_img"
                              style={{
                                backgroundImage: `url(${process.env.NEXT_PUBLIC_URL_API}/assets/${item.icon_image})`,
                              }}
                            ></div>
                            <Link href={`/detalles-proyecto/${item.id}`}>
                              <a></a>
                            </Link>
                          </div>
                          <div className="title_holder">
                            <h3>
                              <Link href={`/detalles-proyecto/${item.id}`}>
                                <a>{item.title} </a>
                              </Link>
                            </h3>
                            <span className="desc">
                              <p>
                                {`${item.description.substring(0, 100)}${
                                  item.description.length > 100 ? "..." : ""
                                }`}{" "}
                              </p>
                            </span>
                            <p>
                              <Link href={`/detalles-proyecto/${item.id}`}>
                                <a>
                                  <span className="text">Más detalles</span>
                                  <span className="arrow">
                                    <Arrow_r className="fn__svg" />
                                  </span>
                                </a>
                              </Link>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
