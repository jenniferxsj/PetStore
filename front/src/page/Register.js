import RegisterForm from "../components/RegisterForm"

function Register() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="text-center col-12 carts">
          <h1>Register</h1>
          <div className="col-md-4 offset-md-4">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;