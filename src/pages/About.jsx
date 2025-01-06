import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <b className="text-gray-800">About Eazi Cut </b>
          <p>
          Welcome to Eazi Cut, where tradition meets modern style. We specialize in offering a curated selection of native wear designed for those who appreciate the richness of cultural heritage with a touch of contemporary elegance. Our mission is to celebrate and reinvent the beauty of traditional fashion, making it accessible, stylish, and timeless for everyone.
          </p>
          <b className="text-gray-800">Our Craftsmanship</b>  
          <p>
          Every item we create reflects a commitment to excellence. We work closely with skilled artisans and designers who understand the intricate details and significance of native patterns and textiles. Using premium fabrics and authentic techniques, our garments are made to last, offering both comfort and style that can be cherished for years to come.
          </p> 
          <b className="text-gray-800">Our Commitment</b>
          <p>
          Beyond creating beautiful clothing, we’re dedicated to supporting our communities and promoting sustainable practices. By choosing Eazi Cut, you’re not just choosing quality; you’re supporting a brand that values authenticity, cultural appreciation, and ethical sourcing.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600" >
            We meticulously select and vet each product to ensure it meets our
            stringent quality standard
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Conveniece:</b>
          <p className="text-gray-600">
           With our user-friendly interface and hassle-free ordering process, shoppig has never been easier.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Services:</b>
          <p className="text-gray-600">
            Our team of dedicated professioals is here to assist you the way, ensuring your satisfaction is our top prioority.
          </p>
        </div>
      </div>

      <NewsLetterBox/>

    </div>
  );
};

export default About;
