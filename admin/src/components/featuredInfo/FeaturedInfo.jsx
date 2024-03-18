import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setperc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");

        setIncome(res.data);
        // setperc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, []);
  // income.length>0 && console.log(income[0]._id)

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income.length >0 && income[0].total}</span>
          <div className="featuredMoneyRate">
            {Math.floor(perc)}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Sales</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$3,512</span>
            <div className="featuredMoneyRate">
              -11.3 <ArrowDownward className="featuredIcon negative" />
            </div>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Cost</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,322</span>
            <div className="featuredMoneyRate">
              +5.3 <ArrowUpward className="featuredIcon" />
            </div>
          </div>
          <span className="featuredSub">Compared to last month</span>
        </div>
      </div>
    </div>
  );
}
