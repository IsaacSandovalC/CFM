import React from 'react'
import { Quotes } from "../../public/svg/icon";

export default function Testimony({ testimony }) {
  return (
    <>
      {testimony && <div className="testimonial_section" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_URL_API}/assets/${testimony.image})` }}>
        <div className="overlay"></div>

        {/* <!-- Single Testimonial Shortcode --> */}
        <div className="fn_cs_single_testimonial">
          <div className="container">
            <div className="inner">
              <Quotes className="fn__svg" />
              <div className="content_holder">
                <p dangerouslySetInnerHTML={{ __html: testimony.quote }} />
                <h3>{testimony.responsible} </h3>
                <h5>{testimony.degree} </h5>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Single Testimonial Shortcode --> */}
      </div>}
    </>




  )
}
