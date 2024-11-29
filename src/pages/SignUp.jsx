import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import authImg from "../assets/contact_img.png";
import UseShowPassword from "../hooks/UseShowPassword";

const SignUp = () => {
  const { signUp, loading } = useAuth();
  const { showPassword, handleShowPassword } = UseShowPassword();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    // form validation
    validationSchema: Yup.object({
      firstname: Yup.string().required("First Name is required"),
      lastname: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Minimum of 6 characters"),
    }),
    onSubmit: async (values) => {
      console.log("Form Values:", values); // Log values to debug
      await signUp(values); // Send form data to AuthContext
    },
  });

  return (
    <>
      <div className="bg-white flex items-center lg:gap-10 px-4 lg:px-4 rounded-lg ">
        <div className="hidden lg:block lg:basis-1/2">
          <img src={authImg} alt="heroimage" className="object-cover h-full" />
        </div>
        <div className="basis-full lg:basis-1/2 px-4">
          <Card
            color="transparent"
            shadow={false}
            className="w-full p-4 md:p-6"
          >
            <Typography
              variant="h3"
              className="text-center text-gray-800 max-w-xs mx-auto"
            >
              Registration Form
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-center text-gray-800 max-w-xs mx-auto"
            >
              Create Account To Continue
            </Typography>
            <form
              onSubmit={formik.handleSubmit}
              className="mt-4 w-full max-w-md mx-auto"
            >
              <div className="flex flex-col gap-6">
                {/* First Name */}
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    First Name
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Emeka"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="firstname"
                  />
                  {formik.touched.firstname && formik.errors.firstname && (
                    <p className="text-red-300">{formik.errors.firstname}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Last Name
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Adeola"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="lastname"
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <p className="text-red-300">{formik.errors.lastname}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-300">{formik.errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
                    Password
                  </Typography>
                  <Input
                    type={showPassword ? "text" : "password"}
                    size="lg"
                    placeholder="********"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                  />
                  <span className="absolute top-[50px] right-[25px] cursor-pointer">
                    {showPassword ? (
                      <FaEye
                        color="gray"
                        size={20}
                        onClick={handleShowPassword}
                      />
                    ) : (
                      <FaEyeSlash
                        color="gray"
                        size={20}
                        onClick={handleShowPassword}
                      />
                    )}
                  </span>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-300">{formik.errors.password}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-6 w-full bg-gray-800"
                fullWidth
                disabled={loading}
              >
                {loading ? <Spinner color="gray" /> : "Sign Up"}
              </Button>
              <p className="mt-3">
                Already have an account?{" "}
                <Link to={"/login"}>
                  <span className="underline text-gray-800 font-bold">
                    Log In
                  </span>
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignUp;
