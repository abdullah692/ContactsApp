import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Form, Input } from "antd";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteContacts,
  getContacts,
  postContacts,
  updateContacts,
} from "../Slices/ContactsSlice";
import { NotificationWithIcon } from "../utils/Notification";
import { PuffLoader } from "react-spinners";

function Contacts(props) {
  // const userData=useSelector((state)=>state)
  // console.log(userData,'aaaaasssssss');
  const [form] = Form.useForm()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addContact, setAddContacts] = useState({
    _id:null,
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [showContacts, setShowContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAlreadyExists,setIsAlreadyExists]=useState(false);

  const handleInput = (e, name) => {
    const value = e.target.value;
    setAddContacts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCOntacts = (values) => {
    console.log(values, "aa");
    // delete addContact._id;
    dispatch(postContacts({ contactData: addContact }))
      .unwrap()
      .then((x) => {
        console.log("xxxxxxxxxxxxxxx", x);
        if (x.message == "Contact is successfully created") {
          NotificationWithIcon("success", x?.message);
          setShowContacts((prevState) => [...prevState, addContact]);
          setAddContacts({
            _id: "",
            name:"",
            address:"",
            email:"",
            phone:""
          });
          form.setFieldsValue({
            _id: "",
            name: "",
            email: "",
            phone: "",
            address:"",
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleDelete = (id) => {
    console.log("Id is ", id);
    dispatch(deleteContacts({ id }))
      .unwrap()
      .then((x) => {
        console.log("xxxx", x);
        if (x?.message == "Contact is successfully deleted") {
          const deleteContact = showContacts.filter((val) => val?._id !== id);
          setShowContacts(deleteContact);
          NotificationWithIcon("success", x?.message);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };


  const handleEdit = (val) => {
    console.log(val,'ccccccc');
    setAddContacts(
      {
        _id: val?._id,
        name: val?.name,
        email: val?.email,
        phone: val?.phone,
        address: val?.address,
      });
      form.setFieldsValue({
        _id: val?._id,
        name: val?.name,
        email: val?.email,
        phone: val?.phone,
        address: val?.address,
      });
    
      setIsAlreadyExists(true);
  }
  
  // const onEditComplete=()=>{
  //   console.log('ssssssss',addContact);
  //   form.setFieldsValue(addContact)
  // }

  const handleUpdate=()=>{
    console.log(addContact?._id,'idis');
    console.log(addContact,'xxxxxxxaddCOntact');
    dispatch(updateContacts({contactData:addContact})).unwrap()
    .then((x)=>{
      console.log(x,'xxxxxxxxxxxxxx');
      if(x?.message === "Contact data is updated")
      {
        NotificationWithIcon("success", x?.message);
        handleContacts();

      }
    }).catch((err)=>{
      console.log('Error Message',err);
      NotificationWithIcon("error", err);
    })

    setIsAlreadyExists(false);
    setAddContacts({
      _id: "",
      name:"",
      address:"",
      email:"",
      phone:""
    });
    form.setFieldsValue({
      _id: "",
      name: "",
      email: "",
      phone: "",
      address:"",
    });
  }

  const handleContacts=()=>{
    setLoading(true);
    dispatch(getContacts())
    .unwrap()
    .then((x) => {
      console.log("xxxxxxx", x);
      if (x?.message == "Contacts Data") {
        setShowContacts(x?.contacts);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
  }

console.log('addCOntacts',addContact);
  useEffect(() => {
    setLoading(true);
    handleContacts();
   
  }, []);

  return (
    <div>
      <Header />
      <Form
      form={form}
      onFinish={handleAddCOntacts} 
      initialValues={addContact} >
        {/* <div className="flex"> */}

        <div className="mt-5 grid grid-cols-9 gap-7 p-10">
          <Form.Item
            className="col-span-2"
            name="name"
            // initialValue={addContact.name}
            labelCol={{ span: 50 }}
            rules={[
              {
                required: true,
                message: "Please Enter Contact Name",
              },
            ]}
          >
            <Input
            
              placeholder="Enter Contact Name"
              className="border-2 border-orange-400"
              onChange={(e) => handleInput(e, "name")}
            />
          </Form.Item>
          <Form.Item
            name="email"
            labelCol={{ span: 50 }}
            className="col-span-2"
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
              placeholder="Enter Contact Email"
              className="border-2 border-orange-400"
              onChange={(e) => handleInput(e, "email")}
            />
          </Form.Item>

          <Form.Item
            name="address"
            labelCol={{ span: 50 }}
            className="col-span-2"
            rules={[
              {
                required: true,
                message: "Please Enter Address",
              },
            ]}
          >
            <Input
              placeholder="Enter Contact Address"
              className="border-2 border-orange-400"
              onChange={(e) => handleInput(e, "address")}
            />
          </Form.Item>

          <Form.Item
            name="phone"
            labelCol={{ span: 50 }}
            className="col-span-2"
            rules={[
              {
                required: true,
                message: "Please Enter Phone No",
              },
            ]}
          >
            <Input
              placeholder="Enter Contact Phone No"
              className="border-2 border-orange-400"
              onChange={(e) => handleInput(e, "phone")}
              onKeyDown={(e) => {
                if (
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "ArrowUp" &&
                  e.key !== "ArrowDown" &&
                  e.key !== "Tab" &&
                  (e.key < "0" || e.key > "9") &&
                  e.key !== "+"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
          {
            isAlreadyExists ? (

          <button className="mb-5 text-[17px]  text-center text-white bg-orange-400 rounded-full"
          type="button"
          onClick={handleUpdate}
          >
           Update
          </button>
            ):(
              <>
              <button className="mb-5 text-[20px] font-bold text-center text-white bg-orange-400 rounded-full"
              htmlType="submit"
              >
              +
             </button>
             </>
            )
          }
        </div>
        {/* </div> */}
      </Form>

      {loading ? (
        <>
          <div className="flex justify-center  mt-20 ">
            <PuffLoader size={80} color="#FF6207" />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-8 px-8 py-5">
            {showContacts?.map((val, index) => {
              console.log("valaa", val);
              return (
                <>
                  <div
                    key={index}
                    className="p-5 bg-orange-200 border-2 border-orange-400 rounded-lg mb-5"
                  >
                    <div className="flex justify-end">
                      <BiEditAlt
                        size={20}
                        className="text-gray-700 cursor-pointer"
                        onClick={()=> handleEdit(val)}
                      />
                      <MdDelete
                        size={20}
                        className="ml-2 text-red-600 cursor-pointer"
                        onClick={() => handleDelete(val?._id)}
                      />
                    </div>
                    <div className="mt-[-20px]">
                      <p className="text-[22px] font-medium">{val.name}</p>
                      <p className="text-[19px] font-normal">{val.email}</p>
                      <p className="text-[19px] font-normal">{val.address}</p>
                      <p className="text-[19px] font-normal">{val.phone}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}

      {/* <button onClick={()=>navigate('/check')}>Check</button> */}
    </div>
  );
}

export default Contacts;
