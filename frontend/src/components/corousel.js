import { Carousel } from 'react-bootstrap';
import { useState } from 'react';
import './corousel.css';

function Caarousel({ imageurl,imageurl1 }) {
  console.log("imageurl===>",imageurl);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const slides = [
    {
      url: imageurl,
    },
    {
      url: imageurl1,
    },
 
   
  ];

  return (
    <div className="carousel-images">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {slides.map((image,idx) => (
          <Carousel.Item key={idx}>
            <img
              width={900}
              height={480}
              className="d-block w-100"
              src={image.url}
              alt="Slide"
            />
            <Carousel.Caption>
              <p>{image.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Caarousel;
