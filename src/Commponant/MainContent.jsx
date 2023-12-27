/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-unused-vars
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from './prayer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import moment from "moment"
import "moment/dist/locale/ar-dz"
moment.locale("ar")
import { useEffect,useState } from 'react';


export default function Maincontent() {
    //state
    const[nextprayerindex, setNextPrayerIndex] = useState(2)
    const[nextprayer,setNextPrayer]= useState(1)
    const[timings,settimings] = useState({
        Fajr:"05:24",
        Dhuhr:"12:43",
        Asr: "16:05",
        Sunset:"18:34",
        Isha: "19:52",
    });


    const [RemainingTime,setremainingTime] = useState("")



    const [selectCity,Setcity]= useState({
        displayName:"المنصورة",
        apiName:"Mansoura",
    });

    const [today,settoday]=useState()

    const [timer,settimer]=useState(10)


    const avalableCities =[{
        displayName:"المنصورة",
        apiName:"Mansoura",
    },
    {
        displayName:"شرم الشيخ",
        apiName:"Sharm El-Shaikh",
    },
    {
        displayName:"القاهرة",
        apiName:"cairo",
    },
{
        displayName:"كفر الشيخ",
        apiName:"kafr El-shaikh"
},{
        displayName:"طنطا",
        apiName:"Tanta"
}];



const prayersarray = [


    {key:"fajr", displayName:"الفجر" },
    {key:"Dhuhr", displayName:"الظهر" },
    {key:"Asr", displayName:"العصر" },
    {key:"Sunset", displayName:"المغرب" },
    {key:"Isha", displayName:"العشاء" }

];


const prayerarray = [
                        {key:"fajr",displayName:"الفجر"},
                        {key:"Dhuhr",displayName:"الظهر"},
                        {key:"Asr",displayName:"العصر"},
                        {key:"Sunset",displayName:"المغرب"},
                        {key:"Isha",displayName:"العشاء"}]



    const getTiming = async function(){
        console.log("callaing the api")
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=EGY&city=${selectCity.apiName}`)

        settimings (response.data.data.timings)
    };
    useEffect(()=>{
        getTiming();


    },[selectCity]);
useEffect(()=>{
    const interval = setInterval(() => {
            setupcountdowntimer();
       }, 1000);
       const t = moment()
       settoday(t.format("MMM Do YYYY | hh:MM"))
       return() => {
        clearInterval(interval)
       }
},[timings])
const setupcountdowntimer = ()=>{

    const momentNow = moment()
    let prayerIndex = 2;

    if(momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) && momentNow.isBefore(moment(timings["Dhuhr"],"hh:mm")))
    {
        prayerIndex = 1
    }else if (momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) && momentNow.isBefore(moment(timings["Asr"],"hh:mm")))
    {   prayerIndex = 2}
    else if(momentNow.isAfter(moment(timings["Asr"], "hh:mm")) && momentNow.isBefore(moment(timings["Sunset"],"hh:mm")))
    {
        prayerIndex = 3
    }else if(momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) && momentNow.isBefore(moment(timings["Isha"],"hh:mm")))
    {
        prayerIndex = 4
    }else
    {
         prayerIndex = 0
    }
    setNextPrayerIndex(prayerIndex);





    const nextPrayerObject =prayerarray[prayerIndex]
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextprayerTimeMoment = moment(nextPrayerTime, "hh:mm")

    let RemainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow)

   if(RemainingTime < 0) {
    const midnightDiff = moment("23:59:59","hh:mm:ss").diff(momentNow);
    const fajrToMidnightDiff = nextprayerTimeMoment.diff(
    moment("00:00:00","hh:mm:ss"));

    const totalDiffernce = midnightDiff + fajrToMidnightDiff;

    RemainingTime = totalDiffernce;






   }


    const durationRemainingTime =moment.duration(RemainingTime);

   setremainingTime(`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`)

// console.log(durationRemainingTime.hours(),
//     durationRemainingTime.minutes(),
//     durationRemainingTime.seconds(),)

}



  const handleCityeChange = (event) => {
   const objectCity = avalableCities.find((city)=>{
    return city.apiName == event.target.value;


   })
   Setcity(objectCity);

  }


  return (
    <>

    {/* top row */}
        <Grid container >
            <Grid xs={6}>
                <div>
                    <h2>{today}</h2>
                    <h1>{selectCity.displayName}</h1>
                    {/* <h4>{timer}</h4> */}
                </div>
            </Grid>
            <Grid xs={6}>
                <div>
                    <h2>متبقي حتي صلاة {prayerarray[nextprayerindex].displayName}</h2>
                    <h1>{RemainingTime}</h1>
                </div>
            </Grid>
        </Grid>
    {/* end top row */}


    {/* advider */}
        <Divider style={{borderColor:"white",opacity:"0.1"}} variant="middle" />
    {/* end dvider */}

    {/* playerCardes */}
    <Stack direction={'row'} justifyContent={'space-around'} style={{marginTop:"50px"}}>
      <Prayer name="الفجر" time={timings.Fajr} imge="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2" />
      <Prayer name="الظهر" time={timings.Dhuhr} imge="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921" />
      <Prayer name="العصر" time={timings.Asr} imge="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf" />
      <Prayer name="المغرب" time={timings.Sunset} imge="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5" />
      <Prayer name="العشاء" time={timings.Isha} imge="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d" />
    </Stack>
    {/* EndPlayerCeds */}



    {/* select city */}
    <Stack direction={'row'} justifyContent={'center'} style={{marginTop:"40px"}}>
        <FormControl style={{width:"20% "}}>
            <InputLabel id="demo-simple-select-label"><span style={{color:"white"}}>المدينة</span></InputLabel>
            <Select style={{color:"white"}}
             labelId="demo-simple-select-label"
             id="demo-simple-select"
            //   value={}
              label="Age"
             onChange={handleCityeChange}
         >
            {avalableCities.map((City) => {
                return (

                    <MenuItem key={City.apiName} value={City.apiName}>{City.displayName}</MenuItem>



                );
           })}

            </Select>
        </FormControl>

    </Stack>
    </>
  )
        }


