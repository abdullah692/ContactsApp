import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../Register.css";
import { postLoginUser, storeAccessToken } from "../Slices/AuthSlice";
import { NotificationWithIcon } from "../utils/Notification";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function Login(props) {
  const userdata = useSelector((state) => state?.auth);
  console.log(userdata, "userData");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e, name) => {
    // console.log(e.target.value);
    const value = e.target.value;
    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (values) => {
    console.log(values, "values");
    setLoading(true)
    dispatch(postLoginUser({ loginData: loginInfo }))
      .unwrap()
      .then((x) => {
        console.log("xxxxxxxxxxxx", x);
        setLoading(false);
        if (x.message == "Crendentials are not valid") {
          NotificationWithIcon("error", "Crendentials are not valid");
        } else if (x.message == "Logged In Successfully") {
          debugger;
          // dispatch(storeAccessToken(x?.accessToken))
          localStorage.setItem("user", JSON.stringify(x));
          NotificationWithIcon("success", "Logged In Successfully");
          
          navigate("/Contact");
        }
      })
      .catch((error) => {
        console.log(error, "error message");
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   if (userdata) {
  //    return navigate("/Contact");
  //   }
  // }, [userdata]);

  console.log(loginInfo);
  const validatePassword = (_, value) => {
    if (value && value.length < 5) {
      return Promise.reject("Password should be more than 5 letters");
    }
    if (!/\d/.test(value)) {
      return Promise.reject(
        "Password must contain at least one numeric character"
      );
    }
    return Promise.resolve();
  };

  return (
    <div>
      <div className="">
        <div className="mx-[200px] p-20">
          <div className="mx-[200px]  p-5 bg-slate-900  mt-6   rounded-xl">
            <div>
              <p className="text-[25px] text-yellow-300 text-center font-mono">
                Login
              </p>
            </div>
            <div className="p-10">
              <Form layout="vertical" onFinish={handleLogin}>
                {/* <label className=" !text-[17px]">Email</label> */}
                <Form.Item
                  label="Email"
                  name="email"
                  labelCol={{ span: 50 }}
                  className="custom-label"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Email",
                    },
                    {
                      type: "email",
                      message: "Please Enter a valid Email",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Email"
                    onChange={(e) => handleInput(e, "email")}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      validator: validatePassword,
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your Password"
                    onChange={(e) => handleInput(e, "password")}
                  />
                </Form.Item>
                <Form.Item>
                  {loading ? (
                    <button className="flex justify-center bg-yellow-200 mt-10 w-full py-2 rounded-lg text-slate-900 font-medium !hover:text-white">
                      LOGIN{" "}
                      <ClipLoader className="ml-5" size={20} color="#FF6207" />
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-200 mt-10 w-full py-2 rounded-lg text-slate-900 font-medium !hover:text-white"
                      htmlType="submit"
                    >
                      LOGIN
                    </button>
                  )}
                </Form.Item>
              </Form>
            </div>
            <div className="text-center text-white">
              <p>
                Need an Account?{" "}
                <span
                  className="underline ml-2 cursor-pointer  hover:text-yellow-200"
                  onClick={() => navigate("/Signup")}
                >
                  SIGN UP
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
