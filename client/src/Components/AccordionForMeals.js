import React, {useState} from 'react';
import {Accordion, Card, Button, Modal, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AccordionForMeals = (props) => {

    const [mealName, setmealName] = useState("");
    const [date, setdate] = useState("");
    const [formattedDate, setformattedDate] = useState("");
    const [calories, setcalories] = useState("");
    const [modalvisibility, setmodalvisibility] = useState(false);
    const [editModalVisibility, seteditModalVisibility] = useState(false);
    const [deleteId, setdeleteId] = useState("");
    const [editId, seteditId] = useState("");
    const [errMsg, seterrMsg] = useState("");
    var meals = props.meals;


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
            setdate(selectedDate);
        }

    
    const onEdit = (e)=>{
        e.preventDefault();
        seteditId(e.target.id)
        for(var i=0;i<meals.length;i++)
        {
            for(var j=0;j<meals[i].meals.length;j++)
            {
                if(meals[i].meals[j].id===e.target.id)
                {
                    setmealName(meals[i].meals[j].name);
                    setcalories(meals[i].meals[j].calories);
                    var existDate = new Date(meals[i].date);
                    setdate(existDate);
                    setformattedDate(meals[i].date);
                }
            }
        }
        seteditModalVisibility(true);
    }

    const handleSave = (e)=>{
        e.preventDefault();
        if(mealName && calories && formattedDate)
        {
        axios({
            method:"POST",
            url:"/editMeal",
            data:{
                id:editId,
                accessToken:localStorage.getItem("accessToken"),
                name:mealName,
                date:formattedDate,
                calories:calories
            }
        }).then((result)=>{
            if(result.data==="done")
            {
                seterrMsg("");
                seteditModalVisibility(false);
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
    }

    const onDelete = (e)=>{
        e.preventDefault();
        setdeleteId(e.target.id);
        setmodalvisibility(true);
    }

    const handleCancel = (e) => {
        setmodalvisibility(false);
        seterrMsg("");
        seteditModalVisibility(false);
      };


    const handleDelete = (e)=>{
        axios({
            method:"POST",
            url:"/deleteMeal",
            data:{
                id:deleteId,
                accessToken:localStorage.getItem("accessToken")
            }
        }).then((result)=>{
            if(result.data==="done")
            {
                setmodalvisibility(false);
            }
            else
            {
                seterrMsg("*Some error occured");
            }
        })
        
    }

    const showMeals = ()=>{
        var meals = props.meals;
        meals.sort((i, j)=> {
            var keyA = new Date(i.date);
            var keyB = new Date(j.date);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          });
        var display = [];
        var eventKey= 0;
        for(var i=0;i<meals.length;i++)
        {
            display.push(<div className="d-flex justify-content-center mt-4" style={{background:"#3D3938"}}><strong>----{meals[i].date}----</strong></div>);
            var sum = 0;
            var colour = "";
            for(var j=0;j<meals[i].meals.length;j++)
            {
                sum=sum+Number(meals[i].meals[j].calories);
            }
            if(sum<2000)
                {
                    colour = "#2DA536";
                }
                else
                {
                    colour = "#C63D2D";
                }
            for(var j=0;j<meals[i].meals.length;j++)
            {
                display.push(
                    
                    <Card>
                            <Card.Header >
                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={eventKey.toString()} style={{background:`${colour}`,cursor:"pointer"}}>
                                {meals[i].meals[j].name}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={eventKey.toString()}>
                                <Card.Body style={{ position:"relative"}}>
                                <form style={{width:"50vh"}}>
                                <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label style={{color:"#30355A"}} htmlFor="calories">Calories</label>
                                    <input type="text" className="form-control" id="calories" disabled value={meals[i].meals[j].calories} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label style={{color:"#30355A"}} htmlFor="date">Date</label>
                                    <input type="text" className="form-control" id="date" disabled value={meals[i].date} />
                                </div>
                                </div>
                                </form>
                                <Row className="justify-content-md-center">
                                    <Col md="auto">
                                <Button variant="secondary" id={meals[i].meals[j].id} onClick={onEdit}>
                                 Edit
                                </Button>
                                </Col>
                                
                                <Col md="auto">
                                <Button variant="danger" id={meals[i].meals[j].id} onClick={onDelete}>
                                 Delete                           
                                 </Button>
                                 </Col>
                                 </Row> 
                                
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    );
                    eventKey++;
            }

            
        }
        return display;
    }


    return (
        <div>
                <div>
            <Accordion>
                {showMeals()}
            </Accordion>
            </div>
            <Modal show={modalvisibility} size="sm" onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title><strong style={{color:"#E22E22"}}>Delete Meal</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <small>Are you sure you want to delete?</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={editModalVisibility} size="sm" onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title><strong style={{color:"#159D9E"}}>Edit meal</strong></Modal.Title>
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
                <input type="text" className="form-control" name="mealName" onChange={handleChangeForm} placeholder="Name" value={mealName}/>
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
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default AccordionForMeals;