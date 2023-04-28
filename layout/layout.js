import React from "react";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import Footer from "./footer";
import { useSelector } from "react-redux";
import FloatingButton from "../components/Home/FloatingButtom";

export default function Layout({ children, className }) {
  const { data: company } = useSelector((state) => state.company); //contiene los valores de la company que estan en el state global

  return (
    <>
      <div className="industify_fn_wrapper_all" data-nav-skin={className}>
        {/* <!-- Wrapper --> */}
        <div className="industify_fn_wrapper">
          {/* <!-- Header --> */}
          {company && <DesktopHeader company={company} />}
          {/* <!-- /Header --> */}

          {/* <!-- Mobile Menu --> */}
          {company && <MobileHeader company={company} />}
          {/* <!-- /Mobile Menu --> */}
          {/* <!-- Preloader --> */}
          {/* <Preloader/> */}
          {/* <!-- /Preloader --> */}
          {children}
          {/* Site Footer Start */}
          {company && <FloatingButton company={company}/>}
          
          {company && <Footer company={company} />}
          {/* Site Footer End */}
        </div>
      </div>
    </>
  );
}
