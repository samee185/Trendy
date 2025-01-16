import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt=""
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600 capitalize">Our Store</p>
          <p className="text-gray-500 capitalize">72 Jibowu Road  <br /> Off u-turn bus stop olorunsogo ,<br /> abule egba, lagos</p>
          <p className="text-gray-500">Tel: (234) 803-896 9978 <br /> Email: Trendynativewears@gmail.com</p>
          <p className="font-semibold text-xl">Careers at ------</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
         
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  );
};

export default Contact;
