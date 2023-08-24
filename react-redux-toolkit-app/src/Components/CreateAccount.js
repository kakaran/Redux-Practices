import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allUserDataGet,
  setuserData,
  userDelete,
} from "../Redux/Slices/AccountSlice";

const CreateAccount = () => {
  const [inputdetail, setInputDetail] = useState({
    name: "",
    amount: "",
  });

  const onChangeDetail = (e) => {
    setInputDetail({ ...inputdetail, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const Alluser = useSelector((state) => state.account.allusers[0]);

  useEffect(() => {
    dispatch(allUserDataGet());
  }, [dispatch]);

  return (
    <div className="CreateAccountContainer">
      <p>Create New Account</p>
      <span>
        <label htmlFor="Name">Name : </label>
        <input type="text" name="name" id="Name" onChange={onChangeDetail} />
      </span>
      <span>
        <label htmlFor="amount">Amount : </label>
        <input
          type="number"
          name="amount"
          id="amount"
          onChange={onChangeDetail}
        />
      </span>
      <button onClick={() => dispatch(setuserData(inputdetail))}>
        Create Account
      </button>

      <div>
        <br />
        <p>All user Display </p>
        <table border="solid">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Alluser?.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.name}</td>
                  <td>{value.amount}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch(userDelete(value.id))}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateAccount;
