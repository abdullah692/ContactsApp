import React ,{useState} from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "../Register.css";
import { postRegisterUser } from "../Slices/AuthSlice";
import {useDispatch} from 'react-redux'
import {NotificationWithIcon} from "../utils/Notification"
import ClipLoader from "react-spinners/ClipLoader";


function SignUp(props) {

  const dispatch=useDispatch();
  const navigate = useNavigate();
    const [registerData,setRegisterData]=useState({
        username:'',
        email:'',
        password:''
    })

    const [loading,setLoading]=useState(false);

    const handleInput=(e,name)=>{
        // console.log(e.target.value);
        const value=e.target.value;
        setRegisterData(prevState => ({
            ...prevState,        
            [name]:value
          }));
    }
    

    const handleRegister=(values)=>{
        console.log(values,'values');
        console.log(registerData,'registerData');
        setLoading(true)
        dispatch(postRegisterUser({registerData:registerData})).unwrap()
        .then((x)=>{
          console.log('xxxxxxxxxxxx',x);
          setLoading(false)
          if(x.message == "User is already exists")
          {
            NotificationWithIcon('error','User is already exists')
          }
          else if(x.message == "User is Registered Succussfully"){
            NotificationWithIcon('success','User is Registered Succussfully')
            navigate('/');
          }
        }).catch((error)=>{
          console.log(error,'error');
          setLoading(false)
        })
        
    }

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
          <div className="mx-[200px] p-5 bg-slate-900   rounded-2xl">
            <div>
              <p className="text-[25px] text-yellow-300 text-center">SignUp</p>
            </div>
            <div className="p-10">
              <Form layout="vertical"
              onFinish={handleRegister}
              >
                {/* <label className=" !text-[17px]">Email</label> */}
                <Form.Item
                  label="Username"
                  name="username"
                  labelCol={{ span: 50 }}
                  //   className="text-center"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Username",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Username" 
                  onChange={(e)=>handleInput(e,'username')}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  labelCol={{ span: 50 }}
                  //   className="text-center"
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
                  <Input placeholder="Enter your Email" 
                  onChange={(e)=>handleInput(e,'email')}
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
                  <Input.Password placeholder="Enter your Password"
                  onChange={(e)=>handleInput(e,'password')}
                  />
                </Form.Item>

                <Form.Item>
                {
                        loading ? (
                          <button
                          className="flex justify-center bg-yellow-200 mt-10 w-full py-2 rounded-lg text-slate-900 font-medium !hover:text-white"
                          >
                          SIGNUP  <ClipLoader className="ml-5" size={20} color="#FF6207"/>
                        </button>
                        ):(

                      <button
                        className="bg-yellow-200 mt-10 w-full py-2 rounded-lg text-slate-900 font-medium !hover:text-white"
                        htmlType="submit"
                        >
                        SIGNUP
                      </button>
                        )
                      }
                </Form.Item>
              </Form>
            </div>
            <div className="text-center text-white">
              <p>
                Already Registered?{" "}
                <span
                  className="underline ml-2 cursor-pointer hover:text-yellow-200"
                  onClick={() => navigate("/")}
                >
                  LOGIN
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
