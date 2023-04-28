import React from 'react'
import { useState, useEffect } from "react";


import ContactBar from "/Directus/SDKDirectus/services/ContactBar";
import { toast } from "react-toastify";
import Link from "next/link";



export default function WhyChoose({ whyChoose, id, type }) {
  const { getContacBar } = ContactBar;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(null);

  const getContactData = () =>
    getContacBar()
      .then(setContact)
      .catch((error) => toast.error("¡Error!, " + error.message))
      .finally(setLoading(false));

  useEffect(() => {
    setLoading(true);
    getContactData();
  }, [id]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      {whyChoose && <div className="service_section">
        <div className="fn_cs_about_with_rating">
          <div className="container">
            <div className="awr_inner">
              <div className="left_part">
                <div className="title_holder">
                  <h3>{whyChoose.title} </h3>
                  <div dangerouslySetInnerHTML={{ __html: whyChoose.description }} />


                  {contact && id && (
                    <div className="fn_cs_call_to_action-home corner">
                      <div className="container">
                        <div className="cta_holder-home">
                          <div className="title_holder">
                            <h3>{contact.title} </h3>
                            <p>{contact.sub_title} </p>
                          </div>
                          <div className="link_holder">
                            <Link href="/contactanos">
                              <a>{contact.button_message} </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}


                  {!id && contact && (
                    <div className="fn_cs_call_to_action-home">
                      <div className="container">
                        <div className="cta_holder-home">
                          <div className="title_holder">
                            <h3>{contact.title} </h3>
                            <p>{contact.sub_title} </p>
                          </div>
                          <div className="link_holder">
                            <Link href="/contactanos">
                              <a>{contact.button_message} </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>}


    </>


  )
}
