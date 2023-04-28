import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch } from "react-redux";

import Layout from "../layout/layout";
import Title from "../layout/title";
import { Location } from "../public/svg/icon";
import LocationOffice from "/Directus/SDKDirectus/services/LocationOffice";
import ContactUs from "/Directus/SDKDirectus/services/ContactUs";
import { getInitialConten as getInitialContend } from "../components/store/company/index";
import LoadingFullPage from "../components/utilities/LoadingFullPage";
import { validateEmail } from "../components/utilities/functions";

export default function Contact({ company }) {
  const dispatch = useDispatch();

  const { getOfficeLocations } = LocationOffice;
  const { createContactUs } = ContactUs;

  const [locatios, setLocatios] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    emailError: "",
  });

  useEffect(() => {
    dispatch(getInitialContend(setLoading));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * @function
   * @name handleSubmit
   * @param {Event} e - The event object
   * @description Maneja el evento de envío del formulario. Utiliza la función "toast.promise" para manejar
   * los estados de carga, éxito y error al enviar la información del formulario.
   * @returns {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(createContactUs(formData), {
      pending: {
        render() {
          return "Cargando...";
        },
        icon: false,
      },
      success: {
        render() {
          setFormData(
            (data) => (data = { name: "", email: "", description: "" })
          );
          return `Su información ha sido enviada con éxito.`;
        },
      },
      error: {
        render({ data }) {
          return <MyErrorComponent message={data.message} />;
        },
      },
    });
  };

  /**
   *@function
   *@name isFormValid
   *@description Valida un objeto formData para garantizar que se rellenan todos los campos menos "emailError".
   *@returns {boolean} - Devuelve true si todos los campos están rellenados, false si algún campo está vacío.
   */
  const isFormValid = () => {
    for (const key in formData) {
      if (key !== "emailError") {
        if (formData[key] === "") {
          return false;
        }
      }
    }
    return true;
  };

  const onBlur = (e) => {
    if (!validateEmail(e)) {
      setFormData({ ...formData, emailError: "Invalid" });
    } else {
      setFormData({ ...formData, emailError: "" });
    }
  };

  const getLocatios = () =>
    getOfficeLocations()
      .then(setLocatios)
      .catch((error) => toast.error("¡Error!, " + error.message))
      .finally(() => setLoading(false));

  /**
   * Construye un enlace de Google Maps utilizando la primera posición en el arreglo `locations`
   * @function
   * @returns {string} link - El enlace generado de Google Maps
   */
  const updateMapLink = () => {
    const { geo_location } = locatios[0];
    const baseLink = "https://maps.google.com/maps?";
    // Example usage,
    const latitude = geo_location.coordinates[1];
    const longitude = geo_location.coordinates[0];
    const address = "Parque Nacional Camino de Cruces, 2CH7+X8V, Panamá";
    const businessName = "";
    let link = `${baseLink}width=100%25&height=400&hl=en&q=${latitude},${longitude}(${address}+${businessName})&t=&z=17&ie=UTF8&iwloc=B&output=embed`;
    return link;
  };

  useEffect(() => {
    setLoading(true);
    getLocatios();
  }, []);

  return (
    <Layout company={company}>
      {/* Page Title */}
      <Title title="Contact" />
      <div className="industify_fn_pagetitle">
        <div className="container">
          <div className="title_holder">
            <h3>Ponte en contacto</h3>
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
                  <span className="bread-current">Contacto</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Title */}

      {/* Contact */}
      {loading ? (      
          <LoadingFullPage />     
      ) : (
        <div className="industify_fn_contact">
          <div className="container">
            <div className="contact_in">
              <div className="map_holder">
                {locatios && (
                  <iframe
                    width="100%"
                    height="400"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={updateMapLink()}
                  ></iframe>
                )}
              </div>

              <div className="contact_holder">
                <div className="contact_left">
                  <h3>Ponte en contacto con nosotros</h3>
                  <form onSubmit={handleSubmit} >
                    <div
                      className="success"
                      data-success="Your message has been received, we will contact you soon."
                    ></div>
                    <div className="empty_notice">
                      <span>Please Fill Required Fields</span>
                    </div>
                    {/*  */}
                    <div className="items">
                      <div className="item">
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Nombres"
                          value={formData.name}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="item">
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => handleChange(e)}
                          onBlur={() => onBlur(formData.email)}
                        />
                      </div>
                      <div className="item">
                        <textarea
                          id="description"
                          name="description"
                          placeholder="Mensaje"
                          value={formData.description}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="item">
                        <button
                          className="button-5"
                          type="submit"
                          disabled={
                            formData.emailError !== ""
                              ? true
                              : false | !isFormValid()
                          }
                        >
                          Enviar Mensaje
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="contact_right">
                  <div className="fn_cs_location_list">
                    <ul className="list">
                      {locatios &&
                        locatios.map((lc) => (
                          <li className="location_item" key={lc.id}>
                            <div className="item">
                              <div className="title_holder">
                                <span className="icon_wrapper">
                                  <span className="icon">
                                    <Location className="fn__svg" />
                                  </span>
                                  <span className="shape"></span>
                                </span>
                                <h3>{lc.name} </h3>
                              </div>
                              <div className="content_holder">
                                <ul>
                                  <li>{lc.address}</li>
                                  <li>Phone:{lc.phone} </li>
                                  <li>
                                    Email:{" "}
                                    <Link href={`mailto:${lc.email}`}>
                                      <a>{lc.email} </a>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* /Contact */}
    </Layout>
  );
}
