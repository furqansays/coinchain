import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Signup.css";

const Beneficiary = ({
  data,
  token,
  setData,
  userProfile,
  addBeneficiary,
  deleteBeneficiary,
  setTransactionData,
}) => {
  // console.log(data);
  const [inputValue, setInputValue] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addBeneficiary(inputValue, token);
      setData(response.data);
      // console.log("add beneficiary");
      // console.log(response);
      if (response.data) {
        setData(response.data);
      }
      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async (beneficiary) => {
    const response = await deleteBeneficiary(beneficiary);
    if (response.data) {
      setData(response.data);
    }
  };
  const renderBeneficiary = () => {
    if (data.beneficiaries.length > 0) {
      const lists = data.beneficiaries.map((block) => {
        return (
          <div class="item">
            <Link to="/createtransaction">
              <button
                onClick={() => {
                  setTransactionData({
                    senderEmail: data.email,
                    recipientEmail: block.beneficiary,
                  });
                  userProfile();
                }}
                class="ui right floated blue small button"
              >
                Transact
              </button>
            </Link>
            <button
              onClick={() => onDelete(block.beneficiary)}
              class="ui right floated red small button"
            >
              Delete
            </button>
            <div class="content w5">
              <p class="p">{block.beneficiary}</p>
            </div>
          </div>
        );
      });
      return lists;
    } else {
      return <div>no beneficiaries</div>;
    }
  };
  return (
    <div class="center">
      <div class="ui celled list width-50">{renderBeneficiary()}</div>
      <form class="addform" onSubmit={onSubmit}>
        <div className="field wf">
          <input
            class="addinput"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            value={inputValue}
            type="email"
            placeholder="Beneficiary Email"
          ></input>
          <button class=" ui right floated blue small button ">
            Add Beneficiary
          </button>
        </div>
      </form>
    </div>
  );
};

export default Beneficiary;
