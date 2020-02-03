import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import "./TasksItem.css";
import EditTasks from "./EditTasks";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import ServerKip from "../../services/services";


export default function TasksItem({_id, num, position, object, failure, fix, mark, panel, date, start, finish, name, updateTasks, deleteItem, visibleDate}) {
  const [expanded, setExpanded] = React.useState(false);

  const serv = new ServerKip();

  let backg = ""

  if (num % 2 === 0) {
    backg = "even"
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);
  };

  const deleteTasks = async () => {
    deleteItem(_id, "tasks");
    setTimeout(() => {
      updateTasks();
    }, 2000);
  }

  const firmatTime = (time) => {
    if (time < 10) {
      return time = "0" + time}
    else return time
  }


  const timeStart = `${firmatTime(new Date(start).getHours())}:${firmatTime(new Date(start).getMinutes())}`;
  const timeFinish = `${firmatTime(new Date(finish).getHours())}:${firmatTime(new Date(finish).getMinutes())}`;
  


  const [checked, setChecked] = React.useState(mark);


  const toggleChecked = () => {
    serv.updateData("tasks", _id, {mark: !mark});
    setChecked(prev => !prev);
  };



  return (
    <>
    {visibleDate ? <span className="datetitle"> {`${firmatTime(new Date(date).getDate())} / ${firmatTime(new Date(date).getMonth() + 1)} / ${new Date(date).getFullYear()}`} </span> : null}
  

    <ExpansionPanel className={`workShopItem ${backg} ${!checked ? "" : "relevant" }`} expanded={expanded === panel} onChange={handleChange(panel)}>
        <ExpansionPanelSummary 
                  aria-controls={`${panel}bh-content`}
                  id={`${panel}bh-header`}
                >
                <div className="workShopItem">
                  <div className="workShopItem--title">
                    <span className="workShopItem--time"> {`${timeStart} - ${timeFinish}`} </span>
                    <span className="workShopItem--subtitle">{position}</span>
                  </div>
                  <div className="workShopItem--title">
                    <span style={checked ? {color: "red"} : {}}  className="workShopItem--object" > {object} </span>
                  </div>
                  <div className="workShopItem--title">
                    <span className="workShopItem--person"> {name.join(", ")} </span>
                  </div>
                </div>
                </ExpansionPanelSummary>
                <span className="workShopItem--comment"> Неисправность: </span>
                <ExpansionPanelDetails>
                <Typography>
                    {failure}
                  </Typography>
                </ExpansionPanelDetails>
                <span className="workShopItem--comment"> Корректирующие действия: </span>
                <ExpansionPanelDetails>
                  <Typography>
                    {fix}
                  </Typography>
                </ExpansionPanelDetails>






                <DialogActions>
                <FormControlLabel 
                  control={<Switch checked={checked} onChange={toggleChecked} />}
                  label={<Button onClick={toggleChecked} color="primary">
                    <h5>отметить</h5>
                  </Button>}
                />
                  <EditTasks 
                    updateTasks={updateTasks}
                    id={_id} position={position} name={name}
                    object={object} failure={failure} 
                    fix={fix} start = {start} finish={finish}
                  />
                  <Button   onClick={deleteTasks}   color="primary">
                    <h5>удалить</h5>
                  </Button>
                </DialogActions>

        </ExpansionPanel>
    </>
      
  );
}
