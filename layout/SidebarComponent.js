import React, { useEffect, useState } from "react";

import Link from "next/link";
import Sidebar from "/Directus/SDKDirectus/services/Sidebar";
import { toast } from "react-toastify";
import Documents from "../components/Home/DocumentsComponent";

export default function SidebarComponent() {
  const { getSidebar } = Sidebar;

  const [sidebar, setSidebar] = useState(null);
  const [loading, setLoading] = useState(null);

  const getDataSidebar = () =>
    getSidebar()
      .then(setSidebar)
      .catch((error) => toast.error("¡Error!, " + error.message))
      .finally(setLoading(false));

  useEffect(() => {
    setLoading(true);
    getDataSidebar();
  }, []);

  return (
    <>
      {loading && sidebar ? (
        <></>
      ) : (
        <div className="industify_fn_sidebar">
          {sidebar && (
            <div className="industify_fn_sidebar_in">
              <div className="widget_block">
                <div className="industify_fn_widget_estimate">
                  <div className="img_holder">
                    <span className="helper1"></span>
                    <span className="helper2"></span>
                    <span className="helper3"></span>
                    <span className="helper4"></span>
                    <span className="helper5"></span>
                    <span className="helper6"></span>
                    {sidebar && (
                      <div
                        className="abs_img"
                        style={{
                          backgroundImage: `url(${sidebar.background})`,
                        }}
                      />
                    )}
                  </div>
                  <div className="bfwe_inner">
                    <p> {sidebar.title} </p>
                    <Link href="/contactanos">
                      <a>{sidebar.button_text} </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="widget_block widget_brochure">
                <div className="wid-title">
                  <span>Presentación de la empresa</span>
                </div>
                <div className="industify_fn_widget_brochure">
                  <div className="fn_brochures">
                    <Documents />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
