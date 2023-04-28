import React from 'react'

export default function WeAre({ weAre }) {
  return (
    <div className="fn_cs_about">
      {weAre &&
        <div className="container-edit">
          <div className="a_inner">
            <div className="leftpart">
              <div className="title_holder"style={{ "padding":"2rem" }}>
                <h3 className="title">{weAre.title} </h3>
                <div className="item_right" dangerouslySetInnerHTML={{ __html: weAre.description }} />
              </div>      
            </div>
            <div className="rightpart">
              <div className="r_inner" id="scene" style={{ "transform": "translate3d(0px, 0px, 0px)", "transformStyle": "preserve-3d", "backfaceVisibility": "hidden", "height": "100%", "width": "100%" }}>
                  <img src="img/thumb/500-560.jpg" alt="" />
                  <div className="abs_img" data-bg-img="img/about/right.jpg" style={{ 'backgroundImage': `url(${process.env.NEXT_PUBLIC_URL_API}/assets/${weAre.image})` }}></div>
              </div>
            </div>
          </div>
        </div>}

    </div>
  )
}
