import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  {
    url: '../assets/slide1.jpg',
    caption: 'Slide 1'
  },
  {
    url: '../assets/slide2.jpg',
    caption: 'Slide 2'
  },
  {
    url: '../assets/slide3.jpg',
    caption: 'Slide 3'
  }
  
];

const SlideShow = () => { 
    return (
      <>
        <div style={{height:'30px',background:'black'}}>
          <h1 style={{textAlign:'center',color:'black'}}>
              Menu
          </h1>
        </div>
        <div className="slide-container" style={{height:'500px',padding:"15px 15px 50px 15px",marginTop:'19px',background:'#090909'}}>
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div style={{ height:'500px',objectFit:'fill'}}>
                <img style={{height:"100%",width:"100%",objectFit:'fill'}} src={slideImage.url}></img>
                <span>{slideImage.caption}</span>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
      </>
    )
}

export default SlideShow;