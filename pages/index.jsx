import { useState } from 'react';
import { account, signinWithEmailandPassword } from '../init';
import Link from 'next/link';

const Home = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const signupWithEmailandPassword = async () => {
    if (password.length >= 8) {
      if (password === confirmPassword) {
        try {
          await account.create('unique()', email, password, name)
          alert("account created successfully")
          signinWithEmailandPassword(email, password)
        } catch (error) {
          console.log(error)
        }
      } else {
        alert("password do not match")
      }
    } else {
      alert('Password length should be up to 8 characters')
    }
  }
  return (
    <div>
      <div className="signup">
        <form action="">
          <label htmlFor="name">Name</label>
          <input type="text" className='signup-input' name="name" ivalue={name} onChange={(e) => setName(e.target.value)} id="" />
          <label htmlFor="email">Email</label>
          <input type="email" className='signup-input' name="email" value={email} onChange={(e) => setEmail(e.target.value)} id=""/>
          <label htmlFor="password">Password</label>
          <input type="password" className='signup-input' name="" value={password} onChange={(e) => setPassword(e.target.value)} id=""/>
          <label htmlFor="password">Confirm Password</label>
          <input type="password" className='signup-input' name="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id=""/>
          <button type='button' className= "button" onClick={signupWithEmailandPassword}>Sign Up</button>
          <p>Already have an account, <Link href="/signin" className='link'>Sign in</Link></p>
        </form>
      </div>
    </div>
  )
};

export default Home;
