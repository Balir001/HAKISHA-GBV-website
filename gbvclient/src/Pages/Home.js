import React from 'react';
import homeImage from '../image/home page.jpeg'; // Import the image
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      
        
        <div className="content">
          <div id='HomeHeading' > <h1 >Welcome To HAKISHA</h1></div>
          
          <div className="human-rights-advocacy">
      <h2>Empowering Human Rights Advocacy</h2>
      <p>
        At our core, we believe that everyone deserves to have their human rights
        respected and protected. This commitment drives us to create a platform
        that empowers individuals like you to take action. Here's what we stand for:
      </p>
      <ul>
        <li>
          <h3>Upholding Fundamental Principles</h3>
          <ul>
            <li>
              Freedom of Expression: We ensure that everyone can freely express
              their thoughts and opinions.
            </li>
            <li>Safety: Living safely is a basic right. Our platform provides a
              secure space for reporting violations.</li>
            <li>
              Equal Opportunities: Regardless of background, all individuals
              should have equal access to opportunities.
            </li>
          </ul>
        </li>
        <li>
          <h3>Reporting Human Rights Violations</h3>
          <p>
            Our platform focuses on addressing Gender-Based Violence (GBV) and
            other violations. By submitting reports, you contribute valuable
            data that fuels our advocacy efforts. Together, we strive for a
            more just society.
          </p>
        </li>
      </ul>
      <p>Join us in making a difference. Your voice matters!</p>
    </div>
          {/* <button>Get Started</button> */}
        </div>
        <div className='besides'>
        <img src={homeImage} alt="Home Page" style={{ width: '50%', height: '50%', margin:"0px" }} />
        
      

      
      
          
      
          
          <section className="our-impact">
      <h2>More on Our Empowerment and Advocacy Footprints</h2>
      <ul >
        <li>
          <h3>Empowerment and Advocacy</h3>
          <p>Users actively participate in advocating for human rights.</p>
        </li>
        <li>
          <h3>Confidential Reporting of Violations</h3>
          <p>Report human rights violations with complete anonymity.</p>
        </li>
        <li>
          <h3>Access to Guidance and Counseling</h3>
          <ul>
            <li>Seek professional advice and emotional support directly within the app.</li>
            <li>Receive personalized recommendations based on your situation.</li>
          </ul>
        </li>
        <li>
          <h3>Efficient and Convenient</h3>
          <ul>
            <li>Services accessible on mobile devices, eliminating the need for physical travel.</li>
            <li>Convenient access anytime, anywhere.</li>
          </ul>
        </li>
        <li>
          <h3>Data-Driven Action</h3>
          <ul>
            <li>Collect data on violations for informed decision-making.</li>
            <li>Enable targeted actions to address human rights issues.</li>
          </ul>
        </li>
      </ul>
    </section>
    </div>
         
          <h2>How to get assistance on our platform?</h2>
          <ul>
            <li>You can submit incidents of GBV to us..<Link to="/Report">Report!</Link></li>
            <li>You can access councelling Services on the platform once you register an account with us <Link to="/CreateUser" >Account Registration</Link>.</li>
          </ul>
         
        
     
    </div>
  );
};

export default Home;
