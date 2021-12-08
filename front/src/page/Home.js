/* 

PAGE BUILT BY: JENNIFER

*/

import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import petStuff1 from "../images/pet-stuff.jpg";
import petStuff2 from "../images/pet-stuff2.jpg";
import petStuff3 from "../images/pet-stuff3.jpg";

function Home() {
  const pics = [
    {
      pic: petStuff2,
      description: "Two dogs with their foods",
      src: "http://bpic.588ku.com/back_pic/05/56/59/935b1df7ac940e9.jpg",
    },
    {
      pic: petStuff3,
      description: "Aninals with their foods",
      src: "http://bpic.588ku.com/back_pic/05/61/34/495b486a717e682.jpg",
    },
    {
      pic: petStuff1,
      description: "A lot of pets' toys",
      src: "https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E5%AE%A0%E7%89%A9%E7%94%A8%E5%93%81&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=undefined&latest=undefined&copyright=undefined&cs=1337506148,3836280766&os=813629518,2583929594&simid=4181721010,674743188&pn=35&rn=1&di=83930&ln=1922&fr=&fmq=1638916223620_R&fm=index&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fwww.pet18.com%252FUploadFiles%252FFCK%252F2018-11%252F4%25287%2529.jpg%26refer%3Dhttp%253A%252F%252Fwww.pet18.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1641508225%26t%3D48590060915f3686d228f55e4eea6825&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&ctd=1638917809622^3_1439X910%1",
    },
  ];

  return (
    <div>
      <Carousel>
        {pics.map((item) => {
          return (
            <Carousel.Item key={item.pic}>
              <img
                src={item.pic}
                alt={item.description}
                className="d-block w-100"
              />
              <Carousel.Caption>
                <p className="carousal-text">
                  Picture Source Link{" "}
                  <a href={item.src} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="col align-self-center carts">
        <h1 className="title">Welcome to the Store!</h1>
        <p>You can find everything you need here for your pets!</p>
        <Link to="/products">
          <button type="button" className="btn btn-color btn-lg text-light">
            Start Shooping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;