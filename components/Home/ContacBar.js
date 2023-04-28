import React, { useEffect, useState } from "react";
import ContactBar from "/Directus/SDKDirectus/services/ContactBar";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ContacBar({ id, type }) {
  const { getContacBar } = ContactBar;

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

  return (
    <>
      {contact && id && (
        <div className="fn_cs_call_to_action corner">
          <div className="container">
            <div className="cta_holder">
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
        <div className="fn_cs_call_to_action">
          <div className="container">
            <div className="cta_holder">
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
    </>
  );
}
