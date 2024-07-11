import React from 'react';
import Template from '../components/Template';
import Sign from "../assets/Signup.jpg";
const Signup = () => {

  return (
    <div>
        <Template
            title="Join the millions learning to code with StudyNotion for free"
            description1="Build skills for today, tomorrow, and beyond."
            description2="Education to future-proof your career."
            frameImg={Sign}
            formType="signup"
        />
    </div>
  );
}

export default Signup;
