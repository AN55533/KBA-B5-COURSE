import React from 'react'

const ContactPage = () => {
  return (
    <div>
      <div className="w-full h-[500px] p-10  bg-gray-900">
        <h1 className="text-white text-[30px] font-bold ml-170 ">Contact Us</h1>
        <div className="flex  mt-20">
          <div className="p-5 text-blue-300 w-100 border ml-60 justify-between hover:bg-gray-600 text-white">
            <p className="p-5">
              #123, Health Avenue Road, Near Green Park Metro Station, Sector
              45, New Delhi – 110044, India
            </p>
          </div>
          <div className="p-2 text-blue-300  w-100 border ustify-between ml-60  hover:bg-gray-600 text-white ">
            <p>📞 Phone: +91-98765-43210</p>
            <p> 📞 Emergency: 102 (24/7 Ambulance Support)</p>
            <p> ✉️ Email: info@citycarehospital.com</p>
            <p> 🌐 Website: www.citycarehospital.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage
