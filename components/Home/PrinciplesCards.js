import React from 'react'

import Link from 'next/link'
import { Arrow_r } from '../../public/svg/icon'

export default function PrinciplesCards({principles}) {

  return (
  <>
    {principles && <div className="fn_cs_principles_modern">
      <div className="container">
        <div className="inner">
          <div className="shape"><span className="shape1"></span><span className="shape2"></span></div>
          <ul className="fn_cs_miniboxes">
            {principles.map((principle, i) =>
              <li key={i}>
                <div className="item">
                  <div className="title_holder">
                    <Link href="/principios"><a></a></Link>
                    <h3>{principle.title} </h3>
                    <p>{`${principle.description.substring(0, 100)}${principle.description.length > 100 ? '...' : ''}`}</p>
                    <span className="icon">
                      <Arrow_r className="fn__svg" />
                    </span>
                  </div>
                  <div className="number_holder">{i.length > 1 ? i + 1 : `0${i + 1}`} </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>}
  </>


  )
}
