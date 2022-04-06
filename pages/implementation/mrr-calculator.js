import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { FaLongArrowAltLeft } from "react-icons/fa";
import MRRChart from "../../components/MainPage/implementationComponents/MRRChart";



function MrrCalculator() {
    const router = useRouter();
  const [productCost, setProductCost] = React.useState(10);
  const [churnRate, setChurnRate] = React.useState(1);
  const [totalUsers, setTotalUsers] = React.useState(100);
  const [usersLostPerMonth, setUsersLostPerMonth] = React.useState(0);
  const [payingUsers, setPayingUsers] = React.useState(0);
  const [newUsersPerMonth, setNewUsersPerMonth] = React.useState(5);
  const [growthRate, setGrowthRate] = React.useState(0);
  const [infrastructureCost, setInfrastructureCost] = React.useState(50);
  const [laborCost, setLaborCost] = React.useState(0);
  const [marketingCost, setMarketingCost] = React.useState(50);
  const [totalCost, setTotalCost] = React.useState(0);
  const [otherCosts, setOtherCosts] = React.useState(0);
  const [chartDataPoints, setChartDataPoints] = React.useState(0);

  
  
  

  const [mProfit, setMProfit] = React.useState(0);
  const [yProfit, setYProfit] = React.useState(0);
  const [margin, setMargin] = React.useState(0);

  
  const [mrr, setMrr] = React.useState(0);
  const [arr, setArr] = React.useState(0);

  function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


  useEffect(() => {


    let usersLost = (1- (churnRate/100));
    let endOfMonthUsers= ((totalUsers*usersLost)  + newUsersPerMonth)
let calcGrowth = ((endOfMonthUsers - totalUsers) / totalUsers) *100;
    setGrowthRate(calcGrowth)


    let calcMrr = ((productCost * endOfMonthUsers) );
    let formatted = calcMrr.toFixed(2)
    // let commaFormatted = formatted.toLocaleString("en-US")
    setMrr(formatted)


    let calcArr = (calcMrr * 12).toFixed(2)
    setArr(calcArr)


    let calcTotalCost = (infrastructureCost + laborCost + marketingCost + otherCosts).toFixed(2)
setTotalCost(calcTotalCost)

    let calcMProfit = (calcMrr - totalCost).toFixed(2)

    setMProfit(calcMProfit)


    let calcYProfit = (calcMProfit * 12).toFixed(2)
    setYProfit(calcYProfit)


    let calcMargin = (calcMProfit / calcMrr * 100).toFixed(2)
    setMargin(calcMargin)


    //NEXT UP calculate chart data points and send to chart

    let calcChartDataPoints = []
    let calcProfitChartDataPoints = []


let amount;
let profitAmount;
    for(let i = 0; i < 12; i++){
        if(i === 0){
        amount = calcMrr
        profitAmount = calcMrr - calcTotalCost
        let format = Number(amount).toFixed(2)
        let formatP = Number(profitAmount).toFixed(2)


        calcChartDataPoints.push(format)
        
        calcProfitChartDataPoints.push(formatP)
        
        }else{
        amount = amount * (1 + (growthRate/100))
        profitAmount = (amount- calcTotalCost)
            
        let format2 = Number(amount).toFixed(2)
        let formatP2 = Number(profitAmount).toFixed(2)


        
        calcChartDataPoints.push(format2)
        calcProfitChartDataPoints.push(formatP2)
            
        }
    }


    
    setChartDataPoints([calcChartDataPoints,calcProfitChartDataPoints])
    
  },[productCost, churnRate, totalUsers, usersLostPerMonth, payingUsers, newUsersPerMonth, growthRate, mrr, otherCosts, marketingCost, laborCost, infrastructureCost]);








  
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-center w-[98%] h-full m-5 normal-box-soft relative">
        <h3>MRR Calculator</h3>

<div className="flex gap-5 m-5">
<MRRChart chartDataPoints={chartDataPoints}/>

<div className="normal-box w-[30em] flex-col flex !rounded-xl">
        <div className="flex justify-between">
            <h3>Growth Rate </h3>
            <h3 className={growthRate >0 ? "text-green-400" : "text-red-400"}>{" %" + growthRate.toFixed(2)}</h3>
          </div>

          <div className="flex justify-between">
            <h3>Total Costs: </h3>
            <h3 className="text-red-400">{" $" + numberWithCommas(totalCost)}</h3>
          </div>

          <hr/>
          <div className="flex justify-between">
            <h3>Monthly Recurring Revenue: </h3>
            <h3>{" $" + numberWithCommas(mrr)}</h3>
          </div>

          <div className="flex justify-between">
            <h3>Annual Recurring Revenue: </h3>

            <div className="flex">
            <h3>$</h3>
            <h3>{numberWithCommas(arr)}</h3>

            </div>
          </div>
          <hr/>

          <div className="flex justify-between">
            <h3 >Profit Margin: </h3>
                 <div className="flex">
            <h3>%</h3>
            <h3 className={yProfit >0 ? "text-green-400" : "text-red-400"}>{margin}</h3>
          </div>
          </div>
            <div className="flex justify-between">
                
            <h3>Monthly Profit: </h3>

            <div className="flex">
            <h3>$</h3>
            <h3 className={mProfit >0 ? "text-green-400" : "text-red-400"}>{numberWithCommas(mProfit)}</h3>
          </div>
          </div>


          <div className="flex justify-between">
            <h3 >Annual Profit: </h3>
                 <div className="flex">
            <h3>$</h3>
            <h3 className={yProfit >0 ? "text-green-400" : "text-red-400"}>{numberWithCommas(yProfit)}</h3>
          </div>
          </div>
         
        </div>
</div>
        
       
<button className=" w-[6em] h-[2em] rounded-3xl bg-t-bl flex items-center justify-center text-white gap-4 drop-shadow-xl md:hover:scale-105 md:transition-transform md:active:scale-95 cursor-pointer absolute left-5" onClick={()=>{router.push("/implementation")}}>
    
    <FaLongArrowAltLeft className="text-xl"/>
    Back</button>

    <div className="flex items-center w-full gap-2 p-2 text-center justify-evenly normal-box-soft">
        <div className="flex flex-col normal-box-soft w-[40%] !rounded-xl items-center">

            <p>Revenue</p>
            <div className="flex flex-col normal-box-soft w-[90%] !rounded-xl gap-2 p-3 !bg-t-bl/30">

<p className="text-md">Monthly price for product</p>
<div className="flex items-center">
<input
  id="typeinp"
  type="range"
  className="mr-8 blue range"
  min={0}
  max={200}
  value={productCost}
  step="1"
  onChange={(e) => {
    setProductCost(e.target.valueAsNumber);
  }}
/>
<p>$</p>

<input
  type="number"
  id="quantity"
  className="w-[8em] rounded-xl"
  min="1"
  max="500000000000"
  value={productCost}
  onChange={(e) => {
    setProductCost(e.target.valueAsNumber);
  }}
></input>
</div>
</div>
          <div className="flex flex-col normal-box-soft !rounded-xl gap-2 p-3 !bg-t-bl/30   w-[90%] ">

            <p className="text-md">Total Current Users</p>
<div className="flex items-center gap-2">
            <input
              type="range"
              className="blue range"
              min={1}
              max={10000}
              value={totalUsers}
              step="1"
              onChange={(e) => {
                setTotalUsers(e.target.valueAsNumber);
              }}
            />

            <input
              type="number"
              className="w-[8em] rounded-xl"
              min="1"
              max="50000000000"
              value={totalUsers}
              onChange={(e) => {
                setTotalUsers(e.target.valueAsNumber);
              }}
            ></input>
            </div>
          </div>

          <div className="flex flex-col normal-box-soft w-[90%] !rounded-xl gap-2 p-3 !bg-t-bl/30 ">

            <p className="text-md">New users monthly</p>
<div className="flex items-center gap-2">
            <input
              type="range"
              className="blue range"
              min={0}
              max={500}
              value={newUsersPerMonth}
              step="1"
              onChange={(e) => {
                setNewUsersPerMonth(e.target.valueAsNumber);
              }}
            />

            <input
              type="number"
              className="w-[8em] rounded-xl"
              min="1"
              max="50000000000"
              value={newUsersPerMonth}
              onChange={(e) => {
                setNewUsersPerMonth(e.target.valueAsNumber);
              }}
            ></input>
            </div>
          </div>

          <div className="flex flex-col normal-box-soft w-[90%] !rounded-xl gap-2 p-3 !bg-t-bl/30">

            <p className="text-md">Churn Rate</p>
<div className="flex items-center ">
            <input
              type="range"
              className="mr-8 blue range"
              min={0}
              max={50}
              value={churnRate}
              step="0.01"
              onChange={(e) => {
                setChurnRate(e.target.valueAsNumber);
              }}
            />
            <p>%</p>
            <input
              type="number"
              className="w-[8em] rounded-xl"
              min="0.01"
              max="50"
              value={churnRate}
              onChange={(e) => {
                setChurnRate(e.target.valueAsNumber);
              }}
            ></input>
            </div>
          </div>

         
        </div>












        
        <div className="flex flex-col normal-box-soft w-[40%] !rounded-xl items-center">

        <p>Costs</p>
            
<div className="flex flex-col normal-box-soft w-[90%] !rounded-xl gap-2 p-3 !bg-t-pl/30">

  <p className="text-md">Monthly Infrastructure Costs</p>
<div className="flex items-center ">
  <input
    type="range"
    className="mr-8 blue range"
    min={0}
    max={10000}
    value={infrastructureCost}
    step="1"
    onChange={(e) => {
      setInfrastructureCost(e.target.valueAsNumber);
    }}
  />
<p>$</p>

  <input
    type="number"
    className="w-[8em] rounded-xl"
    min="1"
    max="50000000000"
    value={infrastructureCost}
    onChange={(e) => {
        setInfrastructureCost(e.target.valueAsNumber);
    }}
  ></input>
  </div>
</div>

<div className="flex flex-col normal-box-soft w-[90%] !rounded-xl gap-2 p-3 !bg-t-pl/30">

  <p className="text-md">Labor costs</p>
<div className="flex items-center ">
  <input
    type="range"
    className="mr-8 blue range"
    min={0}
    max={50000}
    value={laborCost}
    step="1"
    onChange={(e) => {
      setLaborCost(e.target.valueAsNumber);
    }}
  />
<p>$</p>

  <input
    type="number"
    className="w-[8em] rounded-xl"
    min="1"
    max="500000000000"
    value={laborCost}
    onChange={(e) => {
        setLaborCost(e.target.valueAsNumber);
    }}
  ></input>
  </div>
</div>

<div className="flex flex-col normal-box-soft w-[90%] !rounded-xl gap-2 p-3 !bg-t-pl/30">

  <p className="text-md">Marketing Spend</p>
<div className="flex items-center ">
  <input
    type="range"
    className="mr-8 blue range"
    min={0}
    max={5000}
    value={marketingCost}
    step="1"
    onChange={(e) => {
      setMarketingCost(e.target.valueAsNumber);
    }}
  />
  <p>$</p>
  <input
    type="number"
    className="w-[8em] rounded-xl"
    min="0"
    max="50000000000"
    value={marketingCost}
    onChange={(e) => {
        setMarketingCost(e.target.valueAsNumber);
    }}
  ></input>
  </div>
</div>

<div className="flex flex-col normal-box-soft w-[90%] !rounded-xl gap-2 p-3 !bg-t-pl/30">

  <p className="text-md">Other Costs</p>
<div className="flex items-center ">
  <input
    type="range"
    className="mr-8 blue range"
    min={0}
    max={50000}
    value={otherCosts}
    step="1"
    onChange={(e) => {
      setOtherCosts(e.target.valueAsNumber);
    }}
  />
<p>$</p>

  <input
    type="number"
    className="w-[8em] rounded-xl"
    min="1"
    max="5000000000000"
    value={otherCosts}
    onChange={(e) => {
        setOtherCosts(e.target.valueAsNumber);
    }}
  ></input>
  </div>
</div>
</div>

</div>
       
      </div>
    </div>
  );
}

export default MrrCalculator;
