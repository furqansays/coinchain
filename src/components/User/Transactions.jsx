import React, { useEffect, useState } from "react";

const Transactions = ({ getTransactions, wallet }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const responseFunc = async () => {
      try {
        const response = await getTransactions();
        // console.log(response.data);
        setTransactions(response.data.transactionsList);
      } catch (error) {
        console.log(error);
      }

      // setTimeout(() => {
      //   setTransactions(response.data.transactionsList);
      // }, 1000);
      // console.log(transactions);
    };
    responseFunc();
    // setTransactions(response.data.transactionsList);
  }, []);
  const conditionalRendering = () => {
    if (transactions.length > 0) {
      return transactions.map((transaction) => {
        // console.log(transaction);
        return (
          <div
            class="item"
            style={
              transaction.type === "Debit"
                ? {
                    backgroundColor: "#feb9b9",
                    paddingTop: "23px",
                    paddingBottom: "23px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }
                : {
                    backgroundColor: "#b9db92",
                    paddingTop: "23px",
                    paddingBottom: "23px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }
            }
          >
            <h2 style={{ fontWeight: 500, textAlign: "center" }}>
              {transaction.type}
            </h2>
            <h3 style={{ fontWeight: 100 }} class="content item">
              To: {transaction.receiver}
            </h3>
            <h3 style={{ fontWeight: 100 }} class="content item">
              From: {transaction.sender}
            </h3>
            <h3 style={{ fontWeight: 100 }} class="content item">
              Amount: {transaction.amount}
            </h3>
            <h3 style={{ fontWeight: 100 }} class="content item">
              Date: {transaction.date}
            </h3>
            <h3 style={{ fontWeight: 100 }} class="content item">
              Time: {transaction.time}
            </h3>
          </div>
        );
      });
    } else {
      return <div>no transactions</div>;
    }
  };
  return (
    <div
      class="ui container"
      style={{
        width: "57%",
        paddingTop: "35px",
        marginTop: "84px",
        marginBottom: "120px",
      }}
    >
      <div class="ui middle aligned center aligned grid">
        <div class="ui celled list w20" style={{ marginBottom: "165px" }}>
          {conditionalRendering()}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
