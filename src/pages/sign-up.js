import Layout from '../components/Layout';
import SignUpForm from '../components/SignUpForm';
import Link from 'next/link';

class SignUp extends React.Component {
  render() {
    const signInLink = (
      <Link href='/sign-in'>
        <a className="link">Sign in →</a>
      </Link>
    );

    return (
      <Layout>
        <h1>Sign up</h1>
        <SignUpForm />
        <span>Already have an account? {signInLink}</span>
      </Layout>
    );
  }
}

export default SignUp;
