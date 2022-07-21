import { useState } from 'react';
import { signinWithEmailandPassword } from '../init';

const Home = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSignin = () => {
    signinWithEmailandPassword(email, password)
  }

 

  return (
    <div>
      <div className="signin">
        <form action="">
          <label htmlFor="email">Email</label>
          <input type="email" className='signup-input' name="email" value={email} onChange={(e) => setEmail(e.target.value)} id=""/>
          <label htmlFor="password">Password</label>
          <input type="password" className='signup-input' name="" value={password} onChange={(e) => setPassword(e.target.value)} id=""/>
          <button type='button' className= "button" onClick={handleSignin}>Sign in</button>
        </form>
      </div>
    </div>
  )
};

export default Home;