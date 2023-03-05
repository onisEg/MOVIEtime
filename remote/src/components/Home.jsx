import React from 'react'
import './css/Home.css'
import img1 from '../img/IMDB-icon.png'

export default function Home() {
  return (
    <>
      <div className="row home">
        <div className="col-md-6  ">
          <div className="mov-info d-flex flex-column align-items-start justify-content-center height">
            <div className="fw-normal Category">
              <span>
                <img src={img1} alt="imdb" />
              </span>
              <span>8.8</span>
              <span className="">2019-Drama-120 min</span>
            </div>
            <div className="title pt-2">
              <h2 className="">constantly is key</h2>
            </div>
            <div className="dic text-muted">
              <p>
                In a small blue-collar town in z, Sed ut perspiciatis unde omnis
                iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
