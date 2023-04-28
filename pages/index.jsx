import React, { useEffect, useState } from "react";

import Services from "../components/Home/HomeServices";
import Slider from "../components/Home/HomeSlider";

import Layout from "../layout/layout";
import Title from "../layout/title";
import PrinciplesCards from "../components/Home/PrinciplesCards";
import WeAre from "../components/Home/WeAre";

import { getInitialConten as getInitialContend } from "../components/store/company/index";
import { useDispatch, useSelector } from "react-redux";

import BrandsSlider from "../components/Home/BrandsSlider";
import WhyChoose from "../components/Home/WhyChoose";
import Testimony from "../components/Home/Testimony";
import Project from "../components/Home/Project";
import LoadingFullPage from "../components/utilities/LoadingFullPage";

export default function Index() {
  const dispatch = useDispatch();
  const { data: initialContend } = useSelector((state) => state.company); //contiene los valores de la initicalConten que estan en el estado global
  const [loading, setLoading] = useState(false);

  useEffect(() => {  
    dispatch(getInitialContend(setLoading));
  }, [dispatch]);

  return (
    <>
      <Title title="CFM" />
      {loading ? (
        <Layout>
          <LoadingFullPage />
        </Layout>
      ) : (
        <>
          {initialContend && (
            <Layout className={"transdark"}>
              <Title />
              <Slider />
              {/* <!-- Principles Modern --> */}
              {/* <PrinciplesCards principles={initialContend.principles} /> */}
              {/* <!-- /Principles Modern --> */}

              {/* <!-- About Section --> */}
              <div className="about_section">
                {/* <!-- About Shortcode --> */}
                <WeAre weAre={initialContend.weAre} />
                {/* <!-- /About Shortcode --> */}
              </div>
              {/* <!-- /Abut Section --> */}
              <Services
                service={{
                  ...initialContend.service,
                  services: initialContend.services,
                }}
              />
              {/* <!-- Why Choose Section --> */}
              <WhyChoose whyChoose={initialContend.whyChoose} />
              {/* <!-- /Why Choose Section --> */}

              {/* <!-- Call to ContacBar --> */}
              {/* <ContacBar /> */}
              {/* <!-- /Call to ContacBar --> */}
              {/* <!-- Testimonial Section --> */}
              <Testimony testimony={initialContend.testimony} />
              {/* <!-- /Testimonial Section --> */}

              {/* <!-- Project Sticky Full --> */}
              <Project project={initialContend.project} />
              {/* <!-- /Project Sticky Full --> */}

             {/* <!-- Brands section --> */}
              <BrandsSlider brand={initialContend.brand} />
              {/* <!-- /Brands section  --> */}

            </Layout>
          )}
        </>
      )}
    </>
  );
}
