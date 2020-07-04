import React, { useState, useEffect } from 'react';
import HomeNav from './HomeNav';
import axios from 'axios';
import Accordion from './AccordionForMeals';
import {Modal, Button, Card} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Home = (props) => {

    const [mealName, setmealName] = useState("");
    const [calories, setcalories] = useState("");
    const [formattedDate, setformattedDate] = useState("")
    const [date, setdate] = useState("");
    const [modalvisibility, setmodalvisibility] = useState(false);
    const [meals, setmeals] = useState("");
    const [toReload, settoReload] = useState(0);
    const [errMsg, seterrMsg] = useState("");

    useEffect(()=>{
        var accessToken = localStorage.getItem("accessToken");
        if(!accessToken)
        {
            props.history.push("/login");
        }
        else
        {
            axios({
                method:"POST",
                url:"/getMeals",
                data:{
                    accessToken:accessToken
                }
            }).then((result)=>{
                if(result.data)
                {
                    setmeals(result.data);
                }
                else
                {
                    setmeals("");
                }
            })
        }
    },[meals,toReload])


    const handleChangeForm = (e)=>{
        e.preventDefault();
        switch(e.target.name)
        {
            case "mealName":
                setmealName(e.target.value);
                break;
            case "calories":
                if(/^\d+$/.test(e.target.value) || e.target.value==="")
                {
                    setcalories(e.target.value);
                }
                break;
            default: break;
        }
    }

    
    const  GetFormattedDate = (selectedDate)=> {
        if(selectedDate)
        {
            var month = selectedDate.getMonth()+1;
            var day = selectedDate.getDate();
            var year = selectedDate.getFullYear();
            return month + "/" + day + "/" + year;
        }
        else
        {
            return "";
        }
}

    const onDateChange = (selectedDate)=>{
        var d = GetFormattedDate(selectedDate).toString();
        setformattedDate(d);
        console.log(d);
        setdate(selectedDate);
    }



    const onAddMeal = (e)=>{
        e.preventDefault();
        setmodalvisibility(true);
    }

    const handleAdd = (e) => {
        if(mealName && calories && formattedDate)
        {
        axios({
            method:"POST",
            url:"/addMeal",
            data:{
                name:mealName,
                calories:calories,
                date:formattedDate,
                accessToken:localStorage.getItem("accessToken")
            }
        }).then((result)=>{
            if(result.data==="done")
            {
                setmodalvisibility(false);
                setdate("");
                setmealName("");
                setcalories("");
                seterrMsg("");
                if(toReload===1)
                {
                    settoReload(0);
                }
                else
                {
                    settoReload(toReload+1);
                }
                
            }
            else
            {
                seterrMsg("*Some error occured.")
            }
        })
        }
        else
        {
            seterrMsg("*All fields are required.")
        }
      };

    const handleCancel = (e) => {
        setmodalvisibility(false);
        setdate("");
        setmealName("");
        setcalories("");
        seterrMsg("");
      };

    return (
        <div style={{width:"100%",top:"0",position:"absolute"}}>
            <div>
            <HomeNav {...props}/>
            </div>
            {meals?
            <div style={{width:"60vh", position:"relative"}}>
            <Accordion meals={meals}/>
            <div className="mt-2" style={{right:"0", position:"absolute"}}>
            <button type="submit" className="btn btn-info"onClick={onAddMeal}>+ Add Meal</button>
            </div>
            </div>
            :
            <div className="p-4">
                <Card style={{background:"#505F51", width: '18rem' }}>
                <Card.Body>
                    <Card.Title>No meals added</Card.Title>
                        <Card.Text>
                        Add some meals to continue. 
                    </Card.Text>
                
                    <div className="mt-2" style={{right:"0", position:"absolute"}}>
                    <button type="submit" className="btn btn-info"onClick={onAddMeal}>+ Add Meal</button>
                    </div>
                </Card.Body>
                </Card>
                </div>}
            
            <Modal show={modalvisibility} size="sm" onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title><strong style={{color:"#159D9E"}}>Meal details</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form style={{width:"35vh"}}>
        <div className="form-group">
            <DatePicker
                    selected={date}
                    onChange={onDateChange}
                    placeholderText="Date"
                    minDate={new Date()}
                />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" name="mealName" onChange={handleChangeForm} placeholder="Name"/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" name="calories" onChange={handleChangeForm} placeholder="Calories" value={calories}/>
            </div>
            {errMsg?<small style={{color:"#DC1717"}}>{errMsg}</small>:null}
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
            
        
    )
}

export default Home;
